// Smooth scroll & misc
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
  });
});

// Form submissions (demo)
document.querySelectorAll('form.demo-form').forEach(f => {
  f.addEventListener('submit', e => {
    e.preventDefault();
    alert('Form submitted successfully! (demo mode — no backend)');
    f.reset();
  });
});

console.log('Vyntara Institute website loaded ✓');
