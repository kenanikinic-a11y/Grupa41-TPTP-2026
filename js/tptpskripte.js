if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service_worker.js');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initTema();
    document.getElementById('temaToggle')?.addEventListener('click', toggleTema);

    const savedCategory = localStorage.getItem('preferredCategory') || 'sve';
    filtriraj(savedCategory);

    // logika generisanja random broja dodana uz pomoc AI-a
    const brojac = document.getElementById('brojac');
    if (brojac) {
        setInterval(() => {
            let trenutno = parseInt(brojac.innerText, 10) || 12;
            trenutno += Math.random() > 0.5 ? 1 : -1;
            if (trenutno < 8) trenutno = 8;
            brojac.innerText = trenutno;
        }, 3000);
    }

    const forma = document.getElementById('kontaktForma');
    if (forma) {
        forma.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            document.getElementById('uspjehPoruka').style.display = 'none';

            const ime = document.getElementById('ime');
            if (ime && ime.value.trim().length < 2) {
                oznaciGresku('ime', 'Ime je obavezno.');
                isValid = false;
            }

            const prezime = document.getElementById('prezime');
            if (prezime && prezime.value.trim().length < 2) {
                oznaciGresku('prezime', 'Prezime je obavezno.');
                isValid = false;
            }

            // regex za validaciju e-maila i telefona generisan uz pomoc AI-a
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email.value)) {
                oznaciGresku('email', 'Unesite validan email.');
                isValid = false;
            }

            const telefon = document.getElementById('telefon');
            const telRegex = /^[0-9\s-]+$/;
            if (telefon && !telRegex.test(telefon.value)) {
                oznaciGresku('telefon', 'Unesite samo brojeve.');
                isValid = false;
            }

            const tema = document.getElementById('tema');
            if (tema && tema.value === '') {
                oznaciGresku('tema', 'Odaberite temu.');
                isValid = false;
            }

            const poruka = document.getElementById('poruka');
            if (poruka && poruka.value.trim().length < 10) {
                oznaciGresku('poruka', 'Poruka mora imati najmanje 10 karaktera.');
                isValid = false;
            }

            if (isValid) {
                const imeVal = ime.value;
                const uspjeh = document.getElementById('uspjehPoruka');
                uspjeh.innerText = `Hvala, ${imeVal}! Poruka je poslana.`;
                uspjeh.style.display = 'block';
                forma.reset();
            }
        });
    }

    document.getElementById('resetDugme')?.addEventListener('click', () => {
        forma?.reset();
        document.querySelectorAll('.error-msg').forEach(el => el.innerText = '');
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        document.getElementById('uspjehPoruka').style.display = 'none';
    });
});

function oznaciGresku(id, poruka) {
    const element = document.getElementById(id);
    if (element) element.classList.add('input-error');
    const errorElement = document.getElementById(`${id}Error`);
    if (errorElement) errorElement.innerText = poruka;
}

function filtriraj(kat) {
    const kartice = document.querySelectorAll('.card');
    const filterButtons = document.querySelectorAll('.side-nav button[data-category]');

    kartice.forEach(k => {
        k.style.display = (kat === 'sve' || k.dataset.category === kat) ? 'block' : 'none';
    });

    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === kat);
    });

    localStorage.setItem('preferredCategory', kat);
}

// smooth scroll generisan uz pomoc AI-a
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initTema() {
    const saved = localStorage.getItem('tema');
    if (saved) {
        document.body.dataset.theme = saved;
    }
    updateToggleBtn();
}

// logika izmjene teme i spremanja izbora u localStorage generisana uz pomoc AI
function toggleTema() {
    const current = document.body.dataset.theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = current === 'dark' || (current !== 'light' && prefersDark);
    const next = isDark ? 'light' : 'dark';
    document.body.dataset.theme = next;
    localStorage.setItem('tema', next);
    updateToggleBtn();
}

function updateToggleBtn() {
    const btn = document.getElementById('temaToggle');
    const current = document.body.dataset.theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = current === 'dark' || (current !== 'light' && prefersDark);
    btn.textContent = isDark ? 'Svjetli mod' : 'Tamni mod';
}
