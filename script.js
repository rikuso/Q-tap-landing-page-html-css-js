document.addEventListener("DOMContentLoaded", function () {
    let sectionIndex = 0; // Índice de la sección actual
    const sections = document.querySelectorAll(".section");
    const progressBar = document.querySelector(".progress");
    let touchStartY = 0; // Posición de inicio del touch
    let touchEndY = 0; // Posición de fin del touch

    // Manejo de scroll en PC
    document.addEventListener("wheel", (event) => {
        if (event.deltaY > 0) {
            sectionIndex = Math.min(sectionIndex + 1, sections.length - 1); // Incrementar el índice de la sección
        } else {
            sectionIndex = Math.max(sectionIndex - 1, 0); // Decrementar el índice de la sección
        }
        updateContent();
        updateProgressBar();
    });

    // Manejo de scroll en móviles (touch)
    document.addEventListener("touchstart", (event) => {
        touchStartY = event.touches[0].clientY;
    });

    document.addEventListener("touchend", (event) => {
        touchEndY = event.changedTouches[0].clientY;
        if (touchStartY > touchEndY + 50) {
            sectionIndex = Math.min(sectionIndex + 1, sections.length - 1);
        } else if (touchStartY < touchEndY - 50) {
            sectionIndex = Math.max(sectionIndex - 1, 0);
        }
        updateContent();
        updateProgressBar();
    });

    // Manejo de clic en menú
    document.querySelectorAll(".navbar ul li a").forEach((link, index) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            sectionIndex = index;
            updateContent();
            updateProgressBar();
        });
    });

    function updateContent() {
        sections.forEach((section, index) => {
            section.style.transform = `translateY(${(index - sectionIndex) * 100}%)`;
            section.style.opacity = index === sectionIndex ? 1 : 0;
        });
    }

    function updateProgressBar() {
        const progress = ((sectionIndex + 1) / sections.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    updateContent();
    updateProgressBar();

    // Botón de contacto
    const btnContact = document.querySelector(".contact");
    if (btnContact) {
        btnContact.addEventListener("click", () => {
            sectionIndex = 6; // Asigna el índice de la sección de contacto
            updateContent();
            updateProgressBar();
        });
    }

    // Menú Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".navbar ul");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Botones de navegación
    const btnPrev = document.querySelector("#prev-btn");
    const btnNext = document.querySelector("#next-btn");

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            sectionIndex = Math.max(sectionIndex - 1, 0);
            updateContent();
            updateProgressBar();
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            sectionIndex = Math.min(sectionIndex + 1, sections.length - 1);
            updateContent();
            updateProgressBar();
        });
    }

    // Detecta el desplazamiento de la página
    window.onscroll = function() {
        var navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // Agrega la clase cuando haces scroll
        } else {
            navbar.classList.remove('scrolled'); // Elimina la clase cuando estás en la parte superior
        }
    };

    //carusel galerria de imagenes-----------------------------------
    
        const carousel = document.querySelector(".carousel-itemsG");
        const images = document.querySelectorAll(".carousel-itemsG img");
        const totalImages = images.length;
        let currentIndex = 0;
        const imagesPerSlide = 1;
    
        // Duplicamos las imágenes para lograr un efecto infinito
        images.forEach((img) => {
            const clone = img.cloneNode(true);
            carousel.appendChild(clone);
        });
    
        function moveCarousel() {
            currentIndex += imagesPerSlide;
            carousel.style.transition = "transform 0.5s ease-in-out";
            carousel.style.transform = `translateX(-${currentIndex * (50 / imagesPerSlide)}%)`;
    
            // Resetear la transición cuando llegamos al final
            if (currentIndex >= totalImages) {
                setTimeout(() => {
                    carousel.style.transition = "none";
                    currentIndex = 0;
                    carousel.style.transform = `translateX(0)`;
                }, 500);
            }
        }
    
        function movePrev() {
            if (currentIndex === 0) {
                currentIndex = totalImages;
                carousel.style.transition = "none";
                carousel.style.transform = `translateX(-${currentIndex * (50/ imagesPerSlide)}%)`;
            }
            setTimeout(() => {
                currentIndex -= imagesPerSlide;
                carousel.style.transition = "transform 0.5s ease-in-out";
                carousel.style.transform = `translateX(-${currentIndex * (100 / imagesPerSlide)}%)`;
            }, 10);
        }
    
        // Movimiento automático
        let autoSlide = setInterval(moveCarousel, 3000);
                // Flechas de navegación
        const nextButton = carousel.querySelector('.nextG');
        const prevButton = carousel.querySelector('.prevG');
    
        // Botones manuales
        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                clearInterval(autoSlide);
                moveCarousel();
                autoSlide = setInterval(moveCarousel, 3000);
            });

            prevButton.addEventListener('click', () => {
                clearInterval(autoSlide);
                movePrev();
                autoSlide = setInterval(moveCarousel, 3000);
            });
        }

   
    


    // Carrusel TEXTO
    const carousels = document.querySelectorAll('.carousel-container'); // Selecciona todos los contenedores de carrusel

    carousels.forEach((carousel) => {
        let currentIndex = 0;
        const itemsPerSlide = 2;  // Mostrar 2 elementos a la vez
        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;

        // Flechas de navegación
        const nextButton = carousel.querySelector('.next');
        const prevButton = carousel.querySelector('.prev');

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                moveToNextSlide();
            });

            prevButton.addEventListener('click', () => {
                moveToPrevSlide();
            });
        }

        // Función para mover al siguiente conjunto de elementos
        function moveToNextSlide() {
            if (currentIndex + itemsPerSlide >= totalItems) {
                currentIndex = 0;  // Volver al principio si se llegó al final
            } else {
                currentIndex++;
            }
            updateCarousel();
        }

        // Función para mover al conjunto anterior de elementos
        function moveToPrevSlide() {
            if (currentIndex === 0) {
                currentIndex = totalItems - itemsPerSlide;  // Ir al final si se está al principio
            } else {
                currentIndex--;
            }
            updateCarousel();
        }

        // Función para actualizar la posición del carrusel
        function updateCarousel() {
            const offset = -currentIndex * (items[0].offsetWidth); // Desplazar por el tamaño de un item
            carousel.querySelector('.carousel-items').style.transform = `translateX(${offset}px)`;
        }
    });
});