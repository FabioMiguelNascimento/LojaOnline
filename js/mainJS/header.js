
    var menu = document.querySelector('.menuMobile');

menu.addEventListener('click', function() {
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
});