document.addEventListener('DOMContentLoaded', function () {

  // ---- Desktop dropdown (JS-driven, avoids CSS-hover edge cases) ----
  document.querySelectorAll('.has-dropdown').forEach(function (li) {
    var menu = li.querySelector('.dropdown-menu');
    if (!menu) return;
    li.addEventListener('mouseenter', function () { menu.style.display = 'block'; });
    li.addEventListener('mouseleave', function () { menu.style.display = 'none'; });
  });

  // ---- Mobile menu overlay ----
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  var mobileNavClose = document.getElementById('mobileNavClose');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileNavClose && mobileNav) {
    mobileNavClose.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // ---- Mobile "Serviços" submenu toggle ----
  var servicosToggle = document.getElementById('mobileServicosToggle');
  var servicosSubmenu = document.getElementById('mobileServicosSubmenu');

  if (servicosToggle && servicosSubmenu) {
    servicosToggle.addEventListener('click', function () {
      servicosToggle.classList.toggle('open');
      servicosSubmenu.classList.toggle('open');
    });
  }

  // ---- Hero carousel: 3 slides, sliding left, 3s interval ----
  var heroTrack = document.getElementById('heroTrack');
  var heroDots = document.querySelectorAll('.hero-dots span');

  if (heroTrack) {
    var slides = heroTrack.children.length;
    var current = 0;

    setInterval(function () {
      current = (current + 1) % slides;
      heroTrack.style.transform = 'translateX(-' + (current * 100) + '%)';

      heroDots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }, 3000);
  }

  // ---- Lightbox for gallery images (Serviços galleries + Nossa Estrutura) ----
  var galleryGroups = document.querySelectorAll('.gallery-row, .estrutura-gallery');

  if (galleryGroups.length) {
    var modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML =
      '<button class="lightbox-close" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>' +
      '<button class="lightbox-prev" aria-label="Anterior"><i class="fa-solid fa-chevron-left"></i></button>' +
      '<img class="lightbox-image" src="" alt="">' +
      '<button class="lightbox-next" aria-label="Próxima"><i class="fa-solid fa-chevron-right"></i></button>';
    document.body.appendChild(modal);

    var lightboxImage = modal.querySelector('.lightbox-image');
    var currentGroup = [];
    var currentIndex = 0;

    function showImage() {
      lightboxImage.src = currentGroup[currentIndex].src;
      lightboxImage.alt = currentGroup[currentIndex].alt || '';
    }

    function openLightbox(group, index) {
      currentGroup = group;
      currentIndex = index;
      showImage();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    galleryGroups.forEach(function (group) {
      var imgs = Array.prototype.slice.call(group.querySelectorAll('img'));
      imgs.forEach(function (img, index) {
        img.addEventListener('click', function () {
          openLightbox(imgs, index);
        });
      });
    });

    modal.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    modal.querySelector('.lightbox-prev').addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
      showImage();
    });

    modal.querySelector('.lightbox-next').addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % currentGroup.length;
      showImage();
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') modal.querySelector('.lightbox-prev').click();
      if (e.key === 'ArrowRight') modal.querySelector('.lightbox-next').click();
    });
  }

});
