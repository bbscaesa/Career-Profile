document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const toTop = document.getElementById("toTop");
  const links = document.getElementById("links");
  const menuBtn = document.getElementById("menuBtn");

  document.getElementById("year").textContent = new Date().getFullYear();

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    toTop.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  menuBtn.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // Count-up stats
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = +el.dataset.count;
    let n = 0;
    const step = () => {
      n++;
      el.textContent = n;
      if (n < target) setTimeout(step, 90);
    };
    setTimeout(step, 500);
  });

  // Certificate filters
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    document.querySelectorAll("#certs li").forEach(li => {
      li.classList.toggle("hide", f !== "all" && li.dataset.cat !== f);
    });
  }));
});
