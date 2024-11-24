//Buscar----------------------------------
function filterDivs() {
    const query = document.getElementById("tieAutMain__cosasJS--contenedorBusqueda--busqueda--busquedaInput").value.toLowerCase();
    const allDivs = document.querySelectorAll(".main-content > div"); // Divs de marcas principales
    let anyMatch = false; // Variable para detectar si hay alguna coincidencia

    allDivs.forEach(div => {
        // Verificar si el id del div contiene la palabra "Img"
        const isImageDiv = div.id && div.id.toLowerCase().includes("img");

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
            div.style.transition = "all 2s"
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

    // Ajustar la altura de #tieAut__Grid dependiendo de si hay coincidencias
    const mainContent = document.querySelector("#tieAut__Grid");
    if (anyMatch) {
        mainContent.style.height = "auto"; // Ajustar la altura a auto si hay coincidencias
    } else {
        mainContent.style.height = ""; // Devolver la altura predeterminada si no hay coincidencias
    }
}



//Filtrar------------------------------------

// Selección de elementos principales
const sidebar = document.getElementById('tieAutMain__cosasJS--filtros--sidebar');
const toggleSidebarBtn = document.getElementById('tieAutMain__cosasJS--filtros--barraDeFiltros');
const closeSidebarBtn = document.getElementById('closeSidebar');
const filters = document.querySelectorAll('.filter-toggle'); // Selecciona todos los filtros
const autos = document.querySelectorAll('#tieAut__Grid .autos'); // Selecciona todos los autos
const marcas = document.querySelectorAll('.tieAut__grid--marcas'); // Selecciona los contenedores grandes (marcas)

// Mostrar la barra lateral al hacer clic en el botón de apertura
toggleSidebarBtn.addEventListener('click', () => {
  sidebar.classList.add('tieAutMain__cosasJS--filtros--sidebarActive'); // Muestra la barra lateral
});

// Cerrar la barra lateral al hacer clic en el botón de cierre
closeSidebarBtn.addEventListener('click', () => {
  sidebar.classList.remove('tieAutMain__cosasJS--filtros--sidebarActive'); // Oculta la barra lateral
});

// Evento para cerrar la barra lateral al presionar la tecla Esc
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    sidebar.classList.remove('tieAutMain__cosasJS--filtros--sidebarActive'); // Oculta la barra lateral
  }
});

// Función para actualizar la visibilidad de los autos según los filtros
function aplicarFiltros() {
  // Obtén las categorías activas
  const filtrosActivos = Array.from(filters)
    .filter(filter => filter.checked)
    .map(filter => filter.getAttribute('data-filter'));

  // Si no hay filtros activos o si alguna categoría no tiene selección, ocultar todo
  const categorias = ["todoterreno?", "energia", "precio"];
  const todasCategoriasTienenSeleccion = categorias.every(categoria => {
    const filtrosCategoria = document.getElementById(categoria).querySelectorAll('.filter-toggle');
    return Array.from(filtrosCategoria).some(filtro => filtro.checked);
  });

  if (!todasCategoriasTienenSeleccion) {
    autos.forEach(auto => auto.classList.add('hidden'));
    marcas.forEach(marca => {
      marca.classList.add('hidden');
      marca.classList.remove('centered');
    });
    return;
  }

  // Itera sobre los autos para determinar su visibilidad
  autos.forEach(auto => {
    // Verifica si el auto cumple con todos los filtros activos
    const cumpleTodos = filtrosActivos.every(filtro => auto.classList.contains(filtro));
    // Muestra u oculta el auto según el resultado
    auto.classList.toggle('hidden', !cumpleTodos);
  });

  // Itera sobre los contenedores grandes (marcas) y verifica si deben mostrarse
  marcas.forEach(marca => {
    const autosDeMarca = marca.querySelectorAll('.autos'); // Autos dentro del contenedor
    const autosVisibles = Array.from(autosDeMarca).filter(auto => !auto.classList.contains('hidden'));

    if (autosVisibles.length > 0) {
      // Si hay autos visibles, muestra la marca y ajusta el centrado
      marca.classList.remove('hidden');
    } else {
      // Si no hay autos visibles, oculta la marca
      marca.classList.add('hidden');
    }
  });
}

// Evento para manejar cambios en los filtros
filters.forEach(filter => {
  filter.addEventListener('change', aplicarFiltros);
});

// Inicializar visibilidad al cargar la página
aplicarFiltros();

// --- Lógica para selección exclusiva de filtros dentro de cada categoría ---

// Función para manejar la selección exclusiva dentro de un contenedor
function manejarSeleccionExclusiva(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const categoryFilters = container.querySelectorAll('.filter-toggle');
  categoryFilters.forEach(filter => {
    filter.addEventListener('change', event => {
      if (event.target.checked) {
        // Deselecciona todos los demás checkboxes en el contenedor
        categoryFilters.forEach(otherFilter => {
          if (otherFilter !== event.target) {
            otherFilter.checked = false;
          }
        });
        // Aplica los filtros actualizados
        aplicarFiltros();
      }
    });
  });
}

// Manejar selección exclusiva para cada categoría
manejarSeleccionExclusiva('todoterreno?');
manejarSeleccionExclusiva('energia');
manejarSeleccionExclusiva('precio');
