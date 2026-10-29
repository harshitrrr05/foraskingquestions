// EMAIL SETUP: create a form at https://formspree.io and replace the URL below.
// Example: const FORMSPREE_ENDPOINT = "https://formspree.io/f/abcdwxyz";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdeedbao";

const pages = {
  home: document.getElementById("page-home"),
  questions: document.getElementById("page-questions"),
  note: document.getElementById("page-note")
};
const form = document.getElementById("crush-form");
const submitButton = document.getElementById("submit-button");
const submitLabel = document.getElementById("submit-label");
const statusMessage = document.getElementById("form-status");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");
const progressNumber = document.getElementById("progress-number");
const deliveryNote = document.getElementById("delivery-note");

function showPage(name) {
  Object.entries(pages).forEach(([key, page]) => {
    page.classList.toggle("active", key === name);
    page.setAttribute("aria-hidden", key !== name ? "true" : "false");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.getElementById("start-button").addEventListener("click", () => showPage("questions"));
document.getElementById("back-home").addEventListener("click", () => showPage("home"));
document.getElementById("home-link").addEventListener("click", (event) => {
  event.preventDefault();
  showPage("home");
});
document.getElementById("restart-button").addEventListener("click", () => {
  form.reset();
  updateProgress();
  statusMessage.textContent = "";
  showPage("home");
});

function answeredCount() {
  const checks = [
    document.getElementById("name").value.trim().length > 0,
    Boolean(form.querySelector('input[name="Relationship status"]:checked')),
    Boolean(form.querySelector('input[name="Perfect hangout"]:checked')),
    document.getElementById("first-impression").value.trim().length > 0,
    Boolean(form.querySelector('input[name="Believe in slow feelings"]:checked')),
    document.getElementById("message").value.trim().length > 0
  ];
  return checks.filter(Boolean).length;
}
function updateProgress() {
  const count = answeredCount();
  const percent = Math.round(count / 6 * 100);
  progressFill.style.width = percent + "%";
  progressNumber.textContent = percent + "% answered";
  progressLabel.textContent = count === 0 ? "A fresh start" : count < 3 ? "You're warming up 💗" : count < 6 ? "Almost there ✨" : "All filled in 💌";
}
form.addEventListener("input", updateProgress);
form.addEventListener("change", updateProgress);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusMessage.textContent = "";

  // Show the note after attempting delivery. If no endpoint is configured, clearly say so.
  if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
    deliveryNote.textContent = "Surprise unlocked 💌 (The site owner still needs to connect email delivery.)";
    showPage("note");
    return;
  }

  submitButton.disabled = true;
  submitLabel.textContent = "Sending your answers…";
  let sent = false;

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });
    if (response.ok) {
      sent = true;
      deliveryNote.textContent = "Your answers were sent successfully. Thank you for being here. 💌";
    } else {
      const result = await response.json().catch(() => ({}));
      statusMessage.textContent = result.errors?.map(error => error.message).join(" ") ||
        "Email delivery didn't work this time. You can still open the surprise below.";
      deliveryNote.textContent = "Your surprise is here 💗 (The answers could not be emailed, so the site owner should check the form setup.)";
    }
  } catch {
    statusMessage.textContent = "Connection issue. Your surprise will still open; email delivery may need another try.";
    deliveryNote.textContent = "Your surprise is here 💗 (Email delivery could not be confirmed.)";
  } finally {
    submitButton.disabled = false;
    submitLabel.textContent = "Send my answers & see surprise";
    showPage("note");
  }
});
updateProgress();
Object.values(pages).forEach((page) => page.setAttribute("aria-hidden", page.classList.contains("active") ? "false" : "true"));
