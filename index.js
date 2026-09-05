// Funcionalidad del botón principal
const btnClick = document.getElementById('btnClick');
btnClick.addEventListener('click', function() {
    alert('¡Gracias por hacer clic! Este es un ejemplo de interactividad con JavaScript.');
    console.log('Botón clickeado en:', new Date());
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Validar que no estén vacíos
    if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
        alert('Por favor, completa todos los campos');
        return;
    }
    
    // Mostrar confirmación
    console.log('Formulario enviado:');
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);
    
    alert('¡Gracias ' + nombre + '! Tu mensaje ha sido recibido. Nos pondremos en contacto pronto.');
    
    // Limpiar formulario
    contactForm.reset();
});

// Efecto de navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cambiar color del logo al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Evento de carga de la página
window.addEventListener('load', function() {
    console.log('¡Página cargada correctamente!');
    console.log('Bienvenido a Mi Proyecto Web');
});

// Función para logging de eventos
function logEvent(eventName, details) {
    const timestamp = new Date().toLocaleString('es-ES');
    console.log(`[${timestamp}] ${eventName}:`, details);
}

// Inicialización
logEvent('Inicialización', 'Página lista para interactuar');
