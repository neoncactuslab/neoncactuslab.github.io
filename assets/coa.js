// Página do Crown of Aureth: botão de download sempre na versão mais nova do beta e galeria ampliável.
(function () {
  const REPO = 'neoncactuslab/crown-of-aureth-beta';

  // Busca a última versão publicada no GitHub. Se falhar (sem internet, limite da API),
  // o botão continua levando para a página de downloads, que sempre funciona.
  fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
    .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(rel => {
      const exe = (rel.assets || []).find(a => /\.exe$/i.test(a.name));
      const ver = (rel.tag_name || '').replace(/^v/, '');
      for (const el of document.querySelectorAll('.dl-version')) el.textContent = ver ? `v${ver}` : '';
      if (!exe) return;
      const mb = Math.round(exe.size / 1048576);
      for (const a of document.querySelectorAll('.dl-link')) a.href = exe.browser_download_url;
      for (const s of document.querySelectorAll('.dl-small')) s.textContent = `Gratuito · Windows 10 e 11 · ${mb} MB`;
    })
    .catch(() => {});

  // Galeria: clique amplia a imagem; clique de novo ou Esc fecha.
  const box = document.getElementById('lightbox');
  if (!box) return;
  const img = box.querySelector('img');
  for (const a of document.querySelectorAll('.gallery .grid a')) {
    a.addEventListener('click', e => {
      e.preventDefault();
      img.src = a.href;
      img.alt = a.querySelector('img').alt;
      box.classList.add('on');
    });
  }
  const close = () => box.classList.remove('on');
  box.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
