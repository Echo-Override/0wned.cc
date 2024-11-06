function checkSubnet() {
    const firstIPv4 = document.getElementById('1stIPv4').value.trim();
    const secondIPv4 = document.getElementById('2ndIPv4').value.trim();
    const subnetMask = document.getElementById('subnetMask').value.trim();
    const resultDiv = document.getElementById('subnetResult');
    resultDiv.style.display = 'block'; // Ensure result is visible

    // Function to validate the IPv4 address
    function validateIPv4(ip) {
        const octets = ip.split('.');
        if (octets.length !== 4) {
            return "IP-osoitteen on koostuttava neljästä oktetista";
        }

        for (let i = 0; i < 4; i++) {
            if (!/^\d+$/.test(octets[i])) {
                return `Virheellinen arvo oktetissa ${i + 1}.<br>Oktetin tulee olla numeroarvo välillä 0-255.`;
            }
            const octet = parseInt(octets[i]);
            if (octet < 0 || octet > 255) {
                return `Virheellinen arvo oktetissa ${i + 1}.<br>Arvon tulee olla välillä 0-255.`;
            }
        }

        return null;
    }

    // Validate first IP address
    let ipError = validateIPv4(firstIPv4);
    if (ipError) {
        resultDiv.innerHTML = `<p class='error-message'>Virhe IPv4-osoitteessa 1:<br> ${ipError} Esimerkiksi: 192.168.1.1</p>`;
        return;
    }

    // Validate second IP address
    ipError = validateIPv4(secondIPv4);
    if (ipError) {
        resultDiv.innerHTML = `<p class='error-message'>Virhe IPv4-osoitteessa 2:<br> ${ipError} Esimerkiksi: 192.168.1.1</p>`;
        return;
    }

    // Validate subnet mask
    const subnetOctets = subnetMask.split('.');

    if (subnetOctets.length !== 4) {
        resultDiv.innerHTML = "<p class='error-message'>Virhe: Aliverkon maskin tulee koostua neljästä oktetista.<br> Esimerkiksi: 255.255.255.0</p>";
        return;
    }

    for (let i = 0; i < subnetOctets.length; i++) {
        if (!/^\d+$/.test(subnetOctets[i])) {
            resultDiv.innerHTML = `<p class='error-message'>Virhe: Aliverkon maskin oktetissa ${i + 1} on virheellinen arvo. <br>Oktetin tulee olla numeroarvo välillä 0-255.<br> Esimerkiksi: 255.255.255.0</p>`;
            return;
        }
        const octet = parseInt(subnetOctets[i]);
        if (octet > 255) {
            resultDiv.innerHTML = `<p class='error-message'>Virhe: Aliverkon maskin oktetissa ${i + 1} on virheellinen arvo. <br>Arvon tulee olla välillä 0-255.<br> Esimerkiksi: 255.255.255.0</p>`;
            return;
        }
    }

    // Validate subnet mask pattern (1s followed by 0s in binary representation)
    function isValidSubnetMask(mask) {
        const binary = mask.split('.').map(octet => {
            return parseInt(octet).toString(2).padStart(8, '0');
        }).join('');

        const isValid = /^[1]*0*$/.test(binary);
        return isValid;
    }

    if (!isValidSubnetMask(subnetMask)) {
        const binaryMask = subnetMask.split('.').map(octet => {
            return parseInt(octet).toString(2).padStart(8, '0');
        }).join('.');

        resultDiv.innerHTML = `<p class='error-message'>Virhe: Aliverkon maski on virheellinen.<br>Aliverkon maskin pitää olla jatkuva 1:n virta, jota seuraa jatkuva 0:n virta binäärimuodossa.<br>${subnetMask} binäärimuodossa: ${binaryMask}.<br>Esimerkki toimivasta aliverkon maskista: 255.255.255.0</p>`;
        return;
    }

    // Convert IP address from dotted decimal to binary
    function convertToBinary(ip) {
        return ip.split('.').map(octet => {
            let binary = parseInt(octet).toString(2);
            return binary.padStart(8, '0');
        }).join('.');
    }

    // Convert IP from binary string to decimal
    function binaryToDecimal(binaryStr) {
        return parseInt(binaryStr, 2);
    }

    // Convert subnet mask to binary
    const subnetBinary = convertToBinary(subnetMask);

    // Convert both IP addresses to binary
    const firstIPv4Binary = convertToBinary(firstIPv4);
    const secondIPv4Binary = convertToBinary(secondIPv4);

    // Perform subnet check (bitwise AND operation)
    const firstIPv4Decimal = binaryToDecimal(firstIPv4Binary.replace(/\./g, ''));
    const secondIPv4Decimal = binaryToDecimal(secondIPv4Binary.replace(/\./g, ''));
    const subnetMaskDecimal = binaryToDecimal(subnetBinary.replace(/\./g, ''));

    const isInSubnet = (firstIPv4Decimal & subnetMaskDecimal) === (secondIPv4Decimal & subnetMaskDecimal);

    let resultMessage = `
        <p class='result'><strong>IPv4-osoite 1:</strong> ${firstIPv4} (Binääri: ${firstIPv4Binary})</p>
        <p class='result'><strong>IPv4-osoite 2:</strong> ${secondIPv4} (Binääri: ${secondIPv4Binary})</p>
        <p class='result'><strong>Aliverkon maski:</strong> ${subnetMask} (Binääri: ${subnetBinary})</p>
    `;

    if (isInSubnet) {
        resultMessage += `<p class='success-message'>Osoitteet ${firstIPv4} ja ${secondIPv4} ovat samassa aliverkossa.</p>`;
    } else {
        resultMessage += `<p class='error-message'>Osoitteet ${firstIPv4} ja ${secondIPv4} eivät ole samassa aliverkossa.</p>`;
    }

    resultDiv.innerHTML = resultMessage;
}
