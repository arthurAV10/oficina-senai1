const viewer    = document.getElementById('viewer');
const cena      = document.getElementById('cena');
const ceu       = document.getElementById('ceu');
const titulo    = document.getElementById('titulo-360');
const btnFechar = document.getElementById('fechar');
const sairVR    = document.getElementById('sair-vr');

function abrir360(url, nome) {
  ceu.setAttribute('src', url);
  titulo.textContent = nome || '';
  viewer.classList.add('aberto');
  document.body.style.overflow = 'hidden'; // trava o scroll só enquanto o 360 está aberto
  setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
}

function fechar360() {
  if (cena.is && cena.is('vr-mode')) cena.exitVR();
  viewer.classList.remove('aberto');
  document.body.style.overflow = ''; // libera o scroll de novo
  ceu.setAttribute('src', '');
}

document.querySelectorAll('.galeria img').forEach(img => {
  img.addEventListener('click', () => {
    abrir360(img.dataset['360'] || img.src, img.alt);
  });
});

btnFechar.addEventListener('click', fechar360);
sairVR.addEventListener('click', fechar360);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && viewer.classList.contains('aberto')) fechar360();
});
