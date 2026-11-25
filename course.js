(() => {
  const lessons = [
    {
      title: "Giới thiệu bản thân",
      context: "Hai người gặp nhau lần đầu trong một lớp học.",
      lines: [["Mia", "Hi, I'm Mia. What's your name?"], ["Alex", "I'm Alex. Nice to meet you!"], ["Mia", "Nice to meet you, too. Where are you from?"], ["Alex", "I'm from Vietnam."]],
      translation: "Chào, mình là Mia. Bạn tên gì? — Mình là Alex. Rất vui được gặp bạn! — Mình cũng vậy. Bạn đến từ đâu? — Mình đến từ Việt Nam.",
      words: [["introduce", "giới thiệu"], ["meet", "gặp"], ["from", "đến từ"]],
      dictation: "I'm from Vietnam.",
      prompt: "Giới thiệu tên, nơi anh sống hoặc nơi anh đến, rồi nói rất vui được gặp người đối diện.",
      sample: "Hi, I'm Minh. I'm from Vietnam. Nice to meet you!"
    },
    {
      title: "Gọi đồ uống",
      context: "Một khách hàng gọi đồ uống tại quán cà phê.",
      lines: [["Barista", "Hi! What would you like?"], ["Customer", "I'd like a small coffee, please."], ["Barista", "For here or to go?"], ["Customer", "To go, please."]],
      translation: "Chào anh! Anh muốn dùng gì? — Cho tôi một cà phê cỡ nhỏ. — Anh dùng tại chỗ hay mang đi? — Cho tôi mang đi.",
      words: [["I'd like", "tôi muốn (cách nói lịch sự)"], ["to go", "mang đi"], ["small", "nhỏ"]],
      dictation: "I'd like a small coffee, please.",
      prompt: "Gọi một món anh thích và nói muốn dùng tại chỗ hay mang đi.",
      sample: "I'd like a tea, please. I'll have it here."
    },
    {
      title: "Hỏi đường",
      context: "Một khách hỏi đường đi bộ đến nhà ga.",
      lines: [["Visitor", "Excuse me, where is the station?"], ["Local", "Go straight and turn left."], ["Visitor", "Is it far?"], ["Local", "No, it's a five-minute walk."]],
      translation: "Xin lỗi, nhà ga ở đâu? — Đi thẳng rồi rẽ trái. — Có xa không? — Không, đi bộ năm phút thôi.",
      words: [["station", "nhà ga"], ["go straight", "đi thẳng"], ["turn left", "rẽ trái"]],
      dictation: "Go straight and turn left.",
      prompt: "Hỏi đường đến một địa điểm gần anh, rồi thử nói một câu chỉ đường.",
      sample: "Excuse me, where is the bank? Go straight and turn right."
    },
    {
      title: "Hẹn gặp bạn",
      context: "Hai người bạn đang chọn giờ và địa điểm gặp nhau.",
      lines: [["Kim", "Are you free on Saturday?"], ["Sam", "Yes. What time should we meet?"], ["Kim", "Let's meet at three."], ["Sam", "Great. See you at the park!"]],
      translation: "Thứ Bảy bạn có rảnh không? — Có. Mấy giờ chúng ta gặp nhau? — Gặp lúc ba giờ nhé. — Tuyệt. Hẹn gặp ở công viên!",
      words: [["free", "rảnh"], ["what time", "mấy giờ"], ["see you", "hẹn gặp lại"]],
      dictation: "Let's meet at three.",
      prompt: "Rủ một người bạn gặp vào một ngày, giờ và địa điểm cụ thể.",
      sample: "Are you free on Sunday? Let's meet at two at the café."
    },
    {
      title: "Mua sắm",
      context: "Một người hỏi giá và kích cỡ trong cửa hàng.",
      lines: [["Customer", "How much is this shirt?"], ["Clerk", "It's twenty dollars."], ["Customer", "Do you have it in a larger size?"], ["Clerk", "Yes, here you are."]],
      translation: "Áo này bao nhiêu tiền? — Hai mươi đô la. — Có cỡ lớn hơn không? — Có, của anh đây.",
      words: [["how much", "bao nhiêu tiền"], ["larger", "lớn hơn"], ["size", "kích cỡ"]],
      dictation: "How much is this shirt?",
      prompt: "Chọn một món đồ. Hỏi giá rồi hỏi người bán có màu hoặc kích cỡ khác không.",
      sample: "How much is this jacket? Do you have it in blue?"
    },
    {
      title: "Kể về một ngày",
      context: "Hai đồng nghiệp trò chuyện về thói quen hằng ngày.",
      lines: [["Jo", "What time do you start work?"], ["Lee", "I usually start at eight."], ["Jo", "What do you do after work?"], ["Lee", "I cook dinner and read a book."]],
      translation: "Mấy giờ bạn bắt đầu làm? — Tôi thường bắt đầu lúc tám giờ. — Bạn làm gì sau giờ làm? — Tôi nấu bữa tối rồi đọc sách.",
      words: [["usually", "thường"], ["after work", "sau giờ làm"], ["cook dinner", "nấu bữa tối"]],
      dictation: "I usually start at eight.",
      prompt: "Viết giờ anh thường bắt đầu công việc và một việc anh làm sau đó.",
      sample: "I usually start work at nine. After work, I go for a walk."
    },
    {
      title: "Nhờ giúp đỡ",
      context: "Một học viên chưa hiểu câu hỏi trong lớp.",
      lines: [["Student", "Sorry, I don't understand this question."], ["Teacher", "Which part is difficult?"], ["Student", "Could you explain the last word?"], ["Teacher", "Of course. Let's look at an example."]],
      translation: "Xin lỗi, em chưa hiểu câu hỏi này. — Phần nào khó? — Cô có thể giải thích từ cuối không? — Được chứ. Ta cùng xem một ví dụ nhé.",
      words: [["understand", "hiểu"], ["explain", "giải thích"], ["example", "ví dụ"]],
      dictation: "Could you explain the last word?",
      prompt: "Nói rằng anh chưa hiểu, rồi nhờ người đối diện nói chậm lại hoặc cho ví dụ.",
      sample: "Sorry, I don't understand. Could you give me an example?"
    }
  ];

  // Keep the original A1 indices so previous installations retain progress.
  lessons.push(...roadmap.units);

  const el = id => document.getElementById(id);
  const content = el("course-content");
  const next = el("course-next");
  const back = el("course-back");
  const status = el("course-status");
  const stepNames = ["Nghe và đọc", "Gợi nhớ từ vựng", "Nghe và chép", "Nói và viết"];
  const storageKey = "thong-ngu-course-v1";
  const allWords = new Map(lessons.flatMap(lesson => lesson.words));
  for (const lesson of lessons) {
    if (lesson.task?.kind !== "quiz") continue;
    for (const [question, answer, , explanation] of lesson.task.questions) {
      allWords.set(question, answer + " · " + explanation);
    }
  }
  const intervals = [1, 3, 7, 14, 30];
  let progress = { completed: [], review: {} };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (Array.isArray(saved?.completed) && saved.review && typeof saved.review === "object") {
      progress = saved;
    }
  } catch {
    // A damaged record does not prevent practicing a lesson.
  }

  function isDue(word, now = Date.now()) {
    return Number.isFinite(progress.review[word]?.due) && progress.review[word].due <= now;
  }


  function idsForStage(id, track = examTrack) {
    return lessons.flatMap((lesson, index) => {
      const matches = (lesson.stage ?? "a1") === id &&
        (!lesson.track || lesson.track === "Cả hai" || lesson.track === track);
      return matches ? [index] : [];
    });
  }

  function nextLesson() {
    const ordered = roadmap.stages.flatMap(stage => idsForStage(stage.id));
    return ordered.find(id => !progress.completed.includes(id)) ?? ordered[0];
  }

  let examTrack = progress.track === "General Training" ? progress.track : "Academic";
  let lessonId = nextLesson();
  let stageId = lessons[lessonId].stage ?? "a1";
  let step = 0;
  let round;
  let draft = { dictation: "", output: "", answers: [], deadline: 0 };
  let reviewMode = "";
  let clock;
  let beforeReview;

  function element(tag, text, lang) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (lang) node.lang = lang;
    return node;
  }

  function button(label, action, className) {
    const node = element("button", label);
    node.type = "button";
    if (className) node.className = className;
    node.addEventListener("click", action);
    return node;
  }

  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch {
      status.textContent = "Phiên học vẫn dùng được, nhưng máy chưa lưu được tiến độ.";
    }
  }

  function markWord(word, remembered) {
    if (remembered && progress.review[word]?.due > Date.now()) return;
    const oldLevel = progress.review[word]?.level ?? -1;
    const level = remembered ? Math.min(oldLevel + 1, intervals.length - 1) : 0;
    const due = new Date();
    due.setDate(due.getDate() + intervals[level]);
    due.setHours(0, 0, 0, 0);
    progress.review[word] = { level, due: due.getTime() };
    persist();
    updateSummary();
  }

  function dueWords() {
    return [...allWords].filter(([word]) => isDue(word));
  }

  function updateSummary() {
    const ids = idsForStage(stageId);
    const completed = ids.filter(id => progress.completed.includes(id)).length;
    el("course-summary").textContent = completed + " / " + ids.length + " bài trong chặng";
    const due = dueWords().length;
    const review = el("review-due");
    review.textContent = due ? "Ôn " + due + " thẻ đến hạn" : "Chưa có thẻ đến hạn";
    review.disabled = !due;
  }

  function stopAudio() {
    window.speechSynthesis?.cancel();
  }

  function speak(text, rate = 0.9) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      status.textContent = "Máy chưa có giọng đọc tiếng Anh. Anh có thể hiện lời thoại để tiếp tục.";
      return;
    }
    stopAudio();
    const clip = new SpeechSynthesisUtterance(text);
    clip.lang = "en-US";
    clip.rate = rate;
    clip.onerror = event => {
      if (event.error !== "interrupted" && event.error !== "canceled") {
        status.textContent = "Không phát được âm thanh. Anh kiểm tra giọng đọc tiếng Anh của Windows.";
      }
    };
    window.speechSynthesis.speak(clip);
  }

  function renderLessons() {
    const stage = roadmap.stages.find(item => item.id === stageId);
    el("course-stage").value = stageId;
    el("stage-goal").textContent = stage.goal;
    el("ielts-track-field").hidden = stageId !== "ielts";
    el("ielts-track").value = examTrack;
    const items = idsForStage(stageId).map(index => {
      const li = element("li");
      const label = element("span", lessons[index].title);
      const state = element("small", progress.completed.includes(index) ? "Đã học" : "");
      const choose = button("", () => openLesson(index, true));
      choose.append(label, state);
      if (!reviewMode && index === lessonId) choose.setAttribute("aria-current", "true");
      li.append(choose);
      return li;
    });
    el("lesson-list").replaceChildren(...items);
    updateSummary();
  }

  function openLesson(index, focus) {
    lessonId = index;
    stageId = lessons[index].stage ?? "a1";
    step = 0;
    round = undefined;
    draft = { dictation: "", output: "", answers: [], deadline: 0 };
    reviewMode = "";
    beforeReview = undefined;
    renderLessons();
    renderStep(focus);
  }

  function openStage(id) {
    const ids = idsForStage(id);
    openLesson(ids.find(index => !progress.completed.includes(index)) ?? ids[0], true);
  }

  function inputAndLabel(labelText, key) {
    const label = element("label", labelText);
    const field = element("textarea", "", "en");
    field.id = "course-response";
    field.rows = 3;
    field.maxLength = key === "output" ? 12000 : 1000;
    field.value = draft[key];
    field.addEventListener("input", () => { draft[key] = field.value; });
    label.htmlFor = field.id;
    return [label, field];
  }

  function modelDisclosure(label, text, lang) {
    const details = element("details");
    details.append(element("summary", label), element("p", text, lang));
    return details;
  }

  function renderInput(lesson) {
    const script = lesson.lines.map(([, line]) => line).join(" ");
    const dialogue = element("div");
    dialogue.className = "course-dialogue";
    for (const [name, line] of lesson.lines) {
      const row = element("p");
      row.append(element("strong", name), element("span", line, "en"));
      dialogue.append(row);
    }
    content.append(element("p", lesson.context), button("Nghe hội thoại", () => speak(script), "primary"), dialogue,
      modelDisclosure("Xem nghĩa tiếng Việt", lesson.translation, "vi"));
  }

  function renderRecall(words, finished) {
    round ??= { words, position: 0 };
    const current = round.words[round.position];
    next.disabled = !!current;
    if (!current) {
      content.append(element("p", "Đã hoàn thành lượt gợi nhớ. App sẽ đưa lại các thẻ khi đến hạn."));
      if (finished) next.textContent = "Về bài học";
      return;
    }
    const [word, meaning] = current;
    const actions = element("div");
    actions.className = "course-actions";
    const answer = element("p", meaning);
    answer.className = "word-meaning";
    answer.hidden = true;
    const remembered = button("Đã nhớ", () => rate(true), "primary");
    const forgot = button("Chưa nhớ", () => rate(false));
    remembered.hidden = true;
    forgot.hidden = true;
    const reveal = button("Hiện nghĩa", () => {
      answer.hidden = false;
      remembered.hidden = false;
      forgot.hidden = false;
      reveal.hidden = true;
      remembered.focus();
    });
    function rate(result) {
      round.position++;
      renderStep();
      markWord(word, result);
      (content.querySelector("button") || next).focus();
    }
    actions.append(reveal, remembered, forgot);
    const term = element("p", word, "en");
    term.className = "course-term";
    content.append(element("p", "Thẻ " + (round.position + 1) + " / " + round.words.length +
      ". Thử tự nhớ nghĩa hoặc đáp án trước khi lật."), term, answer, actions);
  }

  function normalize(text) {
    return text.toLowerCase().replaceAll("’", "'").replace(/[^\p{L}\p{N}']/gu, " ").trim().replace(/\s+/g, " ");
  }

  function renderDictation(lesson) {
    const [label, field] = inputAndLabel("Câu anh nghe được", "dictation");
    const feedback = element("p");
    feedback.setAttribute("aria-live", "polite");
    const model = modelDisclosure("Xem câu mẫu nếu cần", lesson.dictation, "en");
    const check = button("Kiểm tra", () => {
      const typed = normalize(field.value);
      if (!typed) {
        feedback.textContent = "Anh gõ câu nghe được rồi kiểm tra nhé.";
      } else if (typed === normalize(lesson.dictation)) {
        feedback.textContent = "Đúng rồi. Anh thử nghe lại và nói theo câu mẫu.";
        model.open = true;
      } else {
        feedback.textContent = "Câu này chưa khớp. Anh có thể nghe lại hoặc mở câu mẫu để so sánh.";
      }
    });
    content.append(element("p", "Nghe câu mẫu rồi thử chép lại bằng tiếng Anh."),
      button("Nghe câu", () => speak(lesson.dictation, 0.78), "primary"), label, field, check, feedback, model);
  }

  function renderOutput(lesson) {
    const [label, field] = inputAndLabel("Câu tiếng Anh của anh (không bắt buộc)", "output");
    content.append(element("p", lesson.prompt), element("p", "Nói thành tiếng trước, rồi thử viết lại. Anh có thể tự đối chiếu với câu mẫu."),
      label, field, modelDisclosure("Xem một câu trả lời mẫu", lesson.sample, "en"), button("Nghe câu trả lời mẫu", () => speak(lesson.sample)));
  }


  function examTimer(actions) {
    const box = element("div");
    box.className = "exam-timer course-actions";
    const time = element("span", "Chưa bấm giờ");
    time.setAttribute("role", "timer");
    function tick() {
      if (!draft.deadline) return;
      const remaining = Math.max(0, Math.ceil((draft.deadline - Date.now()) / 1000));
      const minutes = Math.floor(remaining / 60);
      const seconds = String(remaining % 60).padStart(2, "0");
      time.textContent = remaining ? "Còn " + minutes + ":" + seconds : "Hết giờ";
      if (!remaining) {
        status.textContent = "Hết giờ. Anh có thể xem lại phần đã làm.";
        clearInterval(clock);
      }
    }
    for (const [label, seconds] of actions) {
      box.append(button(label, () => {
        clearInterval(clock);
        status.textContent = "";
        draft.deadline = Date.now() + seconds * 1000;
        clock = setInterval(tick, 250);
        tick();
      }));
    }
    box.append(time);
    if (draft.deadline) {
      clock = setInterval(tick, 250);
      tick();
    }
    return box;
  }

  function normalizeExam(text) {
    return text.toLowerCase().trim().replace(/\s+/g, " ");
  }

  function renderQuiz(task) {
    content.append(element("p", task.instructions), examTimer([["Bắt đầu bấm giờ", task.seconds]]));
    if (task.passage) {
      const passage = element("p", task.passage, "en");
      passage.className = "exam-passage";
      content.append(passage);
    }
    if (task.audio) content.append(button("Nghe bài luyện", () => speak(task.audio, 0.95), "primary"));
    const fields = task.questions.map(([question], index) => {
      const label = element("label", (index + 1) + ". " + question, "en");
      const field = element(task.options ? "select" : "input", "", "en");
      if (task.options) {
        field.add(new Option("Chọn đáp án", ""));
        for (const value of task.options) field.add(new Option(value, value));
      } else {
        field.type = "text";
        field.maxLength = 80;
        field.autocomplete = "off";
      }
      field.id = "exam-answer-" + index;
      label.htmlFor = field.id;
      field.value = draft.answers[index] ?? "";
      field.addEventListener("input", () => { draft.answers[index] = field.value; });
      content.append(label, field);
      return field;
    });
    const result = element("div");
    result.className = "exam-result";
    result.setAttribute("aria-live", "polite");
    const submit = button("Chấm bài", () => {
      let score = 0;
      const feedback = task.questions.map(([question, answer, alternate, reason], index) => {
        const correct = [answer, ...alternate].some(value => normalizeExam(value) === normalizeExam(fields[index].value));
        if (correct) {
          score++;
          if (isDue(question)) markWord(question, true);
        } else {
          progress.review[question] = { level: -1, due: Date.now() };
        }
        return element("li", (correct ? "Đúng" : "Cần ôn") + " · " + answer + ". " + reason);
      });
      const list = element("ol");
      list.append(...feedback);
      result.replaceChildren(element("strong", score + " / " + fields.length + " câu đúng"), list);
      if (task.audio) result.append(modelDisclosure("Xem lời nghe", task.audio, "en"));
      updateSummary();
      persist();
    }, "primary");
    submit.classList.add("exam-grade");
    content.append(submit, result);
  }

  function renderWriting(task) {
    content.append(element("p", task.instructions, "en"));
    if (task.table) {
      const table = element("table");
      for (const [index, values] of task.table.entries()) {
        const row = element("tr");
        for (const value of values) row.append(element(index === 0 ? "th" : "td", value));
        table.append(row);
      }
      content.append(table);
    }
    content.append(examTimer([["Bắt đầu " + task.seconds / 60 + " phút", task.seconds]]));
    const [label, field] = inputAndLabel("Bài viết của anh", "output");
    field.rows = 8;
    const counter = element("p");
    function updateCount() {
      const count = field.value.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
      counter.textContent = count + " từ · Yêu cầu tối thiểu " + task.minimum + " từ";
    }
    field.addEventListener("input", updateCount);
    updateCount();
    content.append(label, field, counter, modelDisclosure("Xem gợi ý dàn bài", task.hint));
  }

  function renderSpeaking(task) {
    content.append(element("p", "Trả lời thành tiếng. Bấm giờ riêng cho phần chuẩn bị và phần nói của Part 2."));
    const prompts = element("ol");
    for (const prompt of task.questions) prompts.append(element("li", prompt, "en"));
    content.append(prompts, examTimer([["Chuẩn bị · 1 phút", 60], ["Nói · 2 phút", 120]]),
      modelDisclosure("Xem gợi ý trả lời", task.hint));
  }

  function renderExam(task) {
    if (task.kind === "quiz") renderQuiz(task);
    else if (task.kind === "writing") renderWriting(task);
    else renderSpeaking(task);
  }

  function renderExamReflection(task) {
    const tips = {
      quiz: ["Đối chiếu câu sai với chứng cứ hoặc lời nghe.", "Ghi lại bẫy khiến anh nhầm: giới hạn từ, chi tiết bị đính chính hoặc thông tin không có trong bài.",
        "Các câu làm sai sẽ xuất hiện trong mục ôn thẻ."],
      writing: ["Anh đã trả lời đủ mọi phần của đề và đạt số từ tối thiểu chưa?",
        "Kiểm tra đoạn văn và từ nối, từ vựng, phạm vi cấu trúc và lỗi ngữ pháp.",
        "Quay lại bài viết để sửa một đoạn. App đếm từ và hỗ trợ tự đối chiếu, còn chấm band cần đánh giá theo tiêu chí IELTS."],
      speaking: ["Tự nghe lại nếu anh đã dùng công cụ ghi âm của mình. Chú ý độ trôi chảy và mạch lạc.",
        "Kiểm tra từ vựng, phạm vi ngữ pháp và phát âm. Nói lại một lần, ưu tiên một điểm cần cải thiện.",
        "App cung cấp câu hỏi và đồng hồ luyện tập. Anh tự đánh giá câu trả lời theo tiêu chí IELTS."]
    };
    content.append(element("p", "Dành một lượt để tự kiểm trước khi hoàn thành."));
    const list = element("ul");
    for (const tip of tips[task.kind]) list.append(element("li", tip));
    content.append(list);
  }

  function renderStep(focus = false) {
    stopAudio();
    clearInterval(clock);
    status.textContent = "";
    content.replaceChildren();
    const lesson = lessons[lessonId];
    const title = el("lesson-title");
    title.textContent = reviewMode ? (reviewMode === "due" ? "Ôn thẻ đến hạn" : "Ôn chặng này") : lesson.title;
    const labels = lesson.task ? ["Làm quen dạng bài", "Gợi nhớ từ và kỹ thuật", "Thực hành IELTS", "Tự kiểm và rút kinh nghiệm"] : stepNames;
    el("course-step").textContent = reviewMode ? (reviewMode === "due" ? "Ôn cách quãng" : "Gợi nhớ theo chặng") : (step + 1) + " / 4 · " + labels[step];
    const bar = el("course-progress");
    bar.hidden = reviewMode;
    bar.value = Math.min(step + 1, 4);
    back.hidden = reviewMode || step === 0 || step === 4;
    next.hidden = false;
    next.disabled = false;
    next.textContent = step === 3 ? "Hoàn thành bài" : step === 4 ? "Mở bài tiếp theo" : "Tiếp theo";

    if (reviewMode) renderRecall(round.words, true);
    else if (step === 0 && lesson.task) content.append(element("p", lesson.context));
    else if (step === 0) renderInput(lesson);
    else if (step === 1) renderRecall(lesson.words, false);
    else if (step === 2 && lesson.task) renderExam(lesson.task);
    else if (step === 2) renderDictation(lesson);
    else if (step === 3 && lesson.task) renderExamReflection(lesson.task);
    else if (step === 3) renderOutput(lesson);
    else {
      el("course-step").textContent = "Hoàn thành";
      content.append(element("p", "Anh đã hoàn thành bài “" + lesson.title + "”. Từ đã luyện sẽ có lịch ôn riêng."));
      const activePath = roadmap.stages.flatMap(stage => idsForStage(stage.id));
      if (activePath.every(id => progress.completed.includes(id))) {
        next.hidden = true;
        content.append(element("p", "Anh đã học hết các bài trong lộ trình đã chọn. Anh có thể luyện lại hoặc ôn thẻ đến hạn."));
      }
    }
    if (focus) {
      title.tabIndex = -1;
      title.focus();
    }
  }

  function startReview(words, mode) {
    if (!words.length) return;
    beforeReview ??= { round, step };
    round = { words, position: 0 };
    reviewMode = mode;
    renderLessons();
    renderStep(true);
  }

  const stagePicker = el("course-stage");
  for (const stage of roadmap.stages) stagePicker.add(new Option(stage.label, stage.id));
  stagePicker.addEventListener("change", () => openStage(stagePicker.value));
  el("ielts-track").addEventListener("change", event => {
    examTrack = event.target.value;
    progress.track = examTrack;
    openStage("ielts");
    persist();
  });

  const review = button("Chưa có thẻ đến hạn", () => startReview(dueWords(), "due"));
  review.id = "review-due";
  const stageReview = button("Ôn chặng này", () => {
    const cards = idsForStage(stageId).flatMap(index => {
      const lesson = lessons[index];
      const mistakes = (lesson.task?.kind === "quiz" ? lesson.task.questions : [])
        .filter(([question]) => Object.hasOwn(progress.review, question))
        .map(([question]) => [question, allWords.get(question)]);
      return [...lesson.words, ...mistakes];
    });
    startReview([...new Map(cards)], "stage");
  });
  stageReview.id = "review-stage";
  el("course-review-actions").append(review, stageReview);

  next.addEventListener("click", () => {
    if (reviewMode) {
      ({ round, step } = beforeReview);
      beforeReview = undefined;
      reviewMode = "";
      renderLessons();
      renderStep(true);
      return;
    }
    if (step === 4) {
      openLesson(nextLesson(), true);
      return;
    }
    if (step === 3 && !progress.completed.includes(lessonId)) {
      progress.completed.push(lessonId);
      step++;
      renderLessons();
      renderStep(true);
      persist();
      return;
    }
    step++;
    renderStep(true);
  });
  back.addEventListener("click", () => {
    if (step > 0 && step < 4 && !reviewMode) {
      step--;
      renderStep(true);
    }
  });

  for (const name of ["course", "translate", "learn"]) {
    el("nav-" + name).addEventListener("click", () => {
      stopAudio();
      for (const panel of ["course", "translate", "learn"]) {
        const active = panel === name;
        el(panel + "-view").hidden = !active;
        el("nav-" + panel).setAttribute("aria-pressed", String(active));
      }
      if (name === "course") updateSummary();
      else el(name === "translate" ? "input" : "dictionary-word").focus();
    });
  }

  renderLessons();
  renderStep();
})();
