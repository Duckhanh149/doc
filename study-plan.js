(() => {
  const el = id => document.getElementById(id);
  const picker = el("plan-week");
  const body = el("plan-activity");
  const controls = el("plan-controls");
  const status = el("plan-status");
  const sessions = ["Gợi nhớ từ vựng", "Đọc hiểu", "Nghe hiểu", "Nói và viết", "Kiểm tra cuối tuần"];
  const intervals = [1, 3, 7, 14, 30, 60, 90];
  const key = "thong-ngu-study-plan-v1";
  const items = new Map();

  function getItem(week, type) {
    return items.get(week + ":" + type);
  }

  studyWeeks.forEach((week, index) => {
    week.vocabulary.forEach(([prompt, answer], i) => {
      items.set(index + ":v" + i, { prompt, answer, lang: "en" });
    });
    items.set(index + ":read", { prompt: week.reading[0], answer: week.reading[1], passage: week.passage });
    items.set(index + ":listen", { prompt: week.listening, answer: week.answers[0], audio: week.audio });
    items.set(index + ":check", { prompt: week.checkpoint[0], answer: week.checkpoint[1] });
    picker.add(new Option("Tuần " + (index + 1) + " · " + week.level + " · " + week.title, index));
  });

  let state = { completed: {}, cards: {}, drafts: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? "null");
    if (saved && typeof saved.completed === "object" && typeof saved.cards === "object" && typeof saved.drafts === "object") {
      state = { completed: saved.completed ?? {}, cards: saved.cards ?? {}, drafts: saved.drafts ?? {} };
    }
  } catch {
    // A corrupt local record must not stop a new session.
  }

  function nextSession() {
    for (let w = 0; w < studyWeeks.length; w++) {
      const index = sessions.findIndex((_, s) => !state.completed[w + ":" + s]);
      if (index >= 0) return { week: w, session: index };
    }
    return { week: 0, session: 0 };
  }

  let { week, session } = nextSession();
  let cards = [];
  let position = 0;
  let mode = "";
  let storageError = false;

  function node(tag, text, lang) {
    const result = document.createElement(tag);
    result.textContent = text ?? "";
    if (lang) result.lang = lang;
    return result;
  }

  function button(label, action, primary = false) {
    const result = node("button", label);
    result.type = "button";
    if (primary) result.className = "primary";
    result.addEventListener("click", action);
    return result;
  }

  function announce(message) {
    status.textContent = message + (storageError ? " Máy chưa lưu được tiến độ." : "");
  }

  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(state));
      storageError = false;
    } catch {
      storageError = true;
    }
  }

  function schedule(id, remembered, mistake = false) {
    const old = state.cards[id];
    if (remembered && old?.due > Date.now()) return;
    const level = remembered ? Math.min((old?.level ?? -1) + 1, intervals.length - 1) : 0;
    const next = new Date();
    next.setDate(next.getDate() + intervals[level]);
    next.setHours(0, 0, 0, 0);
    state.cards[id] = { level: mistake ? -1 : level, due: mistake ? Date.now() : next.getTime() };
    save();
    renderSummary();
  }

  function dueCards() {
    const now = Date.now();
    return [...items.keys()].filter(id => state.cards[id]?.due <= now)
      .sort((a, b) => state.cards[a].due - state.cards[b].due);
  }

  function weekCards() {
    return [...items.keys()].filter(id => id.startsWith(week + ":"));
  }

  function renderSummary() {
    const done = Object.keys(state.completed).length;
    const total = studyWeeks.length * sessions.length;
    const meter = el("plan-total-progress");
    meter.max = total;
    meter.value = done;
    el("plan-level").textContent = studyWeeks[week].level;
    el("plan-current-week").textContent = "Tuần " + (week + 1) + " · " + studyWeeks[week].title;
    el("study-plan-summary").textContent = done + " / " + total + " buổi";
    const finished = sessions.filter((_, i) => state.completed[week + ":" + i]).length;
    el("plan-week-progress").textContent = finished + " / 5 buổi đã học";
    const due = dueCards().length;
    const review = el("plan-due");
    review.textContent = due ? "Ôn " + due + " thẻ đến hạn" : "Chưa có thẻ đến hạn";
    review.disabled = due === 0;
  }

  function play(text) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      announce("Không tìm thấy giọng đọc. Anh có thể mở lời nghe.");
      return;
    }
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = studyWeeks[week].level === "Pre-A1" ? 0.8 : 0.95;
    speech.onerror = event => {
      if (!["interrupted", "canceled"].includes(event.error)) announce("Chưa phát được giọng đọc tiếng Anh.");
    };
    window.speechSynthesis.speak(speech);
  }

  function disclosure(label, text) {
    const details = node("details");
    details.append(node("summary", label), node("p", text, "en"));
    return details;
  }

  function renderMenu() {
    picker.value = String(week);
    const list = sessions.map((label, index) => {
      const li = node("li");
      const choose = button("", () => open(week, index, true));
      const complete = !!state.completed[week + ":" + index];
      const marker = node("span", complete ? "✓" : String(index + 1));
      marker.className = "session-marker";
      marker.setAttribute("aria-hidden", "true");
      choose.append(marker, node("span", label), node("small", complete ? "Đã học" : ""));
      if (index === session && !mode) choose.setAttribute("aria-current", "true");
      li.append(choose);
      return li;
    });
    el("plan-sessions").replaceChildren(...list);
    renderSummary();
  }

  function open(w, s, focus) {
    week = w;
    session = s;
    mode = "";
    cards = s === 0 ? weekCards().filter(id => id.includes(":v")) : [];
    position = 0;
    render(focus);
  }

  function complete() {
    if (mode) {
      open(week, session, true);
      return;
    }
    state.completed[week + ":" + session] = true;
    save();
    const following = nextSession();
    renderMenu();
    const allDone = Object.keys(state.completed).length === studyWeeks.length * sessions.length;
    controls.replaceChildren(allDone
      ? button("Ôn lại tuần này", () => startReview(weekCards(), "Ôn lại tuần " + (week + 1)), true)
      : button("Tiếp tục kế hoạch", () => open(following.week, following.session, true), true));
    announce("Đã hoàn thành buổi học.");
    controls.firstElementChild.focus();
  }

  function renderCards() {
    const id = cards[position];
    if (!id) {
      body.append(node("p", "Đã ôn hết " + cards.length + " thẻ trong lượt này."));
      controls.append(button(mode ? "Quay về buổi học" : "Hoàn thành buổi", complete, true));
      return;
    }
    const item = items.get(id);
    body.append(node("p", "Thẻ " + (position + 1) + " / " + cards.length + " · Thử nhớ trước khi lật thẻ."));
    if (item.passage) body.append(disclosure("Đọc lại đoạn văn", item.passage));
    if (item.audio) body.append(button("Nghe lại đoạn", () => play(item.audio)));
    const word = node("p", item.prompt, item.lang);
    word.className = "word-meaning";
    body.append(word);
    const answer = node("p", item.answer);
    answer.hidden = true;
    body.append(answer);
    function rate(value) {
      schedule(id, value);
      position++;
      render();
      controls.querySelector("button")?.focus();
    }
    controls.append(button("Hiện đáp án", () => {
      answer.hidden = false;
      controls.replaceChildren(button("Chưa nhớ", () => rate(false)), button("Đã nhớ", () => rate(true), true));
      controls.firstElementChild.focus();
    }, true));
  }

  function quiz(question, id, offset, onAnswer) {
    const [prompt, correct, ...incorrect] = question;
    const options = [correct, ...incorrect];
    const area = node("div");
    area.className = "plan-quiz";
    area.append(node("p", prompt));
    const feedback = node("p");
    feedback.setAttribute("role", "status");
    const choices = node("div");
    choices.className = "course-actions";
    for (let i = 0; i < options.length; i++) {
      const option = options[(i + offset) % options.length];
      choices.append(button(option, () => {
        const match = option === correct;
        schedule(id, match, !match);
        for (const choice of choices.children) choice.disabled = true;
        feedback.textContent = match ? "Đúng rồi." : "Đáp án: " + correct;
        onAnswer();
      }));
    }
    area.append(choices, feedback);
    return area;
  }

  function completeButton(disabled = false) {
    const action = button("Hoàn thành buổi", complete, true);
    action.disabled = disabled;
    controls.append(action);
    return action;
  }

  function renderRead(unit) {
    const passage = node("p", unit.passage, "en");
    passage.className = "plan-passage";
    const finish = completeButton(true);
    const extension = node("details");
    extension.append(node("summary", "Luyện đọc thêm"), node("p", "Tìm cụm từ trong đoạn văn làm căn cứ cho đáp án. Sau đó che đoạn văn và thử nói lại ý chính bằng tiếng Anh. Mở đoạn văn để đối chiếu xem anh có thêm chi tiết ngoài bài không."));
    body.append(passage, quiz(unit.reading, week + ":read", week, () => { finish.disabled = false; }), extension);
  }

  function normalize(value) {
    return value.normalize("NFKC").toLowerCase().trim().replace(/[.!?]+$/u, "").replace(/\s+/g, " ");
  }

  function renderListen(unit) {
    const finish = completeButton(true);
    const field = node("input", "", "en");
    field.id = "plan-listening";
    field.maxLength = 80;
    const label = node("label", unit.listening + " Nhập đáp án bằng tiếng Anh hoặc chữ số.");
    label.htmlFor = field.id;
    const feedback = node("p");
    feedback.setAttribute("role", "status");
    const check = button("Kiểm tra", () => {
      const answer = field.value.trim();
      if (!answer) { field.focus(); return; }
      const correct = unit.answers.some(expected => normalize(expected) === normalize(answer));
      schedule(week + ":listen", correct, !correct);
      feedback.textContent = correct ? "Đúng rồi." : "Đáp án: " + unit.answers[0];
      finish.disabled = false;
    });
    field.addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.isComposing) check.click();
    });
    const extension = node("details");
    const dictation = node("textarea", "", "en");
    dictation.id = "plan-dictation";
    dictation.rows = 3;
    dictation.maxLength = 2000;
    const dictationLabel = node("label", "Nghe lại rồi chép một câu hoặc cả đoạn");
    dictationLabel.htmlFor = dictation.id;
    extension.append(node("summary", "Luyện chép và nói theo"), dictationLabel, dictation,
      disclosure("Mở lời nghe để đối chiếu", unit.audio), node("p", "Sau khi đối chiếu, đọc thành tiếng theo từng câu. Chú ý từ bị bỏ sót và âm cuối."));
    body.append(button("Nghe đoạn tiếng Anh", () => play(unit.audio), true), label, field, check, feedback, extension);
  }

  function renderOutput(unit) {
    const label = node("label", unit.prompt);
    label.htmlFor = "plan-writing";
    const field = node("textarea", "", "en");
    field.id = label.htmlFor;
    field.rows = 5;
    field.maxLength = 6000;
    field.value = state.drafts[week] ?? "";
    field.placeholder = "Thử nói thành tiếng rồi viết lại…";
    const finish = completeButton(!field.value.trim());
    field.addEventListener("input", () => {
      state.drafts[week] = field.value;
      save();
      finish.disabled = !field.value.trim();
      if (storageError) announce("");
    });
    body.append(label, field, disclosure("Xem gợi ý trả lời", unit.sample),
      button("Nghe câu trả lời mẫu", () => play(unit.sample)));
  }

  function renderCheckpoint(unit) {
    const finish = completeButton(true);
    const reviewIds = weekCards().filter(id => id.includes(":v"));
    const drill = reviewIds.map((id, index) => {
      const item = items.get(id);
      const alternatives = reviewIds.filter(other => other !== id).slice(0, 2).map(other => items.get(other).answer);
      return { question: ["Nghĩa của “" + item.prompt + "” là gì?", item.answer, ...alternatives], id, offset: week + index };
    });
    drill.push({ question: unit.checkpoint, id: week + ":check", offset: week + 1 });
    let answered = 0;
    body.append(node("p", "Tự kiểm tra từ vựng và một điểm ngữ pháp hoặc kỹ năng của tuần. Câu sai sẽ vào lượt ôn."));
    for (const { question, id, offset } of drill) {
      body.append(quiz(question, id, offset, () => { finish.disabled = ++answered !== drill.length; }));
    }
  }

  function render(focus = false) {
    window.speechSynthesis?.cancel();
    renderMenu();
    body.replaceChildren();
    controls.replaceChildren();
    announce("");
    const unit = studyWeeks[week];
    const title = el("plan-title");
    title.textContent = mode || unit.title;
    el("plan-step").textContent = mode ? "" : "Tuần " + (week + 1) + " · Buổi " + (session + 1) + "/5 · " + sessions[session];
    if (mode || session === 0) renderCards();
    else if (session === 1) renderRead(unit);
    else if (session === 2) renderListen(unit);
    else if (session === 3) renderOutput(unit);
    else renderCheckpoint(unit);
    if (focus) title.focus();
  }

  picker.addEventListener("change", () => {
    const selected = Number(picker.value);
    const pending = sessions.findIndex((_, s) => !state.completed[selected + ":" + s]);
    open(selected, Math.max(0, pending), true);
  });
  function startReview(ids, label) {
    if (!ids.length) return;
    cards = ids;
    position = 0;
    mode = label;
    render(true);
  }
  el("plan-due").addEventListener("click", () => startReview(dueCards().slice(0, 20), "Ôn theo lịch"));
  el("plan-review-week").addEventListener("click", () => startReview(weekCards(), "Ôn lại tuần " + (week + 1)));
  el("nav-study").addEventListener("click", renderSummary);
  open(week, session);
})();
