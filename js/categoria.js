document.addEventListener('DOMContentLoaded', function () {
    const anteriorButton = document.querySelector('.controle-categorias.anterior');
    const proximoButton = document.querySelector('.controle-categorias.proximo');
    const categoriaInterno = document.querySelector('.categoria-interno');

    const itemWidth = document.querySelector('.categoria-item').clientWidth;
    const gap = parseInt(getComputedStyle(categoriaInterno).gap);

    anteriorButton.addEventListener('click', function () {
        categoriaInterno.scrollBy({
            left: -(itemWidth + gap),
            behavior: 'smooth'
        });
    });

    proximoButton.addEventListener('click', function () {
        categoriaInterno.scrollBy({
            left: itemWidth + gap,
            behavior: 'smooth'
        });
    });

    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let animationFrame;

    categoriaInterno.addEventListener('mousedown', (e) => {
        isDown = true;
        categoriaInterno.classList.add('active');
        startX = e.pageX - categoriaInterno.offsetLeft;
        scrollLeft = categoriaInterno.scrollLeft;
        categoriaInterno.style.cursor = 'grabbing';
        e.preventDefault(); // Evita arrastar imagens e texto
    });

    categoriaInterno.addEventListener('mouseleave', () => {
        isDown = false;
        categoriaInterno.classList.remove('active');
        categoriaInterno.style.cursor = 'grab';
        cancelAnimationFrame(animationFrame);
    });

    categoriaInterno.addEventListener('mouseup', () => {
        isDown = false;
        categoriaInterno.classList.remove('active');
        categoriaInterno.style.cursor = 'grab';
        cancelAnimationFrame(animationFrame);
        smoothScroll();
    });

    categoriaInterno.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - categoriaInterno.offsetLeft;
        const walk = (x - startX) * 1.5; // Ajuste a velocidade de rolagem conforme necessário
        categoriaInterno.scrollLeft = scrollLeft - walk;
        velocity = walk; // Capture a velocidade do movimento
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(updateScroll);
    });

    function updateScroll() {
        if (isDown) return;
        categoriaInterno.scrollLeft -= velocity;
        velocity *= 0.95; // Reduz a velocidade gradualmente
        if (Math.abs(velocity) > 0.5) {
            animationFrame = requestAnimationFrame(updateScroll);
        }
    }

    function smoothScroll() {
        if (Math.abs(velocity) < 0.5) return;
        categoriaInterno.scrollLeft -= velocity;
        velocity *= 0.95; // Reduz a velocidade gradualmente
        animationFrame = requestAnimationFrame(smoothScroll);
    }

    categoriaInterno.addEventListener('dragstart', (e) => {
        e.preventDefault(); // Evita o comportamento padrão de arrastar
    });
});


// Funcionalidade node
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.categoria-item').forEach(categoria => {
        categoria.addEventListener('click', () => {
            const tag = categoria.getAttribute('data-tag');
            window.location.href = `categorias.html?tag=${tag}`;
        });
    });
});
