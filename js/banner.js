document.addEventListener('DOMContentLoaded', function () {
    const anteriorButton = document.querySelector('.controle-carrossel.anterior');
    const proximoButton = document.querySelector('.controle-carrossel.proximo');
    const carrosselInterno = document.querySelector('.carrossel-interno');

    anteriorButton.addEventListener('click', () => {
        const primeiroSlide = 0;
        const ultimoSlide = carrosselInterno.scrollWidth - carrosselInterno.clientWidth;
        if (carrosselInterno.scrollLeft === primeiroSlide) {
            carrosselInterno.scrollLeft = ultimoSlide;
        } else {
            carrosselInterno.scrollLeft -= carrosselInterno.clientWidth;
        }
    });
    
    proximoButton.addEventListener('click', () => {
        const primeiroSlide = 0;
        const ultimoSlide = carrosselInterno.scrollWidth - carrosselInterno.clientWidth;
        if (carrosselInterno.scrollLeft === ultimoSlide) {
            carrosselInterno.scrollLeft = primeiroSlide;
        } else {
            carrosselInterno.scrollLeft += carrosselInterno.clientWidth;
        }
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
        const walk = (x - startX) * 7; // Ajuste a velocidade de rolagem conforme necessário
        carrosselInterno.scrollLeft = scrollLeft - walk;
        velocity = walk; // Capture a velocidade do movimento
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(updateScroll);
    
        const primeiroSlide = 0;
        const ultimoSlide = carrosselInterno.scrollWidth - carrosselInterno.clientWidth;
    
        if (carrosselInterno.scrollLeft === primeiroSlide && walk > 0) {
            carrosselInterno.scrollLeft = ultimoSlide;
            startX = e.pageX - carrosselInterno.offsetLeft + ultimoSlide;
        } else if (carrosselInterno.scrollLeft === ultimoSlide && walk < 0) {
            carrosselInterno.scrollLeft = primeiroSlide;
            startX = e.pageX - carrosselInterno.offsetLeft - ultimoSlide;
        }
    });
    
    function updateScroll() {
        if (isDown) return;
        carrosselInterno.scrollLeft -= velocity;
        velocity *= 0.95; // Reduz a velocidade gradualmente
        if (Math.abs(velocity) > 0.5) {
            animationFrame = requestAnimationFrame(updateScroll);
        }
    }

    function smoothScroll() {
        if (Math.abs(velocity) < 0.5) return;
        carrosselInterno.scrollLeft -= velocity;
        velocity *= 0.95; // Reduz a velocidade gradualmente
        animationFrame = requestAnimationFrame(smoothScroll);
    }

    carrosselInterno.addEventListener('dragstart', (e) => {
        e.preventDefault(); // Evita o comportamento padrão de arrastar
    });
});