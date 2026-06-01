// Backend API URL
const API_BASE = "https://future-fs-03-ms8t.onrender.com";

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar scroll effect
const nav = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

// Helper message function
function showMsg(el, text, success) {
  el.textContent = text;
  el.style.color = success ? "#7CFFB2" : "#ff8b8b";
}

// ======================
// Reservation Form
// ======================

const reserveForm = document.getElementById("reserveForm");
const reserveMsg = document.getElementById("reserveMsg");

if (reserveForm) {
  reserveForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(reserveForm));

    data.guests = Number(data.guests);

    showMsg(reserveMsg, "Sending...", true);

    try {
      const res = await fetch(`${API_BASE}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const text = await res.text();

      let json;

      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Server did not return valid JSON");
      }

      if (!res.ok) {
        throw new Error(json.message || "Reservation failed");
      }

      showMsg(
        reserveMsg,
        "✓ Table reserved successfully!",
        true
      );

      reserveForm.reset();

    } catch (err) {
      console.error(err);

      showMsg(
        reserveMsg,
        "✗ " + err.message,
        false
      );
    }
  });
}

// ======================
// Contact Form
// ======================

const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm));

    showMsg(contactMsg, "Sending...", true);

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const text = await res.text();

      let json;

      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Server did not return valid JSON");
      }

      if (!res.ok) {
        throw new Error(json.message || "Message failed");
      }

      showMsg(
        contactMsg,
        "✓ Message sent successfully!",
        true
      );

      contactForm.reset();

    } catch (err) {
      console.error(err);

      showMsg(
        contactMsg,
        "✗ " + err.message,
        false
      );
    }
  });
}