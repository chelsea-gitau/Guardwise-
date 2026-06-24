const { toggleFaq } = require('../js/faq');

describe('toggleFaq', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          Question 1
          <span class="faq-arrow">+</span>
        </button>
        <div class="faq-a" style="max-height:0px">Answer 1</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          Question 2
          <span class="faq-arrow">+</span>
        </button>
        <div class="faq-a" style="max-height:0px">Answer 2</div>
      </div>
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">
          Question 3
          <span class="faq-arrow">+</span>
        </button>
        <div class="faq-a" style="max-height:0px">Answer 3</div>
      </div>
    `;
    // jsdom doesn't compute scrollHeight, so mock it on all .faq-a elements
    document.querySelectorAll('.faq-a').forEach(el => {
      Object.defineProperty(el, 'scrollHeight', { value: 120, configurable: true });
    });
  });

  test('opens a closed FAQ item', () => {
    const btn = document.querySelectorAll('.faq-q')[0];
    toggleFaq(btn);
    const answer = btn.nextElementSibling;
    const arrow = btn.querySelector('.faq-arrow');
    expect(answer.style.maxHeight).not.toBe('0px');
    expect(arrow.textContent).toBe('\u00d7');
  });

  test('closes an open FAQ item when clicked again', () => {
    const btn = document.querySelectorAll('.faq-q')[0];
    toggleFaq(btn);
    toggleFaq(btn);
    const answer = btn.nextElementSibling;
    const arrow = btn.querySelector('.faq-arrow');
    expect(answer.style.maxHeight).toBe('0px');
    expect(arrow.textContent).toBe('+');
  });

  test('closes other open FAQ items when opening a new one', () => {
    const btn1 = document.querySelectorAll('.faq-q')[0];
    const btn2 = document.querySelectorAll('.faq-q')[1];

    toggleFaq(btn1);
    expect(btn1.nextElementSibling.style.maxHeight).not.toBe('0px');

    toggleFaq(btn2);
    expect(btn1.nextElementSibling.style.maxHeight).toBe('0px');
    expect(btn1.querySelector('.faq-arrow').textContent).toBe('+');
    expect(btn2.nextElementSibling.style.maxHeight).not.toBe('0px');
    expect(btn2.querySelector('.faq-arrow').textContent).toBe('\u00d7');
  });

  test('resets all arrows when toggling', () => {
    const btns = document.querySelectorAll('.faq-q');
    toggleFaq(btns[0]);
    toggleFaq(btns[1]);
    const arrows = document.querySelectorAll('.faq-arrow');
    expect(arrows[0].textContent).toBe('+');
    expect(arrows[1].textContent).toBe('\u00d7');
    expect(arrows[2].textContent).toBe('+');
  });

  test('does not throw when called with null', () => {
    expect(() => toggleFaq(null)).not.toThrow();
  });

  test('does not throw when button has no sibling', () => {
    document.body.innerHTML = '<button class="faq-q"></button>';
    const btn = document.querySelector('.faq-q');
    expect(() => toggleFaq(btn)).not.toThrow();
  });

  test('does not throw when button has no arrow element', () => {
    document.body.innerHTML = `
      <button class="faq-q">Question</button>
      <div class="faq-a" style="max-height:0px">Answer</div>
    `;
    const btn = document.querySelector('.faq-q');
    expect(() => toggleFaq(btn)).not.toThrow();
  });
});
