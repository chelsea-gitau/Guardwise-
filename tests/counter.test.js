const { animateCounter, checkReveals } = require('../js/counter');

describe('animateCounter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('animates from 0 to target value', () => {
    document.body.innerHTML = '<span data-count="100"></span>';
    const el = document.querySelector('[data-count]');

    animateCounter(el);
    jest.advanceTimersByTime(16 * 80 + 100);
    expect(el.textContent).toBe('100');
  });

  test('appends suffix to the counter value', () => {
    document.body.innerHTML = '<span data-count="50" data-suffix="+"></span>';
    const el = document.querySelector('[data-count]');

    animateCounter(el);
    jest.advanceTimersByTime(16 * 80 + 100);
    expect(el.textContent).toBe('50+');
  });

  test('handles counter with % suffix', () => {
    document.body.innerHTML = '<span data-count="99" data-suffix="%"></span>';
    const el = document.querySelector('[data-count]');

    animateCounter(el);
    jest.advanceTimersByTime(16 * 80 + 100);
    expect(el.textContent).toBe('99%');
  });

  test('returns a timer id', () => {
    document.body.innerHTML = '<span data-count="10"></span>';
    const el = document.querySelector('[data-count]');
    const timerId = animateCounter(el);
    expect(timerId).toBeDefined();
    jest.advanceTimersByTime(16 * 80 + 100);
  });

  test('returns undefined for null element', () => {
    expect(animateCounter(null)).toBeUndefined();
  });

  test('returns undefined when element has no data-count', () => {
    document.body.innerHTML = '<span></span>';
    const el = document.querySelector('span');
    expect(animateCounter(el)).toBeUndefined();
  });

  test('intermediate values are less than target', () => {
    document.body.innerHTML = '<span data-count="200"></span>';
    const el = document.querySelector('[data-count]');

    animateCounter(el);
    jest.advanceTimersByTime(16 * 10);
    const intermediateValue = parseInt(el.textContent, 10);
    expect(intermediateValue).toBeGreaterThan(0);
    expect(intermediateValue).toBeLessThan(200);
  });
});

describe('checkReveals', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('adds "active" class to elements in viewport', () => {
    document.body.innerHTML = '<div class="reveal-up"></div>';
    const el = document.querySelector('.reveal-up');
    el.getBoundingClientRect = jest.fn(() => ({ top: 100, bottom: 200, left: 0, right: 100 }));

    checkReveals();
    expect(el.classList.contains('active')).toBe(true);
  });

  test('does not activate elements below viewport threshold', () => {
    document.body.innerHTML = '<div class="reveal-left"></div>';
    const el = document.querySelector('.reveal-left');
    el.getBoundingClientRect = jest.fn(() => ({ top: 800, bottom: 900, left: 0, right: 100 }));

    checkReveals();
    expect(el.classList.contains('active')).toBe(false);
  });

  test('does not re-activate already active elements', () => {
    document.body.innerHTML = '<div class="reveal-right active" data-count="50"></div>';
    const el = document.querySelector('.reveal-right');
    el.getBoundingClientRect = jest.fn(() => ({ top: 100, bottom: 200, left: 0, right: 100 }));

    checkReveals();
    // Should still have active, but no counter animation triggered
    expect(el.classList.contains('active')).toBe(true);
  });

  test('triggers animateCounter for data-count elements in viewport', () => {
    document.body.innerHTML = '<span class="service-card" data-count="75" data-suffix="+"></span>';
    const el = document.querySelector('[data-count]');
    el.getBoundingClientRect = jest.fn(() => ({ top: 100, bottom: 200, left: 0, right: 100 }));

    checkReveals();
    jest.advanceTimersByTime(16 * 80 + 100);
    expect(el.textContent).toBe('75+');
    expect(el.classList.contains('active')).toBe(true);
  });

  test('handles empty DOM gracefully', () => {
    document.body.innerHTML = '';
    expect(() => checkReveals()).not.toThrow();
  });

  test('activates service-card elements', () => {
    document.body.innerHTML = '<div class="service-card"></div>';
    const el = document.querySelector('.service-card');
    el.getBoundingClientRect = jest.fn(() => ({ top: 200, bottom: 300, left: 0, right: 100 }));

    checkReveals();
    expect(el.classList.contains('active')).toBe(true);
  });

  test('activates testimonial-card elements', () => {
    document.body.innerHTML = '<div class="testimonial-card"></div>';
    const el = document.querySelector('.testimonial-card');
    el.getBoundingClientRect = jest.fn(() => ({ top: 300, bottom: 400, left: 0, right: 100 }));

    checkReveals();
    expect(el.classList.contains('active')).toBe(true);
  });
});
