var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function qs(selector) {
    const el = document.querySelector(selector);
    if (!el)
        throw new Error(`Missing element: ${selector}`);
    return el;
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
document.addEventListener("DOMContentLoaded", () => {
    const form = qs("#contactForm");
    const btn = qs("#sendBtn");
    // ✅ Mets TES vraies valeurs EmailJS ici
    const PUBLIC_KEY = "I2NurxGvdh9J0q-bF";
    const SERVICE_ID = "service_7r2pxfe";
    const TEMPLATE_ID = "template_6sb0sko";
    emailjs.init(PUBLIC_KEY);
    form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const params = {
            name: qs("#name").value.trim(),
            email: qs("#email").value.trim(),
            message: qs("#message").value.trim(),
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
            const res = yield emailjs.send(SERVICE_ID, TEMPLATE_ID, params);
            console.log("EmailJS success:", res);
            alert("Message sent ✅");
            form.reset();
        }
        catch (err) {
            console.error("EmailJS error:", err);
            alert("Message not sent ❌. Check console (F12) for the exact error.");
        }
        finally {
            btn.disabled = false;
            btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send`;
        }
    }));
});
