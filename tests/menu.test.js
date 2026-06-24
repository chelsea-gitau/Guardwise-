const { toggleMenu } = require('../js/menu');

describe('toggleMenu', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="hamburger"></div>
      <div id="mobileMenu"></div>
    `;
    document.body.style.overflow = '';
  });

  test('adds "open" class to hamburger and mobileMenu on first call', () => {
    toggleMenu();
    expect(document.getElementById('hamburger').classList.contains('open')).toBe(true);
    expect(document.getElementById('mobileMenu').classList.contains('open')).toBe(true);
  });

  test('sets body overflow to hidden when menu is opened', () => {
    toggleMenu();
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('removes "open" class on second call (toggle off)', () => {
    toggleMenu();
    toggleMenu();
    expect(document.getElementById('hamburger').classList.contains('open')).toBe(false);
    expect(document.getElementById('mobileMenu').classList.contains('open')).toBe(false);
  });

  test('restores body overflow when menu is closed', () => {
    toggleMenu();
    toggleMenu();
    expect(document.body.style.overflow).toBe('');
  });

  test('does nothing when hamburger element is missing', () => {
    document.body.innerHTML = '<div id="mobileMenu"></div>';
    expect(() => toggleMenu()).not.toThrow();
  });

  test('does nothing when mobileMenu element is missing', () => {
    document.body.innerHTML = '<div id="hamburger"></div>';
    expect(() => toggleMenu()).not.toThrow();
  });

  test('toggles correctly across multiple open/close cycles', () => {
    for (let i = 0; i < 3; i++) {
      toggleMenu();
      expect(document.getElementById('mobileMenu').classList.contains('open')).toBe(true);
      toggleMenu();
      expect(document.getElementById('mobileMenu').classList.contains('open')).toBe(false);
    }
  });
});
