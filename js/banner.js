document.addEventListener('DOMContentLoaded', function () {
    const anteriorButton = document.querySelector('.controle-carrossel.anterior');
    const proximoButton = document.querySelector('.controle-carrossel.proximo');
    const carrosselInterno = document.querySelector('.carrossel-interno');
    const indicadores = document.querySelectorAll('.indicador');
    const totalSlides = document.querySelectorAll('.carrossel-item').length;

    updateIndicators();
    function updateIndicators() {
        const scrollPosition = carrosselInterno.scrollLeft;
        const activeIndex = Math.round(scrollPosition / carrosselInterno.offsetWidth);

        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('ativo', index === activeIndex);
        });

        anteriorButton.style.visibility = activeIndex === 0 ? 'hidden' : 'visible';
        proximoButton.style.visibility = activeIndex === totalSlides - 1 ? 'hidden' : 'visible';
    }

    anteriorButton.addEventListener('click', () => {
        carrosselInterno.scrollLeft -= carrosselInterno.offsetWidth;
    });

    proximoButton.addEventListener('click', () => {
        carrosselInterno.scrollLeft += carrosselInterno.offsetWidth;
    });

    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            carrosselInterno.scrollLeft = index * carrosselInterno.offsetWidth;
        });
    });

    carrosselInterno.addEventListener('scroll', () => {
        requestAnimationFrame(updateIndicators);
    });

    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let animationFrame;

    carrosselInterno.addEventListener('mousedown', (e) => {
        isDown = true;
        carrosselInterno.classList.add('active');
        startX = e.pageX - carrosselInterno.offsetLeft;
        scrollLeft = carrosselInterno.scrollLeft;
        carrosselInterno.style.cursor = 'grabbing';
        e.preventDefault(); // Evita arrastar imagens e texto
    });

    carrosselInterno.addEventListener('mouseleave', () => {
        isDown = false;
        carrosselInterno.classList.remove('active');
        carrosselInterno.style.cursor = 'grab';
        cancelAnimationFrame(animationFrame);
    });

    carrosselInterno.addEventListener('mouseup', () => {
        isDown = false;
        carrosselInterno.classList.remove('active');
        carrosselInterno.style.cursor = 'grab';
        cancelAnimationFrame(animationFrame);
        smoothScroll();
    });

    carrosselInterno.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carrosselInterno.offsetLeft;
        const walk = (x - startX) * 3; 
        carrosselInterno.scrollLeft = scrollLeft - walk;
        velocity = walk; 
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(updateScroll);
    });

    function updateScroll() {
        if (isDown) return;
        carrosselInterno.scrollLeft -= velocity;
        velocity *= 0.95; 
        if (Math.abs(velocity) > 0.5) {
            animationFrame = requestAnimationFrame(updateScroll);
        }
    }

    function smoothScroll() {
        if (Math.abs(velocity) < 0.5) return;
        carrosselInterno.scrollLeft -= velocity;
        velocity *= 0.95; 
        animationFrame = requestAnimationFrame(smoothScroll);
    }

    carrosselInterno.addEventListener('dragstart', (e) => {
        e.preventDefault(); 
    });
});
