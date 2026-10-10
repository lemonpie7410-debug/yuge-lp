(function () {
  function setupFAQ() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var question = item.querySelector('.faq-q');
      var answer = item.querySelector('.faq-a');
      if (!question || !answer) return;

      function setState(open) {
        item.classList.toggle('open', open);
        question.setAttribute('aria-expanded', open ? 'true' : 'false');
        answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0px';
      }

      setState(item.classList.contains('open'));
      question.addEventListener('click', function () {
        setState(!item.classList.contains('open'));
      });
    });
  }

  function setupGallery() {
    var track = document.querySelector('.gallery-track');
    if (!track) return;
    var slides = track.querySelectorAll('.gallery-slide');
    var dots = document.querySelectorAll('.gallery-progress span');
    var prevBtn = document.querySelector('.gallery-prev');
    var nextBtn = document.querySelector('.gallery-next');

    function currentIndex() {
      return Math.round(track.scrollLeft / track.clientWidth);
    }
    function goTo(index) {
      index = Math.max(0, Math.min(slides.length - 1, index));
      track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    }
    function updateDots() {
      var idx = currentIndex();
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === idx);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex() - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex() + 1); });
    track.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateDots);
    });
    updateDots();
  }

  function setupReveal() {
    var els = document.querySelectorAll('.reveal-up, .reveal-left');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setupFAQ();
      setupGallery();
      setupReveal();
    });
  } else {
    setupFAQ();
    setupGallery();
    setupReveal();
  }
})();