// Importar todas las cartas
import { baraja } from './baseDatos.js'

//Importar las partes del HTML
const mazo = document.getElementById("baraja")
const cartas = document.getElementById("cardGrid")

//Inicia el juego con un array donde pondré las cartas del tapete
const barajaTapete = [];

//Una copia de la baraja para poder modificarla
const barajaCopia = baraja.slice().sort(() => Math.random() - 0.5);

//---------FUNCIONES--------//

  
  function eliminarCarta(indice) {
    barajaTapete.splice(indice, 1);
  }

  function mostrarBarajaTapete() {
    // Elimina todas las imágenes existentes en la interfaz de usuario
    cartas.innerHTML = '';
  
    // Recorre el array barajaTapete y crea un elemento img para cada una de las cartas
    barajaTapete.forEach((card, index) => {
      const imgCarta = document.createElement('img');
      imgCarta.src = card.img;
      imgCarta.className = 'card';
      imgCarta.setAttribute("data-valor", card.valor);
      imgCarta.setAttribute("data-palo", card.palo);
      cartas.appendChild(imgCarta);
  
      // Asigna el evento click a la imagen
      imgCarta.addEventListener("click", () => {
        // Obtiene la imagen anterior y la siguiente
        const prevCard = cartas.children[index - 1];
        const nextCard = cartas.children[index + 1];
  
        // Si hay imagen anterior y el valor o el palo de la imagen anterior o siguiente es igual al de la imagen clicada
        if (prevCard && nextCard) {
          if ((prevCard.dataset.valor == nextCard.dataset.valor) || (prevCard.dataset.palo == nextCard.dataset.palo)) {
            // Elimina la imagen de barajaTapete
            eliminarCarta(index -1);
            // Muestra el contenido de barajaTapete en la interfaz de usuario
            mostrarBarajaTapete();
          }
        }
      });
    });
  }
  


// Inicia el juego
mazo.addEventListener("click", () => {
    if (barajaCopia.length > 0) {
        barajaTapete.push(barajaCopia.pop())
        mostrarBarajaTapete()
        
    } else {
        if (confirm("¿Deseas volver a jugar?")) {
            location.reload();
        }
    }
})

