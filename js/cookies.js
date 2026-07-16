/**
 * Cookie consent banner functionality.
 */
function acceptCookies() {
  localStorage.setItem('gw_cookies', 'accepted');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

function declineCookies() {
  localStorage.setItem('gw_cookies', 'declined');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

function initCookieBanner() {
  if (!localStorage.getItem('gw_cookies')) {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      setTimeout(function () {
        banner.style.display = 'block';
      }, 1500);
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { acceptCookies, declineCookies, initCookieBanner };
}
