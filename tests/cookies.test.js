const { acceptCookies, declineCookies, initCookieBanner } = require('../js/cookies');

describe('cookies module', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<div id="cookie-banner" style="display:none"></div>';
  });

  describe('acceptCookies', () => {
    test('sets gw_cookies to "accepted" in localStorage', () => {
      acceptCookies();
      expect(localStorage.getItem('gw_cookies')).toBe('accepted');
    });

    test('hides the cookie banner', () => {
      document.getElementById('cookie-banner').style.display = 'block';
      acceptCookies();
      expect(document.getElementById('cookie-banner').style.display).toBe('none');
    });

    test('does not throw when banner element is missing', () => {
      document.body.innerHTML = '';
      expect(() => acceptCookies()).not.toThrow();
      expect(localStorage.getItem('gw_cookies')).toBe('accepted');
    });
  });

  describe('declineCookies', () => {
    test('sets gw_cookies to "declined" in localStorage', () => {
      declineCookies();
      expect(localStorage.getItem('gw_cookies')).toBe('declined');
    });

    test('hides the cookie banner', () => {
      document.getElementById('cookie-banner').style.display = 'block';
      declineCookies();
      expect(document.getElementById('cookie-banner').style.display).toBe('none');
    });

    test('does not throw when banner element is missing', () => {
      document.body.innerHTML = '';
      expect(() => declineCookies()).not.toThrow();
      expect(localStorage.getItem('gw_cookies')).toBe('declined');
    });
  });

  describe('initCookieBanner', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('shows the banner after 1500ms if no cookie preference is stored', () => {
      initCookieBanner();
      expect(document.getElementById('cookie-banner').style.display).toBe('none');
      jest.advanceTimersByTime(1500);
      expect(document.getElementById('cookie-banner').style.display).toBe('block');
    });

    test('does not show banner if cookies were already accepted', () => {
      localStorage.setItem('gw_cookies', 'accepted');
      initCookieBanner();
      jest.advanceTimersByTime(2000);
      expect(document.getElementById('cookie-banner').style.display).toBe('none');
    });

    test('does not show banner if cookies were already declined', () => {
      localStorage.setItem('gw_cookies', 'declined');
      initCookieBanner();
      jest.advanceTimersByTime(2000);
      expect(document.getElementById('cookie-banner').style.display).toBe('none');
    });

    test('does not throw when banner element is missing and no preference stored', () => {
      document.body.innerHTML = '';
      expect(() => {
        initCookieBanner();
        jest.advanceTimersByTime(2000);
      }).not.toThrow();
    });
  });
});
