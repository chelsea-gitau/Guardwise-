/**
 * Animated counter and scroll-reveal functionality.
 */
function animateCounter(el) {
  if (!el || !el.dataset.count) return;
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target) || target <= 0) return;

  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = target / 80;
  const timer = setInterval(function () {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
  return timer;
}

function checkReveals() {
  var revealEls = document.querySelectorAll(
    '.reveal-left, .reveal-right, .reveal-up, .service-card, .testimonial-card, [data-count]'
  );
  revealEls.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80 && !el.classList.contains('active')) {
      el.classList.add('active');
      if (el.dataset.count) animateCounter(el);
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { animateCounter, checkReveals };
}
