const POST_SELECTOR = [
  '[data-testid="mainFeed"] [role="listitem"]',
  "div.feed-shared-update-v2",
  '[data-urn^="urn:li:activity"]',
  '[data-id^="urn:li:activity"]',
  '[data-view-name="feed-full-update"]',
  '[role="article"]',
].join(",");

// null when there are no keywords, so nothing is hidden.
let pattern = null;

function setKeywords(keywords) {
  const escaped = keywords
    .map((k) => k.trim())
    .filter(Boolean)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  pattern = escaped.length
    ? new RegExp(`\\b(${escaped.join("|")})\\b`, "i")
    : null;
}

function hideMatchingPosts() {
  if (!pattern) return;
  for (const post of document.querySelectorAll(POST_SELECTOR)) {
    if (post.dataset.hiddenByKeyword) continue;
    if (pattern.test(post.textContent)) {
      post.dataset.hiddenByKeyword = "1";
      post.style.display = "none";
    }
  }
}

function showAllPosts() {
  for (const post of document.querySelectorAll("[data-hidden-by-keyword]")) {
    delete post.dataset.hiddenByKeyword;
    post.style.display = "";
  }
}

chrome.storage.sync.get({ keywords: [] }, ({ keywords }) => {
  setKeywords(keywords);
  hideMatchingPosts();
});

// Apply popup edits right away, bringing back posts that no longer match.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "sync" || !changes.keywords) return;
  setKeywords(changes.keywords.newValue || []);
  showAllPosts();
  hideMatchingPosts();
});

// The feed loads posts as you scroll, so rescan whenever the page changes.
let scheduled = false;
new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;
  setTimeout(() => {
    scheduled = false;
    hideMatchingPosts();
  }, 300);
}).observe(document.body, { childList: true, subtree: true });
