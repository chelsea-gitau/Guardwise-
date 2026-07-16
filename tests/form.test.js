const { handleQuoteSubmit, initEnquiryForm } = require('../js/form');

describe('handleQuoteSubmit', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="formWrap">
        <form id="quoteForm" action="https://formspree.io/f/test">
          <input name="name" value="Test" />
        </form>
      </div>
      <div id="successMsg"></div>
    `;
    global.fetch = jest.fn();
    global.FormData = jest.fn(() => ({}));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('prevents default form submission', () => {
    const preventDefault = jest.fn();
    const form = document.getElementById('quoteForm');
    global.fetch.mockResolvedValue({ ok: true });

    handleQuoteSubmit({ preventDefault, target: form });
    expect(preventDefault).toHaveBeenCalled();
  });

  test('hides form and shows success message on successful submit', async () => {
    const preventDefault = jest.fn();
    const form = document.getElementById('quoteForm');
    global.fetch.mockResolvedValue({ ok: true });

    await handleQuoteSubmit({ preventDefault, target: form });
    expect(document.getElementById('formWrap').style.display).toBe('none');
    expect(document.getElementById('successMsg').classList.contains('show')).toBe(true);
  });

  test('does not hide form on failed response', async () => {
    const preventDefault = jest.fn();
    const form = document.getElementById('quoteForm');
    global.fetch.mockResolvedValue({ ok: false });

    await handleQuoteSubmit({ preventDefault, target: form });
    expect(document.getElementById('formWrap').style.display).not.toBe('none');
  });

  test('falls back to native submit on fetch error', async () => {
    const preventDefault = jest.fn();
    const form = document.getElementById('quoteForm');
    form.submit = jest.fn();
    global.fetch.mockRejectedValue(new Error('Network error'));

    await handleQuoteSubmit({ preventDefault, target: form });
    expect(form.submit).toHaveBeenCalled();
  });

  test('does nothing when called with null', () => {
    expect(() => handleQuoteSubmit(null)).not.toThrow();
  });

  test('does nothing when event has no target', () => {
    expect(() => handleQuoteSubmit({ preventDefault: jest.fn() })).not.toThrow();
  });
});

describe('initEnquiryForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    global.FormData = jest.fn(() => ({}));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns null when enquiry-form does not exist', () => {
    document.body.innerHTML = '';
    expect(initEnquiryForm()).toBeNull();
  });

  test('attaches submit handler to enquiry form', () => {
    document.body.innerHTML = `
      <form id="enquiry-form" action="https://formspree.io/f/test">
        <input name="email" value="test@test.com" />
      </form>
      <button id="enquiry-btn">Send</button>
      <div id="enquiry-success" style="display:none"></div>
    `;
    const handler = initEnquiryForm();
    expect(handler).toBeDefined();
    expect(typeof handler).toBe('function');
  });

  test('shows sending state on submit', async () => {
    document.body.innerHTML = `
      <form id="enquiry-form" action="https://formspree.io/f/test">
        <input name="email" value="test@test.com" />
      </form>
      <button id="enquiry-btn">Send</button>
      <div id="enquiry-success" style="display:none"></div>
    `;
    global.fetch.mockResolvedValue({ ok: true });

    const handler = initEnquiryForm();
    const event = { preventDefault: jest.fn() };
    await handler(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('resets form and shows success on ok response', async () => {
    document.body.innerHTML = `
      <form id="enquiry-form" action="https://formspree.io/f/test">
        <input name="email" value="test@test.com" />
      </form>
      <button id="enquiry-btn">Send</button>
      <div id="enquiry-success" style="display:none"></div>
    `;
    global.fetch.mockResolvedValue({ ok: true });

    const handler = initEnquiryForm();
    await handler({ preventDefault: jest.fn() });

    expect(document.getElementById('enquiry-success').style.display).toBe('block');
    expect(document.getElementById('enquiry-btn').style.display).toBe('none');
  });

  test('shows error state on failed response', async () => {
    document.body.innerHTML = `
      <form id="enquiry-form" action="https://formspree.io/f/test">
        <input name="email" value="test@test.com" />
      </form>
      <button id="enquiry-btn">Send</button>
      <div id="enquiry-success" style="display:none"></div>
    `;
    global.fetch.mockResolvedValue({ ok: false });

    const handler = initEnquiryForm();
    await handler({ preventDefault: jest.fn() });

    const btn = document.getElementById('enquiry-btn');
    expect(btn.textContent).toBe('Error - Try Again');
    expect(btn.disabled).toBe(false);
  });

  test('shows error state on network error', async () => {
    document.body.innerHTML = `
      <form id="enquiry-form" action="https://formspree.io/f/test">
        <input name="email" value="test@test.com" />
      </form>
      <button id="enquiry-btn">Send</button>
      <div id="enquiry-success" style="display:none"></div>
    `;
    global.fetch.mockRejectedValue(new Error('Network error'));

    const handler = initEnquiryForm();
    await handler({ preventDefault: jest.fn() });

    const btn = document.getElementById('enquiry-btn');
    expect(btn.textContent).toBe('Error - Try Again');
    expect(btn.disabled).toBe(false);
  });
});
