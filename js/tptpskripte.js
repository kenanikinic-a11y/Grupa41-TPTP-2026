document.addEventListener('DOMContentLoaded', () => {
    const savedCategory = localStorage.getItem('preferredCategory') || 'sve';
    filtriraj(savedCategory);

    const brojac = document.getElementById('brojac');
    if (brojac) {
        setInterval(() => {
            let trenutno = parseInt(brojac.innerText, 10) || 12;
            trenutno += Math.random() > 0.5 ? 1 : -1;
            if (trenutno < 8) trenutno = 8;
            brojac.innerText = trenutno;
        }, 3000);
    }
});

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
