declare const emailjs: any;

function qs<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Missing element: ${selector}`);
  return el as T;
}

type TemplateParams = {
  name: string;
  email: string;
  message: string;
  time: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = qs<HTMLFormElement>("#contactForm");
  const btn = qs<HTMLButtonElement>("#sendBtn");

  // ✅ Mets TES vraies valeurs EmailJS ici
  const PUBLIC_KEY = "I2NurxGvdh9J0q-bF";
  const SERVICE_ID = "service_7r2pxfe";
  const TEMPLATE_ID = "template_6sb0sko";

  emailjs.init(PUBLIC_KEY);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const params: TemplateParams = {
      name: qs<HTMLInputElement>("#name").value.trim(),
      email: qs<HTMLInputElement>("#email").value.trim(),
      message: qs<HTMLTextAreaElement>("#message").value.trim(),
      time: new Date().toLocaleString(),
    };

    if (!params.name || !params.email || !params.message) {
      alert("Please fill in all fields before sending.");
      return;
    }
    if (!isValidEmail(params.email)) {
      alert("Please enter a valid email.");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Sending...";

    try {
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params);
      console.log("EmailJS success:", res);
      alert("Message sent ✅");
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Message not sent ❌. Check console (F12) for the exact error.");
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send`;
    }
  });
});
