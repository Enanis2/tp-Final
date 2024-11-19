// Función para mostrar/ocultar la pantalla de búsqueda
function toggleSearch() {
    const searchScreen = document.getElementById("search-screen");
    searchScreen.classList.toggle("open");
  }
  
  // Función para filtrar elementos en la página principal
  function filterDivs() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const allDivs = document.querySelectorAll(".main-content > div"); // Solo divs de nivel superior
  
    allDivs.forEach(div => {
        // Obtener todas las clases, excepto las que deseas ignorar
        const classList = Array.from(div.classList).filter(className => className !== "tieAut__grid--marcas");
        const match = classList.some(className => className.toLowerCase().startsWith(query));
  
        if (match || query === "") {
            div.style.display = ""; // Mostrar el div
            // Mostrar todos los hijos también
            const childDivs = div.querySelectorAll("div");
            childDivs.forEach(child => {
                child.style.display = ""; // Mostrar los hijos
            });
        } else {
            div.style.display = "none"; // Ocultar el div y todos sus hijos
        }
    });
  }
  
  