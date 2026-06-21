/* ============================================================
   PORTFOLIO — Sevan Petit · interactions
   Menu mobile, carrousels d'images, lightbox. JS pur.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  /* --- Menu latéral (mobile) --- */
  var toggle = document.getElementById('side-toggle');
  var nav = document.getElementById('side-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* --- Initialisation des carrousels --- */
  document.querySelectorAll('.carousel').forEach(function (c) { showSlide(c, 0); });
});

/* ============================================================
   CARROUSEL (chaque instance est indépendante)
   ============================================================ */
function showSlide(carousel, index) {
  if (!carousel) return;
  var slides = carousel.querySelectorAll('.slide');
  var dots = carousel.querySelectorAll('.dot');
  var track = carousel.querySelector('.carousel-track');
  if (!slides.length || !track) return;
  var i = (index + slides.length) % slides.length;
  carousel.dataset.current = i;
  track.style.transform = 'translateX(-' + (i * 100) + '%)';
  dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
}
function carouselFrom(el) { return el ? el.closest('.carousel') : null; }
function moveSlide(btn, n) {
  var c = carouselFrom(btn);
  if (!c) return;
  showSlide(c, parseInt(c.dataset.current || '0', 10) + n);
}
function goSlide(dot, n) { showSlide(carouselFrom(dot), n); }

/* ============================================================
   LIGHTBOX
   ============================================================ */
function openLightbox(src) {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src;
  lb.style.display = 'flex';
}
function closeLightbox(e) {
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  if (!e || e.target.id === 'lightbox' || e.target.classList.contains('x')) {
    lb.style.display = 'none';
  }
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});
