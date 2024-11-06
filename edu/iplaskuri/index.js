function loadContent(page) {
    const mainContent = document.getElementById('mainContent');
    
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            // Dynamically load any additional JS file required by the calculator page
            if (page === 'ipv4_to_binary.html') {
                loadScript('ipv4_converter.js');
            } else if (page === 'eight_bit_converter.html') {
                loadScript('eight_bit_converter.js');
            } else if (page === 'binary_to_decimal.html') {
                loadScript('binary_to_decimal.js');
            }
        })
        .catch(error => {
            mainContent.innerHTML = '<p>Error loading content.</p>';
            console.error(error);
        });
}

// Function to dynamically load a script file
function loadScript(scriptSrc) {
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existingScript) {
        existingScript.remove();  // Remove existing script if already loaded to reload the content
    }
    const script = document.createElement('script');
    script.src = scriptSrc;
    document.body.appendChild(script);
}