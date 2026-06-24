/* ==========================================================================
   Guardwise Security - Shared JavaScript
   Common functionality used across all pages: mobile menu, copyright year,
   Tawk.to chat, cookie consent, cursor effects, and scroll reveal.
   ========================================================================== */

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}

// Copyright year
(function() {
  var el = document.getElementById('copy-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// Scroll reveal (IntersectionObserver)
(function() {
  var targets = document.querySelectorAll('.fade-up,.fade-left,.fade-right');
  if (!targets.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  targets.forEach(function(el) { observer.observe(el); });
})();

// Tawk.to live chat (single instance)
(function() {
  var Tawk_API = window.Tawk_API || {};
  var Tawk_LoadStart = new Date();
  var s1 = document.createElement('script');
  var s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/6a2a57ddea17a21c304ae017/1jqqmeeph';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();

// Cookie consent
function acceptCookies() {
  localStorage.setItem('gw_cookies', 'accepted');
  document.getElementById('cookie-banner').style.display = 'none';
}
function declineCookies() {
  localStorage.setItem('gw_cookies', 'declined');
  document.getElementById('cookie-banner').style.display = 'none';
}
window.addEventListener('load', function() {
  if (!localStorage.getItem('gw_cookies')) {
    setTimeout(function() {
      var banner = document.getElementById('cookie-banner');
      if (banner) banner.style.display = 'block';
    }, 1500);
  }
});

// Cursor effects (desktop only)
(function() {
  var spotlight = document.getElementById('spotlight');
  var cursorDot = document.getElementById('cursorDot');
  var cursorRing = document.getElementById('cursorRing');

  if (!spotlight || !window.matchMedia('(pointer:fine)').matches) return;

  document.addEventListener('mousemove', function(e) {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
    if (cursorDot) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    }
    if (cursorRing) {
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top = e.clientY + 'px';
    }
  });

  // Enlarge ring on hoverable elements
  if (cursorRing && cursorDot) {
    var hoverables = document.querySelectorAll('a, button, .service-card, .faq-q, .nav-cta');
    hoverables.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursorRing.classList.add('hovering');
        cursorDot.classList.add('hovering');
      });
      el.addEventListener('mouseleave', function() {
        cursorRing.classList.remove('hovering');
        cursorDot.classList.remove('hovering');
      });
    });
  }

  // Trailing gold particles
  var lastParticleTime = 0;
  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - lastParticleTime < 40) return;
    lastParticleTime = now;

    var size = Math.random() * 6 + 3;
    var p = document.createElement('div');
    p.className = 'mouse-particle';
    p.style.cssText =
      'left:' + e.clientX + 'px;' +
      'top:' + e.clientY + 'px;' +
      'width:' + size + 'px;' +
      'height:' + size + 'px;' +
      'background:rgba(201,168,76,' + (Math.random() * 0.4 + 0.2) + ');' +
      'animation-duration:' + (Math.random() * 400 + 500) + 'ms;';
    document.body.appendChild(p);
    setTimeout(function() { p.remove(); }, 900);
  });
})();
