const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;
const speed = 0.15;

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * speed;
  ringY += (mouseY - ringY) * speed;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

const hoverTargets = document.querySelectorAll('a, button');
hoverTargets.forEach((node) => {
  node.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  node.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

const projectData = {
  1: {
    title: 'Vector Art',
    category: 'Graphic Design',
    description: 'Precision vector illustrations combining geometric forms with refined typography. This project showcases bold visual narratives through minimalist digital art, utilizing a restrained color palette and meticulous attention to detail.',
    image: 'images/Vandita_Rana_4811_A2.jpg'
  },
  2: {
    title: 'Style Tile',
    category: 'Brand Identity',
    description: 'A comprehensive visual system defining color palettes, typography hierarchies, and component states. Designed for seamless integration across digital touchpoints with accessibility standards and responsive adaptations.',
    image: 'images/Style_Tile.png'
  },
  3: {
    title: 'Studio Identity',
    category: 'Visual system',
    description: 'An extensible design system with modular components, accessibility standards, and motion guidelines. Built for scalability across enterprise applications while maintaining refined visual coherence.',
    image: 'images/UHN Design system.png'
  },
  4: {
    title: 'Truvvoye Wireframe Interface',
    category: 'Web design',
    description: 'High-fidelity interface wireframes prioritizing user flow and information hierarchy. Detailed specifications for responsive behavior and interactive states ensure intuitive navigation across all devices.',
    image: 'images/Homepage wireframe.png'
  }
};

const modal = document.getElementById('projectModal');

function closeModal() {
  if (modal) {
    modal.classList.remove('active');
  }
}

function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!modal || !project) return;

  document.getElementById('modalImage').src = project.image;
  document.getElementById('modalImage').alt = project.title;
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalCategory').textContent = project.category;
  document.getElementById('modalDescription').textContent = project.description;
  modal.classList.add('active');
}

const modalClose = modal ? modal.querySelector('.modal-close') : null;

function onDocumentClick(e) {
  const viewBtn = e.target.closest('.view-btn');
  if (viewBtn) {
    e.preventDefault();
    openProjectModal(viewBtn.dataset.project);
    return;
  }

  if (e.target.closest('.modal-close') || e.target.closest('.modal-back')) {
    closeModal();
    return;
  }

  if (modal && e.target === modal) {
    closeModal();
  }
}

document.addEventListener('click', onDocumentClick);

if (modalClose) {
  modalClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

document.querySelectorAll('.reveal').forEach((element) => scrollObserver.observe(element));

const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
});

// Trigger hero reveal after loading so animation is visible immediately
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero-copy .reveal').forEach((item, index) => {
    setTimeout(() => item.classList.add('visible'), index * 120);
  });
});
