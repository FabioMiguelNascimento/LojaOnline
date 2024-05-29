
// document.addEventListener('DOMContentLoaded', function() {
//     const anteriorButton = document.querySelector('.controle-produtos.anterior');
//     const proximoButton = document.querySelector('.controle-produtos.proximo');
//     const produtosInterno = document.querySelector('.produtos-interno');

//     const itemWidth = document.querySelector('.produto-item').clientWidth;
//     const gap = parseInt(getComputedStyle(produtosInterno).gap);

//     anteriorButton.addEventListener('click', function() {
//         produtosInterno.scrollBy({
//             left: -(itemWidth + gap),
//             behavior: 'smooth'
//         });
//     });

//     proximoButton.addEventListener('click', function() {
//         produtosInterno.scrollBy({
//             left: itemWidth + gap,
//             behavior: 'smooth'
//         });
//     });

//     let isDown = false;
//     let startX;
//     let scrollLeft;
//     let velocity = 0;
//     let animationFrame;

//     produtosInterno.addEventListener('mousedown', (e) => {
//         isDown = true;
//         produtosInterno.classList.add('active');
//         startX = e.pageX - produtosInterno.offsetLeft;
//         scrollLeft = produtosInterno.scrollLeft;
//         produtosInterno.style.cursor = 'grabbing';
//         e.preventDefault(); // Evita arrastar imagens e texto
//     });

//     produtosInterno.addEventListener('mouseleave', () => {
//         isDown = false;
//         produtosInterno.classList.remove('active');
//         produtosInterno.style.cursor = 'grab';
//         cancelAnimationFrame(animationFrame);
//     });

//     produtosInterno.addEventListener('mouseup', () => {
//         isDown = false;
//         produtosInterno.classList.remove('active');
//         produtosInterno.style.cursor = 'grab';
//         cancelAnimationFrame(animationFrame);
//         smoothScroll();
//     });

//     produtosInterno.addEventListener('mousemove', (e) => {
//         if (!isDown) return;
//         e.preventDefault();
//         const x = e.pageX - produtosInterno.offsetLeft;
//         const walk = (x - startX) * 1.5; // Ajuste a velocidade de rolagem conforme necessário
//         produtosInterno.scrollLeft = scrollLeft - walk;
//         velocity = walk; // Capture a velocidade do movimento
//         cancelAnimationFrame(animationFrame);
//         animationFrame = requestAnimationFrame(updateScroll);
//     });

//     function updateScroll() {
//         if (isDown) return;
//         produtosInterno.scrollLeft -= velocity;
//         velocity *= 0.95; // Reduz a velocidade gradualmente
//         if (Math.abs(velocity) > 0.5) {
//             animationFrame = requestAnimationFrame(updateScroll);
//         }
//     }

//     function smoothScroll() {
//         if (Math.abs(velocity) < 0.5) return;
//         produtosInterno.scrollLeft -= velocity;
//         velocity *= 0.95; // Reduz a velocidade gradualmente
//         animationFrame = requestAnimationFrame(smoothScroll);
//     }

//     produtosInterno.addEventListener('dragstart', (e) => {
//         e.preventDefault(); // Evita o comportamento padrão de arrastar
//     });
// });
