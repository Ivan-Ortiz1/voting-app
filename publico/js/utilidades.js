// --------------------
// Reordenar lista de enlaces por votos
// --------------------
function reordenarListaEnlaces() {
  const lista = document.getElementById("lista-enlaces");
  if (!lista) return;

  const items = Array.from(lista.children);

  items.sort((a, b) => {
    const votosA = parseInt(a.querySelector(".contador-votos").textContent);
    const votosB = parseInt(b.querySelector(".contador-votos").textContent);
    return votosB - votosA;
  });

  items.forEach(item => lista.appendChild(item));
}

// --------------------
// Reordenar lista de temas por votos
// --------------------
function reordenarListaTemas() {
  const lista = document.getElementById("lista-temas");
  if (!lista) return;

  const items = Array.from(lista.children);

  items.sort((a, b) => {
    const votosA = parseInt(a.querySelector(".contador-votos").textContent);
    const votosB = parseInt(b.querySelector(".contador-votos").textContent);
    return votosB - votosA;
  });

  items.forEach(item => lista.appendChild(item));
}

// --------------------
// Exponer funciones en global para ser usadas por otros scripts
// --------------------
window.reordenarListaEnlaces = reordenarListaEnlaces;
window.reordenarListaTemas = reordenarListaTemas;
