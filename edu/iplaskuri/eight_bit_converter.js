function convertEightBit() {
    const eightBitInput = document.getElementById('eightBitInput').value;
    const eightBitResultDiv = document.getElementById('eightBitResult');
    const number = parseInt(eightBitInput, 10);

    // Check if the input is invalid
    if (isNaN(number) || number < 0 || number > 255) {
        eightBitResultDiv.innerHTML = "<p class='error-message'>Syötä luku välillä 0–255. 8-bittinen numero ei voi olla yli 255.</p>";
        return;
    }

    const powers = [128, 64, 32, 16, 8, 4, 2, 1];
    let steps = `<p>Syötetty numero (${number}) muunnetaan binääriksi:</p><ul>`;
    let binaryResult = '';
    let currentNumber = number;

    // Convert the number to binary and explain each step
    for (const power of powers) {
        if (currentNumber >= power) {
            binaryResult += '1';
            steps += `<li>${currentNumber} jäljellä<br>${power} mahtuu<br>Vähennetään<br>Bitti '1'<br></li>`;
            currentNumber -= power;
        } else {
            binaryResult += '0';
            steps += `<li>${currentNumber} jäljellä<br>${power} ei mahdu<br>Ei muutosta<br>Bitti '0'</li>`;
        }
    }
    
    steps += `</ul><p>Lopullinen binäärimuoto: <strong>${binaryResult}</strong></p>`;
    // Display the conversion steps in the result div
    eightBitResultDiv.innerHTML = steps;
    eightBitResultDiv.style.display = 'block'; // Show the result div with the conversion result
}
