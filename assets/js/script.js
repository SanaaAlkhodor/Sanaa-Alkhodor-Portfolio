// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.style.display = "block";
          status.style.color = "green";
          status.textContent = "✅ Thanks for reaching out! I’ll get back to you soon.";
          form.reset();
          setTimeout(() => {
            status.style.display = "none";
          }, 5000);
        } else {
          const errorData = await response.json();
          status.style.display = "block";
          status.style.color = "red";
          status.textContent = "❌ " + (errorData?.error || "Oops! Something went wrong. Please try again.");
        }
      } catch (err) {
        status.style.display = "block";
        status.style.color = "red";
        status.textContent = "❌ Network error. Please try again.";
      }
    });
  } else {
    console.error("Form with ID 'contact-form' not found");
  }
});

// Optional: highlight active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
