function convertToBinary() {
    const ipv4 = document.getElementById('ipv4Input').value;
    const resultDiv = document.getElementById('result');
    
    const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ipv4.match(ipv4Pattern);

    if (!match) {
        resultDiv.innerHTML = "Virhe: Syötä IPv4-osoite muodossa 255.255.255.255";
        return;
    }

    const octets = match.slice(1, 5).map(Number);
    for (let i = 0; i < octets.length; i++) {
        if (octets[i] < 0 || octets[i] > 255) {
            resultDiv.innerHTML = `Virhe: Oktetin ${i + 1} arvo (${octets[i]}) ei ole välillä 0–255.`;
            return;
        }
    }

    const firstOctet = octets[0];
    let ipClass;
    let classDescription;

    if (firstOctet >= 1 && firstOctet <= 126) {
        ipClass = "A";
        classDescription = "Luokka A (1-126): Luokkaa käytetään suurissa verkoissa.";
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        ipClass = "B";
        classDescription = "Luokka B (128-191): Luokkaa käytetään keskikokoisissa verkoissa.";
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        ipClass = "C";
        classDescription = "Luokka C (192-223): Luokkaa käytetään pienissä verkoissa.";
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        ipClass = "D (Multicast)";
        classDescription = "Luokka D (224-239): Luokka varattu multicast-ryhmille.";
    } else if (firstOctet >= 240 && firstOctet <= 255) {
        ipClass = "E (Experimental)";
        classDescription = "Luokka E (240-255): Luokka varattu kokeelliseen käyttöön.";
    } else {
        ipClass = "Varattu tai virheellinen luokka";
        classDescription = "Varattu tai virheellinen luokka.";
    }

    let stepByStep = "<p>Muunnosvaiheet:</p><ul>";
    const binaryOctets = octets.map((octet, index) => {
        const binaryOctet = octet.toString(2).padStart(8, '0');
        stepByStep += `<li>Oktetti ${index + 1} (${octet}) binäärinä: ${binaryOctet}</li>`;
        return binaryOctet;
    });

    const binaryAddress = binaryOctets.join('.');
    stepByStep += `</ul><p>Lopullinen binäärimuoto:<br><strong> ${binaryAddress}</strong></p>`;
    stepByStep += `<p>IP-osoite kuuluu luokkaan: <strong>${ipClass}</strong></p>`;
    stepByStep += `<p>Luokka määräytyy ensimmäisen oktetin perusteella desimaalimuodossa. ${classDescription}</p>`;
    
    resultDiv.innerHTML = stepByStep;
    resultDiv.style.display = 'block'; // Show the result div with the conversion result
}