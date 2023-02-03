export function cardRotation() {
    const cards = document.querySelectorAll('.card');
    const backFaces = document.querySelectorAll('.back-face');

    cards.forEach(card => {
        card.addEventListener('click', addClassActive);

        function addClassActive() {
            if (!card.classList.contains('active')) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        }
    });
}
