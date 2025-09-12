document.addEventListener("DOMContentLoaded", () => {
  const botonesVotar = document.querySelectorAll(".btn-votar");

  botonesVotar.forEach(boton => {
    boton.addEventListener("click", async () => {
      const id = boton.getAttribute("data-id");

      try {
        const respuesta = await fetch(`/temas/votar/${id}/json`, {
          method: "POST"
        });

        const data = await respuesta.json();

        if (data.success) {
          // Actualizar contador de votos en pantalla
          const temaElemento = document.getElementById(`tema-${id}`);
          const contador = temaElemento.querySelector(".contador-votos");
          contador.textContent = data.tema.votos;

          // Feedback visual al votar
          temaElemento.style.transition = "background 0.3s";
          temaElemento.style.background = "#d4edda"; // verde suave
          setTimeout(() => temaElemento.style.background = "transparent", 500);

          // Reordenar lista de temas según votos
          reordenarLista();
        }
      } catch (error) {
        console.error("Error al votar:", error);
      }
    });
  });
});

function reordenarLista() {
  const lista = document.getElementById("lista-temas");
  const items = Array.from(lista.querySelectorAll("li"));

  items.sort((a, b) => {
    const votosA = parseInt(a.querySelector(".contador-votos").textContent);
    const votosB = parseInt(b.querySelector(".contador-votos").textContent);
    return votosB - votosA;
  });

  items.forEach(item => lista.appendChild(item));
}
