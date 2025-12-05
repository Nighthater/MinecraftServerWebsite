/* ========= UTILITY FUNCTIONS ========= */

function safeId(str) {
  return String(str).replace(/\W+/g, "_");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showCopyToast() {
  let toast = document.querySelector(".copy-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "copy-toast";
    toast.textContent = "Copied!";
    document.body.appendChild(toast);
  }
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

function createElement(tag, className, innerHTML = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}