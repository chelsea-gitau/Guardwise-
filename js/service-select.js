/**
 * Pre-select a service dropdown option from URL query parameters.
 */
function preselectService(searchString) {
  var params = new URLSearchParams(searchString || window.location.search);
  var service = params.get('service');
  if (!service) return false;

  var select = document.querySelector('select[name="service"]');
  if (!select) return false;

  var found = false;
  var decoded = decodeURIComponent(service);
  for (var i = 0; i < select.options.length; i++) {
    if (select.options[i].value === decoded) {
      select.options[i].selected = true;
      found = true;
      break;
    }
  }
  return found;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { preselectService };
}
