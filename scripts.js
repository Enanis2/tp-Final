//Buscar----------------------------------
function filterDivs() {
  const query = document.getElementById("tieAutMain__cosasJS--contenedorBusqueda--busqueda--busquedaInput").value.toLowerCase();
  const allDivs = document.querySelectorAll("#tieAutMain__catalogo > div");
  let anyMatch = false;

  allDivs.forEach(div => {
      //Ver si el id del div contiene la palabra "Img"
      const isImageDiv = div.id && div.id.toLowerCase().includes("img");

      const classList = Array.from(div.classList).filter(className => className !== "tieAutMain__catalogo--marcas");
      const match = classList.some(className => className.toLowerCase().startsWith(query));

      if (match || query === "") {
          div.style.display = ""; //Mostrar el div
          div.style.height = "";
          //Mostrar todos los hijos también
          const childDivs = div.querySelectorAll("div");
          childDivs.forEach(child => {
              child.style.display = "";
              child.style.height = "";
          });
          anyMatch = true; //Si hay una coincidencia, cambio la variable
      } else {
          div.style.display = "none";
          div.style.transition = "all 2s"
          div.style.height = "0";
          //Si el div contiene una imagen o tiene un height fijo, aplicar también altura 0 a los hijos
          if (isImageDiv) {
              //Establecer altura 0 a todos los hijos del div
              const childDivs = div.querySelectorAll("div");
              childDivs.forEach(child => {
                  child.style.display = "none";
                  child.style.height = "0";
              });
          }
      }
  });

  //Ajustar la altura de #tieAutMain__catalogo dependiendo de si hay coincidencias
  const mainContent = document.querySelector("#tieAutMain__catalogo");
  if (anyMatch) {
      mainContent.style.height = "auto";
  } else {
      mainContent.style.height = ""; // Devolver la altura predeterminada si no hay coincidencias
  }
}



//Filtrar------------------------------------

const sidebar = document.getElementById('tieAutMain__cosasJS--filtros--sidebar');
const toggleSidebarBtn = document.getElementById('tieAutMain__cosasJS--filtros--barraDeFiltros');
const closeSidebarBtn = document.getElementById('tieAutMain__cosasJS--filtros--sidebar--cerrarSidebar');
const filters = document.querySelectorAll('.tieAutMain__cosasJS--filtros--sidebar--opciones--interruptor--input');
const autos = document.querySelectorAll('#tieAutMain__catalogo .tieAutMain__catalogo--marcas--autos'); //Selecciona todos los autos
const marcas = document.querySelectorAll('.tieAutMain__catalogo--marcas'); //Selecciona los contenedores grandes (marcas)

//Mostrar la barra lateral al hacer clic en el botón de apertura
toggleSidebarBtn.addEventListener('click', () => {
sidebar.classList.add('tieAutMain__cosasJS--filtros--sidebarActive');
});

//Cerrar la barra lateral al hacer clic en el botón de cierre
closeSidebarBtn.addEventListener('click', () => {
sidebar.classList.remove('tieAutMain__cosasJS--filtros--sidebarActive');
});

//Cerrar la barra lateral al presionar la tecla Esc
document.addEventListener('keydown', (event) => {
if (event.key === 'Escape') {
  sidebar.classList.remove('tieAutMain__cosasJS--filtros--sidebarActive');
}
});

function aplicarFiltros() {
//Obtener las categorías activas
const filtrosActivos = Array.from(filters)
  .filter(filter => filter.checked)
  .map(filter => filter.getAttribute('data-filter'));

//Si no hay filtros activos o si alguna categoría no tiene selección, ocultar todo
const categorias = ["tieAutMain__cosasJS--filtros--sidebar--todoterreno?", "tieAutMain__cosasJS--filtros--sidebar--energia", "tieAutMain__cosasJS--filtros--sidebar--precio"];
const todasCategoriasTienenSeleccion = categorias.every(categoria => {
  const filtrosCategoria = document.getElementById(categoria).querySelectorAll('.tieAutMain__cosasJS--filtros--sidebar--opciones--interruptor--input');
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
//Autos(hijo)
autos.forEach(auto => {
  //Verifica si el auto cumple con todos los filtros activos
  const cumpleTodos = filtrosActivos.every(filtro => auto.classList.contains(filtro));
  //Muestra u oculta el auto según el resultado
  auto.classList.toggle('hidden', !cumpleTodos);
});
//Marcas (padre)
marcas.forEach(marca => {
  const autosDeMarca = marca.querySelectorAll('.tieAutMain__catalogo--marcas--autos'); //Autos dentro del contenedor
  const autosVisibles = Array.from(autosDeMarca).filter(auto => !auto.classList.contains('hidden'));

  if (autosVisibles.length > 0) {
    //Si hay autos visibles, muestra la marca
    marca.classList.remove('hidden');
  } else {
    //Si no hay autos visibles, oculta la marca
    marca.classList.add('hidden');
  }
});
}

//Cambios en los filtros
filters.forEach(filter => {
filter.addEventListener('change', aplicarFiltros);
});

aplicarFiltros();

//Selección exclusiva de filtros dentro de cada categoría

function manejarSeleccionExclusiva(containerId) {
const container = document.getElementById(containerId);
if (!container) return;
const categoryFilters = container.querySelectorAll('.tieAutMain__cosasJS--filtros--sidebar--opciones--interruptor--input');
categoryFilters.forEach(filter => {
  filter.addEventListener('change', event => {
    if (event.target.checked) {
      //Deselecciona todos los demás checkboxes en el contenedor
      categoryFilters.forEach(otherFilter => {
        if (otherFilter !== event.target) {
          otherFilter.checked = false;
        }
      });
      //Aplica los filtros actualizados
      aplicarFiltros();
    }
  });
});
}

manejarSeleccionExclusiva('tieAutMain__cosasJS--filtros--sidebar--todoterreno?');
manejarSeleccionExclusiva('tieAutMain__cosasJS--filtros--sidebar--energia');
manejarSeleccionExclusiva('tieAutMain__cosasJS--filtros--sidebar--precio');