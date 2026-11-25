(() => {
  const starter = [
    ["improve", "cải thiện", "I want to improve my English."],
    ["practice", "luyện tập", "I practice speaking English every day."],
    ["understand", "hiểu", "I understand the question now."],
    ["remember", "nhớ", "Can you remember her name?"],
    ["explain", "giải thích", "Could you explain this word?"],
    ["learn", "học", "I'm learning a new language."],
    ["mistake", "lỗi, sai sót", "Everyone makes mistakes."],
    ["meaning", "nghĩa, ý nghĩa", "What is the meaning of this word?"],
    ["usually", "thường, thường xuyên", "I usually walk to work."],
    ["enough", "đủ", "Do we have enough time?"],
    ["almost", "gần như, suýt", "The lesson is almost finished."],
    ["instead", "thay vào đó", "Let's take the bus instead."],
    ["together", "cùng nhau", "We can study together."],
    ["decide", "quyết định", "We need to decide today."],
    ["choose", "chọn", "You can choose any seat."],
    ["borrow", "mượn", "Can I borrow your pen?"],
    ["return", "trả lại, quay lại", "Please return the book tomorrow."],
    ["available", "có sẵn, rảnh", "Is this seat available?"],
    ["appointment", "cuộc hẹn", "I have an appointment at ten."],
    ["schedule", "lịch trình", "Check your schedule for tomorrow."],
    ["receipt", "biên lai", "Would you like a receipt?"],
    ["change", "thay đổi; tiền thối", "Here is your change."],
    ["nearby", "gần đây, ở gần", "Is there a pharmacy nearby?"],
    ["direction", "hướng, phương hướng", "Which direction should we go?"],
    ["comfortable", "thoải mái", "These shoes are very comfortable."],
    ["careful", "cẩn thận", "Be careful when you cross the street."],
    ["useful", "hữu ích", "This app is useful for learning new words."],
    ["confident", "tự tin", "I feel more confident when I practice."],
    ["friendly", "thân thiện", "Our new neighbors are friendly."],
    ["introduce", "giới thiệu", "Let me introduce myself."]
  ].map(([word, vietnamese, example]) => ({ word, vietnamese, example, definitions: [] }));

  const el = id => document.getElementById(id);
  const storageKey = "thong-ngu-vocabulary-v1";
  const dictionaryWord = el("dictionary-word");
  const dictionaryResult = el("dictionary-result");
  const meaningButton = el("translate-meaning");
  const saveButton = el("save-word");
  const studyCard = el("study-card");
  const studyStatus = el("study-status");
  const studyAnswer = el("study-answer");
  let savedWords = [];
  let entry;
  let lookup;
  let meaningRequest;
  let player;
  let queue = [];
  let deckSize = 0;

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    if (Array.isArray(stored)) {
      savedWords = stored.filter(item => typeof item?.word === "string" && Array.isArray(item.definitions));
    }
  } catch {
    // Keep the dictionary usable if browser storage is blocked or corrupted.
  }

  function report(text = "", error = false) {
    const status = el("dictionary-status");
    status.textContent = text;
    status.classList.toggle("error", error);
  }

  function replaceSaved(next) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      report("Không thể lưu thay đổi trên thiết bị này.", true);
      return false;
    }
    savedWords = next;
    renderSaved();
    return true;
  }

  function renderEntry(next) {
    entry = next;
    dictionaryResult.hidden = !entry;
    if (!entry) return;
    el("entry-word").textContent = entry.word;
    el("entry-ipa").textContent = entry.ipa ?? "";
    el("entry-vietnamese").textContent = entry.vietnamese ?? "";
    el("entry-example").textContent = entry.example ?? "";
    const definitions = entry.definitions.map(({ type, text }) => {
      const li = document.createElement("li");
      const label = document.createElement("strong");
      label.textContent = type ? type + " — " : "";
      li.append(label, text);
      return li;
    });
    el("entry-definitions").replaceChildren(...definitions);
    meaningButton.hidden = !!entry.vietnamese || !entry.definitions.length;
    meaningButton.disabled = !!meaningRequest;
    saveButton.disabled = savedWords.some(item => item.word === entry.word && item.vietnamese === entry.vietnamese);
    saveButton.textContent = saveButton.disabled ? "Đã lưu" : "Lưu từ";
  }

  function renderSaved() {
    el("saved-empty").hidden = savedWords.length > 0;
    const items = savedWords.map(item => {
      const li = document.createElement("li");
      const word = document.createElement("button");
      word.type = "button";
      word.textContent = item.word;
      word.lang = "en";
      word.addEventListener("click", () => {
        dictionaryWord.value = item.word;
        el("dictionary-form").requestSubmit();
        dictionaryWord.focus();
      });
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Bỏ lưu";
      remove.className = "saved-remove";
      remove.setAttribute("aria-label", "Bỏ lưu " + item.word);
      remove.addEventListener("click", () => {
        if (replaceSaved(savedWords.filter(saved => saved.word !== item.word))) {
          renderEntry(entry);
          report("Đã bỏ lưu " + item.word + ".");
          dictionaryWord.focus();
        }
      });
      const detail = document.createElement("span");
      detail.textContent = item.vietnamese || item.definitions[0]?.text || "";
      if (!item.vietnamese) detail.lang = "en";
      li.append(word, detail, remove);
      return li;
    });
    el("saved-words").replaceChildren(...items);
  }

  function readDictionaryResponse(word, response) {
    const definitions = [];
    const seen = new Set();
    let ipa;
    let audio;
    let example;
    for (const item of response) {
      ipa ||= item.phonetic;
      for (const phonetic of item.phonetics ?? []) {
        ipa ||= phonetic.text;
        const recording = phonetic.audio;
        if (typeof recording === "string" && /^https:\/\/[^ ]+$/i.test(recording)) audio ||= recording;
      }
      for (const meaning of item.meanings ?? []) {
        for (const definition of meaning.definitions ?? []) {
          if (typeof definition.definition !== "string" || seen.has(definition.definition)) continue;
          seen.add(definition.definition);
          example ||= definition.example;
          definitions.push({ type: meaning.partOfSpeech, text: definition.definition });
          if (definitions.length === 4) return { word, ipa, audio, example, definitions };
        }
      }
    }
    return { word, ipa, audio, example, definitions };
  }

  el("dictionary-form").addEventListener("submit", async event => {
    event.preventDefault();
    lookup?.abort();
    meaningRequest?.abort();
    lookup = undefined;
    meaningRequest = undefined;
    report();
    renderEntry();
    const word = dictionaryWord.value.trim().toLowerCase().replaceAll("’", "'").replace(/\s+/g, " ");
    if (!/^[a-z]+(?:[' -][a-z]+)*$/.test(word)) {
      report("Anh nhập một từ hoặc cụm từ tiếng Anh nhé.", true);
      return;
    }
    const known = savedWords.find(item => item.word === word) ?? starter.find(item => item.word === word);
    if (known) {
      renderEntry(known);
      return;
    }
    const request = new AbortController();
    lookup = request;
    report("Đang tra từ…");
    try {
      const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(word);
      const response = await fetch(url, {
        signal: AbortSignal.any([request.signal, AbortSignal.timeout(10000)])
      });
      if (lookup !== request) return;
      if (response.status === 404) {
        report("Chưa tìm thấy từ này. Anh thử kiểm tra chính tả hoặc nhập dạng gốc.", true);
        return;
      }
      if (!response.ok) throw new Error();
      const result = readDictionaryResponse(word, await response.json());
      if (lookup !== request) return;
      if (!result.definitions.length) throw new Error();
      renderEntry(result);
      report("Đã tìm thấy nghĩa.");
    } catch {
      if (lookup === request) report("Chưa thể tra từ trực tuyến. Anh thử lại sau nhé.", true);
    } finally {
      if (lookup === request) lookup = undefined;
    }
  });

  meaningButton.addEventListener("click", async () => {
    if (!entry || meaningRequest || !entry.definitions.length) return;
    const selected = entry;
    const request = new AbortController();
    meaningRequest = request;
    meaningButton.disabled = true;
    report("Đang dịch nghĩa đầu tiên…");
    try {
      const translated = [];
      for (const piece of splitText(selected.definitions[0].text)) {
        translated.push(await translatePiece(piece, "en", "vi", request.signal));
      }
      const vietnamese = translated.join("");
      if (meaningRequest !== request) return;
      meaningRequest = undefined;
      if (vietnamese.trim() === selected.definitions[0].text.trim()) {
        report("Chưa có bản dịch tiếng Việt cho nghĩa này.", true);
        return;
      }
      renderEntry({ ...selected, vietnamese });
      report("Đã dịch nghĩa đầu tiên sang tiếng Việt.");
    } catch {
      if (meaningRequest === request) report("Chưa dịch được nghĩa tiếng Việt. Anh thử lại sau nhé.", true);
    } finally {
      if (meaningRequest === request) meaningRequest = undefined;
      meaningButton.disabled = !!meaningRequest;
    }
  });

  saveButton.addEventListener("click", () => {
    if (!entry) return;
    const next = savedWords.filter(item => item.word !== entry.word);
    if (replaceSaved([entry, ...next])) {
      renderEntry(entry);
      report("Đã lưu " + entry.word + " để ôn.");
    }
  });

  async function pronounce(item, onError) {
    if (!item) return;
    player?.pause();
    window.speechSynthesis?.cancel();
    if (item.audio) {
      try {
        player = new Audio(item.audio);
        await player.play();
        return;
      } catch {
        // Use the system voice when the dictionary recording is unavailable.
      }
    }
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      onError();
      return;
    }
    const speech = new SpeechSynthesisUtterance(item.word);
    speech.lang = "en-US";
    speech.onerror = event => {
      if (event.error !== "interrupted" && event.error !== "canceled") onError();
    };
    window.speechSynthesis.speak(speech);
  }

  el("hear-word").addEventListener("click", () => {
    pronounce(entry, () => report("Máy chưa phát được âm thanh cho từ này.", true));
  });
  el("study-hear").addEventListener("click", () => {
    pronounce(queue[0], () => { studyStatus.textContent = "Máy chưa phát được âm thanh cho từ này."; });
  });

  function toggleAnswer(reveal) {
    studyAnswer.hidden = !reveal;
    el("reveal-study").hidden = reveal;
    el("repeat-study").hidden = !reveal;
    el("remember-study").hidden = !reveal;
  }

  function renderCard(focus = false) {
    const current = queue[0];
    studyCard.hidden = !current;
    if (!current) {
      studyStatus.textContent = "Đã ôn xong " + deckSize + " từ.";
      if (focus) el("start-study").focus();
      return;
    }
    studyStatus.textContent = "Còn " + queue.length + " / " + deckSize + " từ.";
    el("study-word").textContent = current.word;
    const meaning = document.createElement("p");
    meaning.textContent = current.vietnamese || current.definitions[0]?.text || "";
    if (!current.vietnamese) meaning.lang = "en";
    const example = document.createElement("em");
    example.lang = "en";
    example.textContent = current.example ?? "";
    studyAnswer.replaceChildren(meaning, example);
    toggleAnswer(false);
    if (focus) el("reveal-study").focus();
  }

  el("study-deck").addEventListener("change", () => {
    queue = [];
    studyCard.hidden = true;
    studyStatus.textContent = "";
  });
  el("start-study").addEventListener("click", () => {
    queue = [...(el("study-deck").value === "saved" ? savedWords : starter)];
    deckSize = queue.length;
    if (!deckSize) {
      studyCard.hidden = true;
      studyStatus.textContent = "Anh tra và lưu một từ để bắt đầu ôn.";
      return;
    }
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    renderCard(true);
  });
  el("reveal-study").addEventListener("click", () => {
    toggleAnswer(true);
    el("remember-study").focus();
  });
  el("repeat-study").addEventListener("click", () => {
    if (queue.length) queue.push(queue.shift());
    renderCard(true);
  });
  el("remember-study").addEventListener("click", () => {
    queue.shift();
    renderCard(true);
  });
  renderSaved();
})();
