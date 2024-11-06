function convertEightBit() {
    const eightBitInput = document.getElementById('eightBitInput').value;
    const eightBitResultDiv = document.getElementById('eightBitResult');
    const number = parseInt(eightBitInput, 10);

    if (isNaN(number) || number < 0 || number > 255) {
        eightBitResultDiv.innerHTML = "Syötä luku välillä 0–255. 8-bittinen numero ei voi olla yli 255.";
        return;
    }

    const powers = [128, 64, 32, 16, 8, 4, 2, 1];
    let steps = `<p>Syötetty numero (${number}) muunnetaan binääriksi:</p><ul>`;
    let binaryResult = '';
    let currentNumber = number;

    for (const power of powers) {
        if (currentNumber >= power) {
            binaryResult += '1';
            currentNumber -= power;
            steps += `<li>${power} mahtuu lukuun, lisätään bitti '1', vähennetään luvusta ${power} (${currentNumber} jäljellä)</li>`;
        } else {
            binaryResult += '0';
            steps += `<li>${power} ei mahdu lukuun, lisätään bitti '0'</li>`;
        }
    }
    
    steps += `</ul><p>Lopullinen binäärimuoto: <strong>${binaryResult}</strong></p>`;
    eightBitResultDiv.innerHTML = steps;
    eightBitResultDiv.style.display = 'block'; // Show the result div with the conversion result
}
