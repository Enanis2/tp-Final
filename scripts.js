// Función para mostrar/ocultar la pantalla de búsqueda
function toggleSearch() {
    const searchScreen = document.getElementById("search-screen");
    searchScreen.classList.toggle("open");
}

// Función para filtrar elementos en la página principal
function filterDivs() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const allDivs = document.querySelectorAll(".main-content > div"); // Solo divs de nivel superior
    let anyMatch = false; // Variable para detectar si hay alguna coincidencia
  
    allDivs.forEach(div => {
        // Verificar si el id del div contiene la palabra "Img"
        const isImageDiv = div.id && div.id.includes("Img");

        // Obtener todas las clases, excepto las que deseas ignorar
        const classList = Array.from(div.classList).filter(className => className !== "tieAut__grid--marcas");
        const match = classList.some(className => className.toLowerCase().startsWith(query));
  
        if (match || query === "") {
            div.style.display = ""; // Mostrar el div
            div.style.height = ""; // Restablecer la altura del div cuando haya coincidencia
            // Mostrar todos los hijos también
            const childDivs = div.querySelectorAll("div");
            childDivs.forEach(child => {
                child.style.display = ""; // Mostrar los hijos
                child.style.height = ""; // Restablecer la altura de los hijos
            });
            anyMatch = true; // Si hay una coincidencia, cambiamos la variable
        } else {
            div.style.display = "none"; // Ocultar el div
            div.style.height = "0"; // Establecer altura 0 cuando no haya coincidencia
            // Si el div contiene una imagen o tiene un height fijo, aplicar también altura 0 a los hijos
            if (isImageDiv) {
                // Establecer altura 0 a todos los hijos del div
                const childDivs = div.querySelectorAll("div");
                childDivs.forEach(child => {
                    child.style.display = "none"; // Ocultar los hijos
                    child.style.height = "0"; // Establecer altura 0 en los hijos
                });
            }
        }
    });

    // Ajustar la altura de .main-content dependiendo de si hay coincidencias
    const mainContent = document.querySelector(".main-content");
    if (anyMatch) {
        mainContent.style.height = ""; // Ajustar la altura a auto si hay coincidencias
    } else {
        mainContent.style.height = ""; // Devolver la altura predeterminada si no hay coincidencias
    }
}
