from __future__ import annotations

import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import pytest

try:  # pragma: no cover - import guard exercised in test environment
    from playwright.sync_api import expect, sync_playwright
except ModuleNotFoundError:  # pragma: no cover - gracefully skip when unavailable
    sync_playwright = None  # type: ignore[assignment]
    expect = None  # type: ignore[assignment]
    PLAYWRIGHT_AVAILABLE = False
else:
    PLAYWRIGHT_AVAILABLE = True

pytestmark = pytest.mark.skipif(
    not PLAYWRIGHT_AVAILABLE,
    reason="Playwright is required for browser end-to-end tests.",
)


DOCS_DIR = Path(__file__).resolve().parents[1] / "docs"


class DocsRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DOCS_DIR), **kwargs)

    def log_message(self, format: str, *args) -> None:  # noqa: D401 - suppress server logs
        """Silence default HTTP server logging during tests."""
        return


@pytest.fixture(scope="session")
def serve_docs() -> str:
    server = ThreadingHTTPServer(("127.0.0.1", 0), DocsRequestHandler)
    server.daemon_threads = True

    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    base_url = f"http://{server.server_address[0]}:{server.server_address[1]}"

    # Give the server a brief moment to start accepting connections.
    time.sleep(0.1)

    try:
        yield base_url
    finally:
        server.shutdown()
        thread.join(timeout=5)
        server.server_close()


@pytest.fixture(scope="session")
def playwright_instance():
    if not PLAYWRIGHT_AVAILABLE:
        pytest.skip("Playwright is required for browser end-to-end tests.")
    with sync_playwright() as playwright:
        yield playwright


@pytest.fixture(scope="session")
def browser(playwright_instance):
    if not PLAYWRIGHT_AVAILABLE:
        pytest.skip("Playwright is required for browser end-to-end tests.")
    browser = playwright_instance.chromium.launch(headless=True)
    yield browser
    browser.close()


@pytest.fixture
def page(browser):
    if not PLAYWRIGHT_AVAILABLE:
        pytest.skip("Playwright is required for browser end-to-end tests.")
    context = browser.new_context()
    page = context.new_page()
    try:
        yield page
    finally:
        context.close()


def test_marking_cards_updates_progress_and_filtering(page, serve_docs):
    page.goto(f"{serve_docs}/index.html")
    page.wait_for_selector(".card")

    total_cards = page.evaluate("document.querySelectorAll('.card').length")
    progress = page.locator("#progress-count")
    expect(progress).to_have_text(f"0 / {total_cards}")

    page.locator(".card .learn-btn").first.click()
    expect(progress).to_have_text(f"1 / {total_cards}")

    page.get_by_role("button", name="コツ").click()
    expect(page.locator(".filter-btn.active")).to_have_text("コツ")

    badge_texts = [text.strip() for text in page.locator(".card .badge").all_inner_texts()]
    assert badge_texts, "コツカテゴリのカードが表示されるはずです"
    assert all(text == "コツ" for text in badge_texts)


def test_flashcard_learning_updates_progress(page, serve_docs):
    page.goto(f"{serve_docs}/index.html")
    page.wait_for_function("document.querySelectorAll('.card').length > 0")

    total_cards = page.evaluate("document.querySelectorAll('.card').length")
    progress = page.locator("#progress-count")
    expect(progress).to_have_text(f"0 / {total_cards}")

    page.wait_for_function(
        "document.getElementById('flashcard-term').textContent.trim().length > 0"
    )
    initial_term = page.locator("#flashcard-term").inner_text().strip()
    assert initial_term

    page.locator("#flashcard-flip").click()
    page.wait_for_function(
        "document.getElementById('flashcard').classList.contains('flipped')"
    )
    page.locator("#flashcard-flip").click()
    page.wait_for_function(
        "!document.getElementById('flashcard').classList.contains('flipped')"
    )

    page.locator("#flashcard-learned").click()
    expect(progress).to_have_text(f"1 / {total_cards}")

    page.locator("#flashcard-reset").click()
    page.wait_for_function(
        "document.getElementById('flashcard-term').textContent.trim().length > 0"
    )


def test_quiz_flow_allows_completing_round(page, serve_docs):
    page.goto(f"{serve_docs}/index.html")
    page.wait_for_selector("#start-quiz")

    page.locator("#quiz-count").fill("3")
    page.locator("#start-quiz").click()
    page.wait_for_function(
        "!document.getElementById('quiz-body').classList.contains('hidden')"
    )

    for _ in range(3):
        options = page.locator("#quiz-options button")
        expect(options).to_have_count(4)

        options.first.click()
        expect(page.locator("#quiz-feedback")).not_to_have_text("")
        expect(page.locator("#quiz-next")).to_be_enabled()
        page.locator("#quiz-next").click()

    page.wait_for_function(
        "!document.getElementById('quiz-result').classList.contains('hidden')"
    )
    expect(page.locator("#quiz-result-message")).to_contain_text("正解数は")

    page.locator("#quiz-restart-final").click()
    page.wait_for_function(
        "!document.getElementById('quiz-setup').classList.contains('hidden')"
    )
