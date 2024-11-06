function convertBinaryToDecimal() {
    const binaryInput = document.getElementById('binaryInput').value;
    const binaryResultDiv = document.getElementById('binaryResult');
    
    if (!/^[01]{8}$/.test(binaryInput)) {
        binaryResultDiv.innerHTML = "Virhe: Syötä 8-bittinen binääriluku (vain 0 ja 1, yhteensä 8 merkkiä).";
        return;
    }

    const powers = [128, 64, 32, 16, 8, 4, 2, 1];
    let decimalValue = 0;
    let steps = `<p>Muunnosvaiheet binääristä desimaaliin:</p><ul>`;
    
    for (let i = 0; i < 8; i++) {
        const bit = parseInt(binaryInput[i], 10);
        if (bit === 1) {
            decimalValue += powers[i];
            steps += `<li>Bitti 1<br> Lisää ${powers[i]}<br> ${decimalValue}</li>`;
        } else {
            steps += `<li>Bitti 0<br> Ohita ${powers[i]}<br> ${decimalValue}</li>`;
        }
    }

    steps += `</ul><p>Lopullinen desimaalimuoto: <strong>${decimalValue}</strong></p>`;
    binaryResultDiv.innerHTML = steps;
    binaryResultDiv.style.display = 'block'; // Corrected variable name
}
