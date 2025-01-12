document.addEventListener('DOMContentLoaded', function () {
    const colorInput = document.getElementById('color-input');
    const applyColorButton = document.getElementById('apply-color');
    const colorGrid = document.getElementById('color-grid');
    const rainbowButton = document.getElementById('rainbow-button');
    const discoButton = document.getElementById('disco-button');
    let discoInterval;

    // Generate a grid of colorful boxes
    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
        '#33FFF5', '#F5FF33', '#FF3333', '#33FF33', '#3333FF',
        '#FFC300', '#C70039', '#900C3F', '#581845', '#DAF7A6'
    ];

    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;
        colorGrid.appendChild(colorBox);
    });

    // Apply the selected color to the background
    applyColorButton.addEventListener('click', function () {
        document.body.style.background = colorInput.value;
    });

    // Rainbow button effect
    rainbowButton.addEventListener('click', function () {
        document.body.style.background = 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)';
        document.body.style.animation = 'none'; // Stop the background animation
    });

    // Disco button effect
    discoButton.addEventListener('click', function () {
        if (discoInterval) {
            clearInterval(discoInterval);
            discoInterval = null;
            document.body.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
            document.body.style.animation = 'backgroundChange 10s infinite'; // Restore the background animation
        } else {
            discoInterval = setInterval(() => {
                const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                document.body.style.background = randomColor;
            }, 200);
        }
    });
});