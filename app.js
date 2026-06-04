const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyyLqQqsrUvwb2rvvQqF0tglnIeBdCn5vA55x8BTpVa2iYpJys2wHEomw101KJ70c3ftg/exec";

document.addEventListener("DOMContentLoaded", () => {
  const cover = document.getElementById("cover");
  const invitation = document.getElementById("invitation");
  const openButton = document.getElementById("openInvite");

  if (openButton && cover && invitation) {
    openButton.addEventListener("click", () => {
      cover.style.transition = "opacity .7s ease, transform .7s ease";
      cover.style.opacity = "0";
      cover.style.transform = "scale(1.03)";

      setTimeout(() => {
        cover.style.display = "none";
        invitation.classList.remove("hidden");
        document.body.classList.remove("no-scroll");
        window.scrollTo(0, 0);
      }, 700);
    });
  }

  const targetDate = new Date("2026-06-28T16:00:00-06:00").getTime();

  function updateCountdown() {
    const diff = targetDate - Date.now();

    const countdown = document.getElementById("countdown");
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (!countdown || !days || !hours || !minutes || !seconds) return;

    if (diff <= 0) {
      countdown.innerHTML = "<div>¡Hoy celebramos a Julieta! 💕</div>";
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const confirmarBtn = document.getElementById("confirmarBtn");
  const noAsistoBtn = document.getElementById("noAsistoBtn");

  if (confirmarBtn) {
    confirmarBtn.addEventListener("click", () => enviarRespuesta("Asiste"));
  }

  if (noAsistoBtn) {
    noAsistoBtn.addEventListener("click", () => enviarRespuesta("No asiste"));
  }
});

async function enviarRespuesta(estado) {
  const asistente = document.getElementById("asistente");
  const personas = document.getElementById("personas");
  const msg = document.getElementById("formMessage");
  const form = document.getElementById("rsvpForm");

  if (!asistente || !personas || !msg || !form) return;

  const nombre = asistente.value.trim();

  if (!nombre) {
    msg.textContent = "Por favor escribe tu nombre 💕";
    return;
  }

  const data = {
    asistente: nombre,
    personas: estado === "Asiste" ? personas.value : "0",
    estado: estado,
    evento: "Baby Shower de Julieta",
    fechaRegistro: new Date().toLocaleString("es-MX")
  };

  msg.textContent = "Enviando respuesta...";

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data)
    });

    msg.textContent =
      estado === "Asiste"
        ? "¡Gracias! Tu asistencia fue registrada 💖"
        : "Gracias por avisarnos 💕";

    form.reset();
  } catch (error) {
    console.error(error);
    msg.textContent = "No se pudo enviar. Intenta nuevamente.";
  }
}
