const { preselectService } = require('../js/service-select');

describe('preselectService', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <select name="service">
        <option value="">Choose a service</option>
        <option value="Static Guarding">Static Guarding</option>
        <option value="CCTV Systems">CCTV Systems</option>
        <option value="Mobile Patrol">Mobile Patrol</option>
        <option value="Security Dogs">Security Dogs</option>
        <option value="Key Holding">Key Holding</option>
      </select>
    `;
  });

  test('selects the matching service from URL params', () => {
    const result = preselectService('?service=CCTV%20Systems');
    expect(result).toBe(true);
    const select = document.querySelector('select[name="service"]');
    const selected = [...select.options].find(o => o.selected);
    expect(selected.value).toBe('CCTV Systems');
  });

  test('selects Static Guarding', () => {
    preselectService('?service=Static%20Guarding');
    const select = document.querySelector('select[name="service"]');
    const selected = [...select.options].find(o => o.selected);
    expect(selected.value).toBe('Static Guarding');
  });

  test('returns false when no service param is provided', () => {
    expect(preselectService('?foo=bar')).toBe(false);
  });

  test('returns false when service param is empty', () => {
    expect(preselectService('')).toBe(false);
  });

  test('returns false when select element does not exist', () => {
    document.body.innerHTML = '';
    expect(preselectService('?service=CCTV%20Systems')).toBe(false);
  });

  test('returns false when service value does not match any option', () => {
    expect(preselectService('?service=NonExistentService')).toBe(false);
  });

  test('handles URL-encoded service names correctly', () => {
    const result = preselectService('?service=Mobile%20Patrol');
    expect(result).toBe(true);
    const select = document.querySelector('select[name="service"]');
    const selected = [...select.options].find(o => o.selected);
    expect(selected.value).toBe('Mobile Patrol');
  });

  test('handles multiple URL params correctly', () => {
    const result = preselectService('?name=John&service=Key%20Holding&email=test');
    expect(result).toBe(true);
    const select = document.querySelector('select[name="service"]');
    const selected = [...select.options].find(o => o.selected);
    expect(selected.value).toBe('Key Holding');
  });

  test('does not select any option when service param value is the empty placeholder', () => {
    const result = preselectService('?service=');
    expect(result).toBe(false);
  });
});
