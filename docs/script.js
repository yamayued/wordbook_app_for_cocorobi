(() => {
  const STORAGE_KEY = 'cocorobi-wordbook-learned-v1';

  const wordItems = [
    {
      id: 'rule-personal-data',
      category: 'ルール',
      term: '個人情報は匿名化してから活用',
      summary: '顧客や社員を特定できる情報は、生成 AI への入力前に必ずマスキングします。',
      points: [
        '氏名・住所・連絡先など特定可能な情報は、匿名化するかダミーデータで代替する。',
        '匿名化できない場合は、生成 AI への入力を避けて人手で処理する。',
        'データ提供前には利用目的と保存先を記録し、後追いできる状態を維持する。'
      ],
      tags: ['セキュリティ', 'コンプライアンス'],
      quiz: {
        question: '生成 AI に顧客のメールアドレスを入力する際に必須の対応はどれですか？',
        answer: '個人が特定されないよう伏字やダミーに置き換えてから入力する',
        distractors: [
          '顧客から口頭で許可を得ていれば生データで入力してよい',
          '部署内で共有済みなら特別な対応は不要',
          'パスワード付きファイルに入れてアップロードすれば問題ない'
        ]
      }
    },
    {
      id: 'rule-tool-approval',
      category: 'ルール',
      term: '利用ツールの承認フローを守る',
      summary: '業務で使用する AI ツールは、情報セキュリティチームの承認を得たものに限定します。',
      points: [
        '社外サービスを新たに試すときは事前にリスク評価と申請を行う。',
        '無料版や個人アカウントの利用は禁止。必ず会社アカウントでログを取得する。',
        '承認済みツールの一覧は社内ポータルで最新を確認する。'
      ],
      tags: ['ガバナンス', 'ツール管理'],
      quiz: {
        question: '新しい AI サービスを業務で利用する前に最初に行うべきことは何ですか？',
        answer: '情報セキュリティチームに申請し、利用承認を得る',
        distractors: [
          'まずは個人アカウントで試してみてから判断する',
          '同僚の評価だけを参考にして利用開始する',
          '問題が起きたときだけ上長に報告する'
        ]
      }
    },
    {
      id: 'rule-log-retention',
      category: 'ルール',
      term: 'プロンプトと出力を記録する',
      summary: '重要なプロンプトや出力は監査用に残し、再現性を確保します。',
      points: [
        '顧客向けの回答や意思決定に使ったプロンプトは、日時と担当者を添えて記録する。',
        'ログはプロジェクト共有ドライブに保管し、1年間は閲覧できる状態を維持する。',
        'チャットツールでのやり取りもスクリーンショットではなくテキストで保存する。'
      ],
      tags: ['監査', 'ナレッジ管理'],
      quiz: {
        question: 'プロンプトログを残す主な目的はどれですか？',
        answer: '意思決定の根拠を示し、後から検証できるようにするため',
        distractors: [
          '業務時間を計測するため',
          'AI モデルの性能を上げるために自動学習させるため',
          'チャットツールの容量を消費するため'
        ]
      }
    },
    {
      id: 'checklist-fact-check',
      category: 'チェックリスト',
      term: '出力のファクトチェック',
      summary: 'AI の回答は必ず一次情報で裏取りし、誤情報を防ぎます。',
      points: [
        '出典を 2 つ以上確認し、齟齬があれば人間の判断を優先する。',
        '引用する場合は公開可能な情報かどうかを確認し、参照元を明記する。',
        '判定が曖昧な回答はそのまま送らず、補足説明を添えて確認を取る。'
      ],
      tags: ['品質保証', 'レビュー'],
      quiz: {
        question: 'AI の回答を顧客に提出する直前に必ず実施するべきことは何ですか？',
        answer: '一次情報や社内ナレッジで内容を照合し、誤りがないか確認する',
        distractors: [
          '生成直後の回答をそのままコピペする',
          '回答文を短くするために一部を削除する',
          '専門外のメンバーに最終判断を委ねる'
        ]
      }
    },
    {
      id: 'checklist-bias',
      category: 'チェックリスト',
      term: 'バイアスと倫理の確認',
      summary: 'AI 出力に偏りや差別的表現が含まれないかをチェックします。',
      points: [
        '属性による決めつけがないか、表現の公平性を確認する。',
        '禁止ワードや攻撃的な表現が含まれていれば書き換える。',
        '意思決定に影響する場合は、複数メンバーでレビューし合意を得る。'
      ],
      tags: ['倫理', 'レビュー'],
      quiz: {
        question: '偏った出力が疑われる場合の適切な対応はどれですか？',
        answer: 'チームで再確認し、表現を修正するか追加情報を求める',
        distractors: [
          'そのまま公開してユーザーの反応を見る',
          'AI に再生成させるが、結果は確認しない',
          '対象の属性を伏せたまま判断を進める'
        ]
      }
    },
    {
      id: 'checklist-sharing',
      category: 'チェックリスト',
      term: '成果物共有前のチェック',
      summary: '社外共有前に公開可否と権限設定を確認します。',
      points: [
        'ドキュメントのアクセス権限が最小限になっているか確認する。',
        '生成物に社内限定情報が含まれていないかをレビューする。',
        '共有履歴を社内ポータルに記録し、公開期間を設定する。'
      ],
      tags: ['情報共有', '公開管理'],
      quiz: {
        question: 'AI が作成した資料を社外に共有する前の必須確認は？',
        answer: '閲覧権限と内容を再確認し、社外に出して問題ないか判断する',
        distractors: [
          '相手のメールアドレスだけ確認すればよい',
          'ファイルサイズが大きすぎないかだけ確認する',
          '納期が近い場合は確認を省略する'
        ]
      }
    },
    {
      id: 'tip-clarify-goal',
      category: 'コツ',
      term: '期待する成果を具体化する',
      summary: '目的・アウトプット形式・制約条件を先に整理すると精度が上がります。',
      points: [
        '誰向けの資料か、用途やトーンを明示する。',
        '字数・形式・参照すべき資料などを具体的に伝える。',
        '回答例や評価基準を添えて期待値を合わせる。'
      ],
      tags: ['プロンプト設計', '要件定義'],
      quiz: {
        question: 'プロンプトの冒頭で必ず伝えておくべき情報は？',
        answer: '目的や対象読者、求める形式など具体的な要件',
        distractors: [
          'モデルに任せると伝える',
          'とりあえず長文で出すよう指示する',
          '社内の雑談ネタを先に書く'
        ]
      }
    },
    {
      id: 'tip-step-by-step',
      category: 'コツ',
      term: '段階的に指示を与える',
      summary: '複雑な課題は小さなステップに分けて指示すると安定します。',
      points: [
        'まず全体像を作ってから詳細化を指示する。',
        '各ステップで確認質問を挟み、期待値とズレがないかチェックする。',
        '前段のアウトプットを踏まえて次の指示を出す。'
      ],
      tags: ['プロセス設計', '対話術'],
      quiz: {
        question: '複雑なタスクで成果を安定させるコツは？',
        answer: '作業をステップに分け、各段階で確認しながら進める',
        distractors: [
          '最初にすべての指示をまとめて与える',
          'AI の返答を待たずに次の質問を送る',
          '途中経過は記録せず結果だけ確認する'
        ]
      }
    },
    {
      id: 'tip-library',
      category: 'コツ',
      term: '成功したプロンプトを資産化',
      summary: '再利用できるプロンプトやナレッジはライブラリ化して共有します。',
      points: [
        '良かった対話はテンプレート化し、使いどころも併記する。',
        '改善履歴や検証結果をコメントとして残し、更新日を記録する。',
        '共有ライブラリはタグ検索できるよう整理する。'
      ],
      tags: ['ナレッジ共有', '継続改善'],
      quiz: {
        question: 'プロンプトライブラリを作る主なメリットは？',
        answer: '再利用できる形に整理し、チーム全体で品質を底上げできる',
        distractors: [
          '個人の評価を上げるため情報を独占できる',
          '失敗事例を消してしまえる',
          'ドキュメント作成の手間を完全になくせる'
        ]
      }
    },
    {
      id: 'rule-feedback-loop',
      category: 'ルール',
      term: '検証結果をチームにフィードバック',
      summary: 'AI 活用の成果とリスクは共有し、改善サイクルを回します。',
      points: [
        '成功・失敗の事例を週次レポートにまとめて共有する。',
        'リスクや想定外の挙動は再現条件と合わせて報告する。',
        '改善提案や次のアクションを明文化しておく。'
      ],
      tags: ['ナレッジ共有', 'リスク管理'],
      quiz: {
        question: 'AI 実験で想定外の挙動が起きたときの対応として正しいのは？',
        answer: '再現条件をまとめてチームに共有し、対策を検討する',
        distractors: [
          '問題が解決するまで記録を残さない',
          '個人で判断して作業を続行する',
          '原因が分からないので何もしない'
        ]
      }
    }
  ];

  const state = {
    filter: 'all',
    learned: loadLearnedSet(),
    flashcard: {
      pool: [],
      index: 0,
      unlearnedOnly: true
    },
    quiz: {
      questions: [],
      currentIndex: 0,
      score: 0,
      active: false
    }
  };

  const elements = {
    cardList: document.getElementById('card-list'),
    filterButtons: Array.from(document.querySelectorAll('.filter-btn')),
    progressCount: document.getElementById('progress-count'),
    progressBar: document.getElementById('progress-bar'),
    flashcard: document.getElementById('flashcard'),
    flashcardTerm: document.getElementById('flashcard-term'),
    flashcardSummary: document.getElementById('flashcard-summary'),
    flashcardDetail: document.getElementById('flashcard-detail'),
    flashcardCount: document.getElementById('flashcard-count'),
    flashcardPrev: document.getElementById('flashcard-prev'),
    flashcardNext: document.getElementById('flashcard-next'),
    flashcardFlip: document.getElementById('flashcard-flip'),
    flashcardLearned: document.getElementById('flashcard-learned'),
    flashcardCheckbox: document.getElementById('flashcard-unlearned'),
    flashcardReset: document.getElementById('flashcard-reset'),
    quizCountInput: document.getElementById('quiz-count'),
    quizUnlearnedCheckbox: document.getElementById('quiz-unlearned'),
    quizSetupMessage: document.getElementById('quiz-setup-message'),
    quizSetup: document.getElementById('quiz-setup'),
    quizBody: document.getElementById('quiz-body'),
    quizResult: document.getElementById('quiz-result'),
    quizQuestion: document.getElementById('quiz-question'),
    quizOptions: document.getElementById('quiz-options'),
    quizFeedback: document.getElementById('quiz-feedback'),
    quizProgress: document.getElementById('quiz-progress'),
    quizScore: document.getElementById('quiz-score'),
    quizNext: document.getElementById('quiz-next'),
    quizRestart: document.getElementById('quiz-restart'),
    quizRestartFinal: document.getElementById('quiz-restart-final'),
    quizResultMessage: document.getElementById('quiz-result-message'),
    startQuiz: document.getElementById('start-quiz')
  };

  init();

  function init() {
    renderCards();
    updateProgress();
    attachFilterEvents();
    attachCardEvents();
    initFlashcards();
    initQuiz();
    updateQuizSetupMessage();
  }

  function loadLearnedSet() {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return new Set();
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return new Set();
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    } catch (error) {
      console.warn('学習状況の読み込みに失敗しました:', error);
    }
    return new Set();
  }

  function saveLearnedSet() {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(state.learned)));
    } catch (error) {
      console.warn('学習状況の保存に失敗しました:', error);
    }
  }

  function renderCards() {
    const fragment = document.createDocumentFragment();
    const filteredItems = wordItems.filter((item) => state.filter === 'all' || item.category === state.filter);

    if (filteredItems.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = '該当するカードがありません。フィルタ条件を変更してください。';
      emptyMessage.className = 'card-empty';
      elements.cardList.innerHTML = '';
      elements.cardList.appendChild(emptyMessage);
      return;
    }

    filteredItems.forEach((item) => {
      fragment.appendChild(createCardElement(item));
    });

    elements.cardList.innerHTML = '';
    elements.cardList.appendChild(fragment);
  }

  function createCardElement(item) {
    const article = document.createElement('article');
    article.className = 'card';
    article.dataset.id = item.id;

    const header = document.createElement('div');
    header.className = 'card-header';

    const badge = document.createElement('span');
    badge.className = `badge${item.category === 'コツ' ? ' tip' : item.category === 'チェックリスト' ? ' checklist' : ''}`;
    badge.textContent = item.category;
    header.appendChild(badge);

    const status = document.createElement('span');
    status.className = 'learned-tag';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    header.appendChild(status);

    article.appendChild(header);

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = item.term;
    article.appendChild(title);

    const summary = document.createElement('p');
    summary.className = 'card-summary';
    summary.textContent = item.summary;
    article.appendChild(summary);

    if (item.tags && item.tags.length > 0) {
      const tagList = document.createElement('div');
      tagList.className = 'tags';
      item.tags.forEach((tagText) => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tagText;
        tagList.appendChild(tag);
      });
      article.appendChild(tagList);
    }

    const details = document.createElement('div');
    details.className = 'card-details';
    const list = document.createElement('ul');
    list.className = 'card-points';
    item.points.forEach((point) => {
      const listItem = document.createElement('li');
      listItem.textContent = point;
      list.appendChild(listItem);
    });
    details.appendChild(list);
    article.appendChild(details);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const learnButton = document.createElement('button');
    learnButton.className = 'learn-btn';
    learnButton.dataset.action = 'toggle-learned';
    learnButton.dataset.id = item.id;
    actions.appendChild(learnButton);

    article.appendChild(actions);

    updateCardStatus(article, state.learned.has(item.id));

    return article;
  }

  function updateCardStatus(article, isLearned) {
    const status = article.querySelector('.learned-tag');
    const button = article.querySelector('.learn-btn');

    if (!status || !button) return;

    status.textContent = isLearned ? '習得済み' : '復習中';
    status.classList.toggle('done', isLearned);
    status.classList.toggle('pending', !isLearned);

    button.textContent = isLearned ? '未習得に戻す' : '習得済みにする';
    button.setAttribute('aria-pressed', String(isLearned));
    article.dataset.learned = isLearned ? 'true' : 'false';
  }

  function attachFilterEvents() {
    elements.filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        elements.filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        state.filter = button.dataset.filter || 'all';
        renderCards();
      });
    });
  }

  function attachCardEvents() {
    elements.cardList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="toggle-learned"]');
      if (!button) return;
      const id = button.dataset.id;
      toggleLearned(id);
    });
  }

  function toggleLearned(id) {
    if (!id) return;
    if (state.learned.has(id)) {
      state.learned.delete(id);
    } else {
      state.learned.add(id);
    }
    saveLearnedSet();
    updateProgress();
    renderCards();
    updateFlashcardPool();
    updateQuizSetupMessage();
  }

  function updateProgress() {
    const total = wordItems.length;
    const learnedCount = state.learned.size;
    elements.progressCount.textContent = `${learnedCount} / ${total}`;
    elements.progressBar.max = Math.max(total, 1);
    elements.progressBar.value = learnedCount;
  }

  function initFlashcards() {
    state.flashcard.unlearnedOnly = elements.flashcardCheckbox.checked;
    elements.flashcardCheckbox.addEventListener('change', () => {
      state.flashcard.unlearnedOnly = elements.flashcardCheckbox.checked;
      updateFlashcardPool(true);
    });

    elements.flashcardPrev.addEventListener('click', () => navigateFlashcard(-1));
    elements.flashcardNext.addEventListener('click', () => navigateFlashcard(1));
    elements.flashcardFlip.addEventListener('click', () => {
      elements.flashcard.classList.toggle('flipped');
    });
    elements.flashcardLearned.addEventListener('click', () => {
      const current = getCurrentFlashcardItem();
      if (!current) return;
      const alreadyLearned = state.learned.has(current.id);
      if (alreadyLearned) {
        state.learned.delete(current.id);
      } else {
        state.learned.add(current.id);
      }
      saveLearnedSet();
      updateProgress();
      renderCards();
      updateFlashcardPool(true);
      updateQuizSetupMessage();
    });

    elements.flashcardReset.addEventListener('click', () => {
      updateFlashcardPool(true);
    });

    updateFlashcardPool();
  }

  function navigateFlashcard(step) {
    if (!state.flashcard.pool.length) return;
    const length = state.flashcard.pool.length;
    state.flashcard.index = (state.flashcard.index + step + length) % length;
    renderFlashcard();
  }

  function updateFlashcardPool(resetIndex = false) {
    const eligible = wordItems.filter((item) => {
      return state.flashcard.unlearnedOnly ? !state.learned.has(item.id) : true;
    });

    state.flashcard.pool = shuffleArray(eligible);
    if (!state.flashcard.pool.length) {
      state.flashcard.index = 0;
    } else if (resetIndex || state.flashcard.index >= state.flashcard.pool.length) {
      state.flashcard.index = 0;
    }
    renderFlashcard();
  }

  function renderFlashcard() {
    const flashcardElement = elements.flashcard;
    flashcardElement.classList.remove('flipped');

    if (!state.flashcard.pool.length) {
      elements.flashcardTerm.textContent = 'すべてのカードを習得しました！';
      elements.flashcardSummary.textContent = 'フィルタ設定を変えるか、未習得に戻して復習を続けましょう。';
      elements.flashcardDetail.textContent = '';
      elements.flashcardCount.textContent = '';
      setFlashcardButtonsDisabled(true);
      return;
    }

    const current = state.flashcard.pool[state.flashcard.index];
    const isLearned = state.learned.has(current.id);
    elements.flashcardTerm.textContent = current.term;
    elements.flashcardSummary.textContent = current.summary;
    elements.flashcardDetail.textContent = current.points.map((point) => `・${point}`).join('\n');
    elements.flashcardCount.textContent = `${state.flashcard.index + 1} / ${state.flashcard.pool.length}`;
    elements.flashcardLearned.textContent = isLearned ? '未習得に戻す' : '習得済みにする';
    setFlashcardButtonsDisabled(false);
  }

  function setFlashcardButtonsDisabled(isDisabled) {
    [
      elements.flashcardPrev,
      elements.flashcardNext,
      elements.flashcardFlip,
      elements.flashcardLearned
    ].forEach((button) => {
      button.disabled = isDisabled;
      if (isDisabled) {
        button.classList.add('disabled');
      } else {
        button.classList.remove('disabled');
      }
    });
  }

  function getCurrentFlashcardItem() {
    if (!state.flashcard.pool.length) return null;
    return state.flashcard.pool[state.flashcard.index];
  }

  function initQuiz() {
    elements.startQuiz.addEventListener('click', handleStartQuiz);
    elements.quizNext.addEventListener('click', handleNextQuestion);
    elements.quizRestart.addEventListener('click', resetQuiz);
    elements.quizRestartFinal.addEventListener('click', resetQuiz);
    elements.quizCountInput.addEventListener('input', updateQuizSetupMessage);
    elements.quizUnlearnedCheckbox.addEventListener('change', updateQuizSetupMessage);
  }

  function handleStartQuiz() {
    const desiredCount = Math.max(3, Math.min(10, Number(elements.quizCountInput.value) || 5));
    elements.quizCountInput.value = desiredCount;

    const useUnlearnedOnly = elements.quizUnlearnedCheckbox.checked;
    const eligibleItems = wordItems.filter((item) => !useUnlearnedOnly || !state.learned.has(item.id));

    if (!eligibleItems.length) {
      elements.quizSetupMessage.textContent = useUnlearnedOnly
        ? '未習得のカードがないため、テストを開始できません。'
        : 'カードが登録されていません。';
      return;
    }

    const questionCount = Math.min(desiredCount, eligibleItems.length);
    if (questionCount < desiredCount) {
      elements.quizSetupMessage.textContent = `利用可能なカードは ${eligibleItems.length} 件です。問題数を ${questionCount} に調整しました。`;
      elements.quizCountInput.value = questionCount;
    } else {
      elements.quizSetupMessage.textContent = '';
    }

    state.quiz.questions = shuffleArray(eligibleItems).slice(0, questionCount).map(createQuizQuestion);
    state.quiz.currentIndex = 0;
    state.quiz.score = 0;
    state.quiz.active = true;

    elements.quizSetup.classList.add('hidden');
    elements.quizResult.classList.add('hidden');
    elements.quizBody.classList.remove('hidden');
    elements.quizScore.textContent = `正解: 0`;
    renderCurrentQuestion();
  }

  function createQuizQuestion(item) {
    const options = [item.quiz.answer, ...item.quiz.distractors];
    return {
      itemId: item.id,
      prompt: item.quiz.question,
      answer: item.quiz.answer,
      options: shuffleArray(options)
    };
  }

  function renderCurrentQuestion() {
    const question = state.quiz.questions[state.quiz.currentIndex];
    elements.quizQuestion.textContent = question.prompt;
    elements.quizProgress.textContent = `${state.quiz.currentIndex + 1} / ${state.quiz.questions.length}`;
    elements.quizScore.textContent = `正解: ${state.quiz.score}`;
    elements.quizFeedback.textContent = '';
    elements.quizNext.disabled = true;
    elements.quizNext.textContent = state.quiz.currentIndex === state.quiz.questions.length - 1 ? '結果を見る' : '次の問題へ';

    elements.quizOptions.innerHTML = '';
    question.options.forEach((option) => {
      const listItem = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = option;
      button.dataset.value = option;
      button.addEventListener('click', () => handleAnswerSelection(button, question));
      listItem.appendChild(button);
      elements.quizOptions.appendChild(listItem);
    });
  }

  function handleAnswerSelection(button, question) {
    if (!state.quiz.active) return;
    const alreadyAnswered = elements.quizOptions.querySelector('button.correct, button.incorrect');
    if (alreadyAnswered) return;

    const userAnswer = button.dataset.value;
    const isCorrect = userAnswer === question.answer;

    if (isCorrect) {
      button.classList.add('correct');
      elements.quizFeedback.textContent = '正解です！よく理解できています。';
      state.quiz.score += 1;
      elements.quizScore.textContent = `正解: ${state.quiz.score}`;
    } else {
      button.classList.add('incorrect');
      elements.quizFeedback.textContent = '不正解です。ポイントを復習しましょう。';
    }

    elements.quizOptions.querySelectorAll('button').forEach((optionButton) => {
      optionButton.disabled = true;
      if (optionButton.dataset.value === question.answer) {
        optionButton.classList.add('correct');
      }
    });

    elements.quizNext.disabled = false;
  }

  function handleNextQuestion() {
    if (!state.quiz.active) return;

    if (state.quiz.currentIndex < state.quiz.questions.length - 1) {
      state.quiz.currentIndex += 1;
      renderCurrentQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    state.quiz.active = false;
    elements.quizBody.classList.add('hidden');
    elements.quizResult.classList.remove('hidden');

    const total = state.quiz.questions.length;
    const score = state.quiz.score;
    const ratio = score / total;
    let message = `正解数は ${score} / ${total} でした。`;

    if (ratio === 1) {
      message += ' 完璧です！この調子で知識を維持しましょう。';
    } else if (ratio >= 0.7) {
      message += ' 良い結果です。迷ったカードを重点的に復習しましょう。';
    } else if (ratio >= 0.4) {
      message += ' もう一歩です。気になったカードを単語帳で復習してみてください。';
    } else {
      message += ' 復習の余地があります。未習得カードを中心にフラッシュカードで学び直しましょう。';
    }

    elements.quizResultMessage.textContent = message;
  }

  function resetQuiz() {
    state.quiz.active = false;
    elements.quizBody.classList.add('hidden');
    elements.quizResult.classList.add('hidden');
    elements.quizSetup.classList.remove('hidden');
    elements.quizFeedback.textContent = '';
    elements.quizOptions.innerHTML = '';
    elements.quizSetupMessage.textContent = '';
    state.quiz.questions = [];
    state.quiz.currentIndex = 0;
    state.quiz.score = 0;
    updateQuizSetupMessage();
  }

  function updateQuizSetupMessage() {
    const desiredCount = Math.max(3, Math.min(10, Number(elements.quizCountInput.value) || 5));
    const useUnlearnedOnly = elements.quizUnlearnedCheckbox.checked;
    const eligibleItems = wordItems.filter((item) => !useUnlearnedOnly || !state.learned.has(item.id));

    let message = '';
    if (!eligibleItems.length) {
      message = useUnlearnedOnly
        ? '未習得のカードがないため、テストを開始できません。'
        : 'カードが登録されていません。';
    } else if (desiredCount > eligibleItems.length) {
      message = `利用可能なカードは ${eligibleItems.length} 件です。問題数を調整してください。`;
    }

    elements.quizSetupMessage.textContent = message;
  }

  function shuffleArray(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
})();
