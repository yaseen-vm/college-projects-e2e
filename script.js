const loader = document.getElementById('loader');
window.addEventListener('load', () => window.setTimeout(() => loader.classList.add('hide'), 380));

const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});
document.querySelectorAll('a, button, input, textarea').forEach((element) => {
  element.addEventListener('mouseenter', () => cursor.classList.add('big'));
  element.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.magnetic').forEach((element) => {
  element.addEventListener('mousemove', (event) => {
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.1;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
  element.addEventListener('mouseleave', () => { element.style.transform = ''; });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.gsap && window.ScrollTrigger && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);
  const splitChars = (element) => {
    const text = element.textContent;
    element.textContent = '';
    [...text].forEach((character) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = character === ' ' ? '\u00a0' : character;
      element.appendChild(span);
    });
    return element.querySelectorAll('.char');
  };
  document.querySelectorAll('.hero-title .line > span').forEach((line, index) => {
    const chars = splitChars(line);
    gsap.from(chars, { yPercent: 115, rotate: 5, opacity: 0, duration: 1, delay: 0.25 + index * 0.15, ease: 'power4.out', stagger: 0.025 });
  });
  gsap.to('.hero-copy', { yPercent: -25, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '55% top', end: 'bottom top', scrub: true } });
  const section = document.querySelector('.hscroll');
  const track = document.querySelector('.hscroll-track');
  if (section && track) {
    section.classList.add('gsap-pinned');
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const scrollTween = gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true } });
    gsap.utils.toArray('.process-panel').forEach((panel) => {
      gsap.from(panel.querySelectorAll('h3, p'), { y: 40, opacity: 0, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: 'left 82%', end: 'left 43%', scrub: true } });
      const art = panel.querySelector('.panel-art');
      const artScroll = { trigger: panel, containerAnimation: scrollTween, start: 'left 92%', end: 'right 15%', scrub: true };
      const artTimeline = gsap.timeline({ scrollTrigger: artScroll });
      artTimeline.fromTo(art, { scale: 0.72, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });

      if (art.classList.contains('art-orbit')) {
        artTimeline.to(art, { rotation: 180, duration: 0.75, ease: 'none' }, 0);
        artTimeline.to(art.querySelectorAll('i'), { rotation: -90, duration: 0.75, ease: 'none', stagger: 0.08 }, 0);
        artTimeline.to(art.querySelector('b'), { scale: 1.25, duration: 0.35, ease: 'power2.out' }, 0.35);
      }
      if (art.classList.contains('art-grid')) {
        artTimeline.to(art.querySelectorAll('i'), { y: (index) => index % 2 ? 22 : -22, rotation: (index) => index % 2 ? 18 : -18, duration: 0.75, stagger: 0.08, ease: 'power2.out' }, 0);
      }
      if (art.classList.contains('art-code')) {
        artTimeline.to(art, { y: -22, rotation: -8, duration: 0.75, ease: 'power2.out' }, 0);
      }
      if (art.classList.contains('art-ticket')) {
        artTimeline.to(art, { y: -24, rotation: 5, duration: 0.75, ease: 'power2.out' }, 0);
      }
    });
  }
}

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitBtn.textContent = 'Sending your brief...';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    const templateParams = { name: document.getElementById('user_name').value, email: document.getElementById('user_email').value, message: document.getElementById('user_message').value, time: new Date().toLocaleString() };
    if (!window.emailjs) {
      formStatus.textContent = 'Message service is unavailable. Please try again shortly.';
      submitBtn.textContent = 'Send project brief ↗';
      submitBtn.disabled = false;
      return;
    }
    emailjs.send('service_iennfp7', 'template_9wuvbzo', templateParams, 'qRxH0WfmVW7wXW6HD').then(() => {
      formStatus.textContent = 'Brief sent. We will be in touch soon.';
      contactForm.reset();
    }).catch(() => { formStatus.textContent = 'Could not send your brief. Please check your connection and try again.'; }).finally(() => {
      submitBtn.textContent = 'Send project brief ↗';
      submitBtn.disabled = false;
    });
  });
}
