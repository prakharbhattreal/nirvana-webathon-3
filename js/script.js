const docEl = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// 3) Reveal on scroll using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

// 4) Counters animation
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1200; // ms
    const start = performance.now();
    function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const val = Math.floor(p * target);
        el.textContent = val.toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}
document.querySelectorAll('.counter').forEach(el => animateCounter(el));

// 5) FAQ accordions
document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const p = btn.querySelector('p + p');
        const isOpen = p.style.maxHeight && p.style.maxHeight !== '0px';
        p.style.maxHeight = isOpen ? '0' : p.scrollHeight + 'px';
    });
});

// 6) Contact form (demo validation)
const form = document.getElementById('contactForm');
const toast = document.getElementById('formToast');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();
    const agree = document.getElementById('agree').checked;
    if (!name || !email || !msg || !agree) {
        toast.textContent = 'Please fill all fields and accept the terms.';
        toast.classList.remove('hidden');
        toast.classList.remove('bg-emerald-50', 'text-emerald-700', 'border-emerald-200', 'dark:bg-emerald-900/30', 'dark:text-emerald-200', 'dark:border-emerald-800');
        toast.classList.add('bg-rose-50', 'text-rose-700', 'border', 'border-rose-200', 'dark:bg-rose-900/30', 'dark:text-rose-200', 'dark:border-rose-800');
        return;
    }
    toast.textContent = "Thanks! We'll get back to you soon.";
    toast.classList.remove('hidden');
    toast.classList.remove('bg-rose-50', 'text-rose-700', 'border-rose-200', 'dark:bg-rose-900/30', 'dark:text-rose-200', 'dark:border-rose-800');
    toast.classList.add('bg-emerald-50', 'text-emerald-700', 'border', 'border-emerald-200', 'dark:bg-emerald-900/30', 'dark:text-emerald-200', 'dark:border-emerald-800');
    form.reset();
});

// 7) Footer year
document.getElementById('year').textContent = new Date().getFullYear();