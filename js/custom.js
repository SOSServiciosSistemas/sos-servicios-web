/*---------------------------------------------------------------------
    File Name: custom.js
    Descripcion: Lógica personalizada para SOS Servicios
---------------------------------------------------------------------*/

// ==========================================
// CARGA DINÁMICA DE COMPONENTES (HEADER, FOOTER Y WHATSAPP)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    // 1. Cargar el Menú de Navegación (Header)
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("componentes/header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.outerHTML = data;
                marcarEnlaceActivo();
            })
            .catch(error => console.error(error));
    }

    // 2. Cargar el Pie de Página (Footer)
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("componentes/footer.html")
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error(error));
    }

    // 3. Cargar el Botón Flotante de WhatsApp
    const whatsappPlaceholder = document.getElementById("whatsapp-placeholder");
    if (whatsappPlaceholder) {
        fetch("componentes/whatsapp.html")
            .then(response => {
                if (!response.ok) throw new Error("Error al cargar el botón de WhatsApp");
                return response.text();
            })
            .then(data => {
                whatsappPlaceholder.innerHTML = data;
                // Una vez cargado el HTML en el DOM, activamos su lógica para móviles
                inicializarLogicaWhatsappMovil();
            })
            .catch(error => console.error(error));
    }
});

// Función de control para el menú de WhatsApp en pantallas táctiles
function inicializarLogicaWhatsappMovil() {
    const desplegados = document.querySelectorAll('.btn-desplegado');
    
    if (window.matchMedia("(max-width: 768px)").matches) {
        desplegados.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (!btn.classList.contains('active-wa')) {
                    e.preventDefault();
                    btn.classList.add('active-wa');
                }
            });
        });
    }
}

// Función para detectar la URL actual y añadir las clases activas de Bootstrap
function marcarEnlaceActivo() {
    // Obtener el nombre del archivo actual de la URL (ej. "mip.html")
    let paginaActual = window.location.pathname.split("/").pop();
    
    // Si la URL termina en raíz o carpeta, por defecto es index.html
    if (paginaActual === "" || paginaActual === "/") {
        paginaActual = "index.html";
    }

    const enlaces = document.querySelectorAll(".nav-link");
    enlaces.forEach(enlace => {
        // Extraer el atributo href del enlace
        const href = enlace.getAttribute("href");
        if (href === paginaActual) {
            enlace.classList.add("active", "fw-bold");
        } else {
            enlace.classList.remove("active", "fw-bold");
        }
    });
}


// ==========================================
// LÓGICA PARA LA SECCIÓN DESPLEGABLE MIP
// ==========================================

