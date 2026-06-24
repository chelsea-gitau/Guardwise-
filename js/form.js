/**
 * Form submission handling for quote and enquiry forms.
 */
function handleQuoteSubmit(e) {
  if (!e || !e.target) return;
  e.preventDefault();
  var form = e.target;

  return fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  })
    .then(function (r) {
      if (r.ok) {
        var formWrap = document.getElementById('formWrap');
        var successMsg = document.getElementById('successMsg');
        if (formWrap) formWrap.style.display = 'none';
        if (successMsg) successMsg.classList.add('show');
      }
      return r;
    })
    .catch(function () {
      form.submit();
    });
}

function initEnquiryForm() {
  var enquiryForm = document.getElementById('enquiry-form');
  if (!enquiryForm) return null;

  var handler = async function (e) {
    e.preventDefault();
    var btn = document.getElementById('enquiry-btn');
    if (!btn) return;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      var response = await fetch('https://formspree.io/f/mqeolgzj', {
        method: 'POST',
        body: new FormData(enquiryForm),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        enquiryForm.reset();
        var successEl = document.getElementById('enquiry-success');
        if (successEl) successEl.style.display = 'block';
        btn.style.display = 'none';
      } else {
        btn.textContent = 'Error - Try Again';
        btn.disabled = false;
      }
    } catch (err) {
      btn.textContent = 'Error - Try Again';
      btn.disabled = false;
    }
  };

  enquiryForm.addEventListener('submit', handler);
  return handler;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { handleQuoteSubmit, initEnquiryForm };
}
