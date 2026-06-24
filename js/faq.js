/**
 * FAQ accordion toggle functionality.
 */
function toggleFaq(btn) {
  if (!btn) return;
  const answer = btn.nextElementSibling;
  const arrow = btn.querySelector('.faq-arrow');
  if (!answer || !arrow) return;

  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

  // Close all
  document.querySelectorAll('.faq-a').forEach(function (a) {
    a.style.maxHeight = '0px';
  });
  document.querySelectorAll('.faq-arrow').forEach(function (a) {
    a.textContent = '+';
    a.style.transform = 'rotate(0deg)';
  });

  // Open this one if it was closed
  if (!isOpen) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    arrow.textContent = '\u00d7';
    arrow.style.transform = 'rotate(0deg)';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { toggleFaq };
}
