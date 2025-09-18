// Resalta un elemento temporalmente
export function resaltarElemento(elemento) {
  elemento.classList.add("highlight");
  setTimeout(() => elemento.classList.remove("highlight"), 600);
}

// Reordena una lista por votos
export function reordenarListaPorVotos(listaId) {
  const lista = document.getElementById(listaId);
  if (!lista) return;

  const items = Array.from(lista.children);
  items.sort((a, b) => {
    const votosA = parseInt(a.querySelector(".contador-votos").textContent, 10);
    const votosB = parseInt(b.querySelector(".contador-votos").textContent, 10);
    return votosB - votosA;
  });

  items.forEach(item => lista.appendChild(item));
}
