const languages = {
  vi: "Tiếng Việt", en: "Tiếng Anh", "zh-CN": "Tiếng Trung (giản thể)",
  "zh-TW": "Tiếng Trung (phồn thể)", ja: "Tiếng Nhật", ko: "Tiếng Hàn",
  fr: "Tiếng Pháp", es: "Tiếng Tây Ban Nha", de: "Tiếng Đức",
  it: "Tiếng Ý", pt: "Tiếng Bồ Đào Nha", ru: "Tiếng Nga",
  th: "Tiếng Thái", id: "Tiếng Indonesia", ar: "Tiếng Ả Rập", hi: "Tiếng Hindi"
};

const byId = id => document.getElementById(id);
const source = byId("source");
const target = byId("target");
const input = byId("input");
const output = byId("output");
const translate = byId("translate");
const copy = byId("copy");
const status = byId("status");
let pending;

for (const [code, name] of Object.entries(languages)) {
  source.add(new Option(name, code));
  target.add(new Option(name, code));
}
source.value = "en";
target.value = "vi";

function showStatus(message = "", error = false) {
  status.textContent = message;
  status.classList.toggle("error", error);
}

function setOutput(text = "") {
  output.value = text;
  copy.disabled = !text;
}

function resetResult() {
  pending?.abort();
  pending = undefined;
  translate.disabled = false;
  byId("count").textContent = `${input.value.length} / ${input.maxLength}`;
  setOutput();
  showStatus();
}

function splitText(text) {
  const encoder = new TextEncoder();
  const pieces = [];
  let current = "";
  let size = 0;
  // Prefer word boundaries, but split exceptionally long words by Unicode code point.
  function append(part) {
    const bytes = encoder.encode(part).length;
    if (size + bytes > 500) {
      pieces.push(current);
      current = "";
      size = 0;
    }
    current += part;
    size += bytes;
  }
  for (const word of text.match(/\s+|\S+/gu) ?? []) {
    if (encoder.encode(word).length <= 500) {
      append(word);
    } else {
      for (const character of word) append(character);
    }
  }
  if (current) pieces.push(current);
  return pieces;
}

function decodeEntities(text) {
  // Escape markup before decoding character references in an inert template.
  const template = document.createElement("template");
  template.innerHTML = text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return template.content.textContent;
}

async function translatePiece(piece, from, to, signal) {
  const [, leading, body, trailing] = piece.match(/^(\s*)([\s\S]*?)(\s*)$/u);
  if (!body) return piece;
  const query = new URLSearchParams({ q: body, langpair: `${from}|${to}` });
  const response = await fetch(`https://api.mymemory.translated.net/get?${query}`, {
    signal: AbortSignal.any([signal, AbortSignal.timeout(12000)])
  });
  const data = await response.json();
  if (response.status === 429 || Number(data.responseStatus) === 429 || data.quotaFinished) {
    throw new Error("MyMemory đã đạt giới hạn dịch. Anh thử lại sau nhé.");
  }
  const translated = data.responseData?.translatedText;
  if (!response.ok || Number(data.responseStatus) !== 200 || !translated?.trim()) {
    throw new Error("Dịch vụ chưa trả về bản dịch cho đoạn này.");
  }
  return leading + decodeEntities(translated) + trailing;
}

byId("translator").addEventListener("submit", async event => {
  event.preventDefault();
  resetResult();
  const text = input.value;
  if (!text.trim()) {
    showStatus("Anh nhập nội dung cần dịch nhé.", true);
    return;
  }
  const from = source.value;
  const to = target.value;
  if (from === to) {
    setOutput(text);
    return;
  }
  const request = new AbortController();
  pending = request;
  translate.disabled = true;
  showStatus("Đang dịch…");
  try {
    const results = [];
    for (const piece of splitText(text)) {
      results.push(await translatePiece(piece, from, to, request.signal));
    }
    if (pending === request) {
      setOutput(results.join(""));
      showStatus("Đã dịch xong.");
    }
  } catch (error) {
    if (pending === request) {
      const message = error instanceof TypeError || error.name === "TimeoutError"
        ? "Không kết nối được với dịch vụ dịch. Anh thử lại nhé."
        : error instanceof SyntaxError ? "Dịch vụ trả về dữ liệu không hợp lệ." : error.message;
      showStatus(message, true);
    }
  } finally {
    if (pending === request) {
      pending = undefined;
      translate.disabled = false;
    }
  }
});

for (const select of [source, target]) select.addEventListener("change", resetResult);
input.addEventListener("input", resetResult);
byId("clear").addEventListener("click", () => {
  input.value = "";
  resetResult();
  input.focus();
});
byId("swap").addEventListener("click", () => {
  if (output.value.length > input.maxLength) {
    showStatus("Bản dịch dài hơn giới hạn ô nhập nên chưa thể đảo chiều.", true);
    return;
  }
  [source.value, target.value] = [target.value, source.value];
  if (output.value) input.value = output.value;
  resetResult();
});
byId("file").addEventListener("change", async event => {
  const picker = event.currentTarget;
  const file = picker.files[0];
  picker.value = "";
  if (!file) return;
  try {
    if (file.size > 12003) throw new Error("Tệp vượt giới hạn 3000 ký tự.");
    const text = await file.text();
    if (text.length > input.maxLength) throw new Error("Tệp vượt giới hạn 3000 ký tự.");
    input.value = text;
    resetResult();
  } catch (error) {
    showStatus(error.message || "Không đọc được tệp.", true);
  }
});
copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    showStatus("Đã sao chép bản dịch.");
  } catch {
    output.focus();
    output.select();
    showStatus("Anh nhấn Ctrl+C để sao chép phần đã chọn.");
  }
});
