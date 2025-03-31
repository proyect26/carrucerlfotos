let currentImageIndex = 0; // Índice de la imagen actual
const images = [
    'fotos/123.jpeg',
    'fotos/Fondos-de-pantalla-de-Parejas-Enamoradas-23.jpg',
    'fotos/OIP.jpeg',
    'fotos/parejas tumblr.JPG'
]; // Rutas de las imágenes

const compliments = [
    "Gracias por existir", 
    "Eres una persona increíble", 
    "Tu sonrisa ilumina el mundo", 
    "Eres único/a y especial"
]; // Cumplidos para cada imagen

function updateActiveButton() {
    const buttons = document.querySelectorAll('.controls button');
    buttons.forEach((button, index) => {
        if (index === currentImageIndex) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function changeImage(direction) {
    const imagesElements = document.querySelectorAll('.gallery-image');
    const totalImages = imagesElements.length;

    // Eliminar clases actuales
    imagesElements.forEach((img) => {
        img.classList.remove('active', 'previous', 'next');
    });

    // Actualizar índice de la imagen actual
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1; // Volver al final
    } else if (currentImageIndex >= totalImages) {
        currentImageIndex = 0; // Volver al inicio
    }

    // Asignar clases a las imágenes
    const previousIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    const nextIndex = (currentImageIndex + 1) % totalImages;

    imagesElements[currentImageIndex].classList.add('active');
    imagesElements[previousIndex].classList.add('previous');
    imagesElements[nextIndex].classList.add('next');

    // Actualizar el cumplido
    const counterElement = document.querySelector('.counter');
    counterElement.textContent = compliments[currentImageIndex];
}

let startX = 0; // Coordenada inicial del toque

// Detectar el inicio del toque
document.querySelector('.image-container').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

// Detectar el final del toque y calcular la dirección
document.querySelector('.image-container').addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX > 50) {
        // Deslizar hacia la derecha
        changeImage(-1);
    } else if (deltaX < -50) {
        // Deslizar hacia la izquierda
        changeImage(1);
    }
});
