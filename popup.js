const list = document.getElementById("keywords");
const empty = document.getElementById("empty");
const form = document.getElementById("add-form");
const input = document.getElementById("new-keyword");

let keywords = [];

function render() {
  list.textContent = "";
  for (const keyword of keywords) {
    const item = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = keyword;
    const remove = document.createElement("button");
    remove.textContent = "×";
    remove.title = `Remove "${keyword}"`;
    remove.addEventListener("click", () => {
      keywords = keywords.filter((k) => k !== keyword);
      save();
    });
    item.append(label, remove);
    list.append(item);
  }
  empty.hidden = keywords.length > 0;
}

function save() {
  chrome.storage.sync.set({ keywords });
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = input.value.trim().toLowerCase();
  input.value = "";
  if (!keyword || keywords.includes(keyword)) return;
  keywords.push(keyword);
  save();
});

chrome.storage.sync.get({ keywords: [] }, (stored) => {
  keywords = stored.keywords;
  render();
});
