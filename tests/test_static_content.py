import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class TestStaticContent(unittest.TestCase):
    def setUp(self):
        self.index_html = (ROOT / "docs/index.html").read_text(encoding="utf-8")
        self.script_js = (ROOT / "docs/script.js").read_text(encoding="utf-8")
        self.styles_css = (ROOT / "docs/styles.css").read_text(encoding="utf-8")

    def test_index_contains_expected_sections(self):
        section_ids = ["wordbook", "flashcards", "quiz"]
        for section_id in section_ids:
            with self.subTest(section_id=section_id):
                self.assertIn(f'id="{section_id}"', self.index_html)

    def test_index_has_progress_and_filters(self):
        self.assertIn('id="progress-bar"', self.index_html)
        self.assertIn('class="filters"', self.index_html)
        self.assertIn('data-filter="ルール"', self.index_html)
        self.assertIn('data-filter="コツ"', self.index_html)
        self.assertIn('data-filter="チェックリスト"', self.index_html)

    def test_script_contains_word_items(self):
        word_item_ids = re.findall(r"id:\s*'[^']+'", self.script_js)
        self.assertGreaterEqual(len(word_item_ids), 10)

    def test_script_has_categories(self):
        categories = set(re.findall(r"category:\s*'([^']+)'", self.script_js))
        expected_categories = {"ルール", "コツ", "チェックリスト"}
        self.assertTrue(expected_categories.issubset(categories))

    def test_styles_define_core_components(self):
        expected_selectors = [
            ".site-header",
            ".flashcard",
            ".quiz-panel",
            ".card-list",
        ]
        for selector in expected_selectors:
            with self.subTest(selector=selector):
                self.assertIn(selector, self.styles_css)


if __name__ == "__main__":
    unittest.main()