const datosServiciosMIP = {
    monitoreo: {
        titulo: "Diagnóstico y monitoreo",
        img1: "img/mip_Recurso001.png", 
        img2: "img/mip_Recurso002.png",
        titulotexto1: "Diagnóstico",
        titulotexto2: "Monitoreo", 
        texto1: "Durante el diagnóstico verificamos la plaga existente y el grado de infestación dentro del domicilio o establecimiento, para así poder definir el tratamiento necesario para su control.",
        texto2: "El monitoreo se lleva al tener un seguimiento a tratamientos realizados para evaluación de resultados y/o cambio de estrategias para el control."
    },
    preventivos: {
        titulo: "Tratamientos preventivos",
        img1: "img/mip_Recurso001.png",
        img2: "img/mip_Recurso002.png",
        titulotexto1: "Prevención en el hogar",
        titulotexto2: "Espacios seguros",
        texto1: "Implementamos estrategias avanzadas de Manejo Integral de Plagas enfocadas en la identificación y el control oportuno. Utilizamos barreras de protección efectivas que previenen amenazas sin alterar tus actividades cotidianas.",
        texto2: "Nos especializamos en el saneamiento y sanitización profunda de inmuebles. Combinamos buenas prácticas operativas con un estricto control para proteger la salud de las personas y asegurar la inocuidad del entorno."
    },
    puntual: {
        titulo: "Control puntual",
        img1: "img/mip_Recurso001.png",
        img2: "img/mip_Recurso002.png",
        titulotexto1: "Ataque dirigido",
        titulotexto2: "Bajo impacto",
        texto1: "Aplicamos tratamientos específicos y focalizados para erradicar infestaciones activas. Utilizamos productos de calidad internacional que actúan directamente sobre la plaga, garantizando la eliminación del problema de raíz.",
        texto2: "Priorizamos tu seguridad y la del medio ambiente. Nuestros métodos de control puntual integran productos orgánicos y técnicas de exclusión que minimizan el impacto ecológico mientras resuelven la contingencia."
    },
    asesoria: {
        titulo: "Asesoría en manejo",
        img1: "img/mip_Recurso001.png", 
        img2: "img/mip_Recurso002.png",
        titulotexto1: "Mejores prácticas",
        titulotexto2: "Mantenimiento",
        texto1: "Brindamos recomendaciones técnicas sobre hábitos de higiene, exclusión y almacenamiento. Nuestro objetivo es capacitarte para eliminar las condiciones que favorecen la aparición y reproducción de plagas en tus espacios.",
        texto2: "Diseñamos planes de prevención continua totalmente adaptados a tu inmueble. Te acompañamos con evaluaciones periódicas para asegurar que tus áreas operativas o residenciales se mantengan protegidas a largo plazo."
    }
};

function mostrarDetalleMIP(idServicio) {
    const wrapper = document.getElementById('detalle-servicio-mip');
    const info = datosServiciosMIP[idServicio];

    // Construimos el HTML, ahora inyectando los subtítulos (titulotexto1 y 2)
    wrapper.innerHTML = `
        <div class="container">
            <h3 class="detalle-titulo">${info.titulo}</h3>
            
            <div class="detalle-fila">
                <img src="${info.img1}" alt="Imagen 1 ${info.titulo}" class="detalle-imagen">
                <div class="detalle-texto">
                    ${info.titulotexto1 ? `<h4 class="fw-bold mb-3">${info.titulotexto1}</h4>` : ''}
                    <p>${info.texto1}</p>
                </div>
            </div>

            <div class="detalle-fila inversa">
                <img src="${info.img2}" alt="Imagen 2 ${info.titulo}" class="detalle-imagen">
                <div class="detalle-texto">
                    ${info.titulotexto2 ? `<h4 class="fw-bold mb-3">${info.titulotexto2}</h4>` : ''}
                    <p>${info.texto2}</p>
                </div>
            </div>
        </div>
    `;

    // Lo hacemos visible
    wrapper.style.display = 'block';

    // Animación de scroll suave hacia el inicio de la sección
    setTimeout(() => {
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
}

// ==========================================
// 2. LÓGICA UNIVERSAL PARA LOS CARRUSELES 3D
// ==========================================

const itemsCarousel = document.querySelectorAll('.carousel-item-3d');
let currentIndex = 0;
const totalItems = itemsCarousel.length;

function updateCarousel() {
    if (!totalItems) return;

    itemsCarousel.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
            item.classList.add('prev');
        } else if (index === (currentIndex + 1) % totalItems) {
            item.classList.add('next');
        }
    });
}

function nextSlide() {
    if (!totalItems) return;
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function prevSlide() {
    if (!totalItems) return;
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

// Enlazamos las funciones para que sirvan a los botones tanto de MIP como de Arbolado
window.prevSlideMip = prevSlide;
window.nextSlideMip = nextSlide;
window.prevSlideArbolado = prevSlide;
window.nextSlideArbolado = nextSlide;

// Inicializamos los clics en las tarjetas
if (totalItems) {
    itemsCarousel.forEach((item) => {
        item.addEventListener('click', () => {
            if (item.classList.contains('prev')) {
                prevSlide();
            } else if (item.classList.contains('next')) {
                nextSlide();
            }
        });
    });

    updateCarousel();
}