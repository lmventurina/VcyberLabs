// Logic to handle image pasting and uploading in specific zones
document.addEventListener('DOMContentLoaded', () => {
    const imageZones = document.querySelectorAll('.image-zone');

    imageZones.forEach(zone => {
        // Create hidden file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        zone.appendChild(input);

        // Handle Click (Upload)
        zone.addEventListener('click', () => {
            input.click();
        });

        // Handle File Selection
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                displayImage(zone, file);
            }
        });

        // Handle Paste
        zone.addEventListener('paste', (e) => {
            e.preventDefault();
            const items = (e.clipboardData || e.originalEvent.clipboardData).items;
            let blob = null;

            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") === 0) {
                    blob = items[i].getAsFile();
                    break;
                }
            }

            if (blob) {
                displayImage(zone, blob);
            } else {
                alert("No image found in clipboard. Please take a screenshot first, then click the box and press Ctrl+V.");
            }
        });

        // Handle Drag and Drop
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#0056b3';
            zone.style.backgroundColor = '#e7f5ff';
        });

        zone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#adb5bd';
            zone.style.backgroundColor = '#f8f9fa';
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#adb5bd';
            zone.style.backgroundColor = '#f8f9fa';

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                displayImage(zone, e.dataTransfer.files[0]);
            }
        });
    });

    function displayImage(zone, file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            // Keep the input definition but remove text/other content
            const input = zone.querySelector('input[type="file"]');
            zone.innerHTML = '';
            if (input) zone.appendChild(input); // Re-append input

            zone.classList.add('has-image');

            // Create image element
            const img = document.createElement('img');
            img.src = event.target.result;
            zone.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    // --- Local Storage Saving ---
    function saveProgress() {
        const inputs = document.querySelectorAll('input, textarea, select');
        const data = {};

        inputs.forEach((input, index) => {
            // Create a unique key for each input based on its ID or index if ID is missing
            const key = input.id || `input_${index}`;

            if (input.type === 'checkbox' || input.type === 'radio') {
                if (input.checked) {
                    data[key] = input.value;
                    // For radio buttons sharing a name, we need to save which one is checked
                    if (input.name) {
                        data[input.name] = input.value;
                    }
                }
            } else if (input.type !== 'file') { // Don't save files
                data[key] = input.value;
            }
        });

        // Use the page URL as a namespace to separate data for different labs
        const pageKey = window.location.pathname;
        localStorage.setItem(pageKey, JSON.stringify(data));

        // Optional: Show a subtle "Saved" indicator (can be implemented later)
        console.log('Progress saved for', pageKey);
    }

    function loadProgress() {
        const pageKey = window.location.pathname;
        const storedData = localStorage.getItem(pageKey);

        if (storedData) {
            const data = JSON.parse(storedData);
            const inputs = document.querySelectorAll('input, textarea, select');

            inputs.forEach((input, index) => {
                const key = input.id || `input_${index}`;

                if (input.type === 'checkbox') {
                    if (data[key] === input.value) {
                        input.checked = true;
                    }
                } else if (input.type === 'radio') {
                    // For radios, check if the saved value for the group name matches this input's value
                    if (input.name && data[input.name] === input.value) {
                        input.checked = true;
                    }
                } else if (input.type !== 'file') {
                    if (data[key] !== undefined) {
                        input.value = data[key];
                    }
                }
            });
            console.log('Progress loaded for', pageKey);
        }
    }

    // Attach event listeners to save on change
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', saveProgress);
        input.addEventListener('change', saveProgress);
    });

    // Load progress on load
    loadProgress();

});

// PDF Export Functionality
// Reference Panel Logic
function toggleReference() {
    const panel = document.getElementById('reference-panel');
    const overlay = document.getElementById('reference-overlay');

    if (panel && overlay) {
        panel.classList.toggle('open');
        overlay.classList.toggle('open');
    }
}

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
    // Existing image logic...

    // Create Overlay if not exists
    if (!document.getElementById('reference-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'reference-overlay';
        overlay.className = 'reference-overlay';
        overlay.onclick = toggleReference;
        document.body.appendChild(overlay);
    }
});

// PDF Export Functionality
async function downloadPDF() {
    const controls = document.querySelector('.controls');
    const container = document.querySelector('.container');
    const panel = document.getElementById('reference-panel'); // Ensure panel is ignored

    // ... rest of PDF logic ...
    const originalButtonText = controls.querySelector('button').innerText;

    // Load library if not present
    if (typeof html2pdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.head.appendChild(script);

        // Show loading state
        controls.querySelector('button').innerText = 'Loading Library...';

        await new Promise(resolve => script.onload = resolve);
    }

    // Configure options
    const opt = {
        margin: 0.15,
        filename: document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Hide controls for capture
    controls.style.display = 'none';

    // Apply PDF specific styles
    container.classList.add('pdf-export-mode');

    // Generate PDF
    try {
        await html2pdf().set(opt).from(container).save();
    } catch (err) {
        console.error('PDF generation failed:', err);
        alert('Failed to generate PDF. Please try "Ctrl+P" as a backup.');
    } finally {
        // Restore controls and styles
        controls.style.display = 'flex';
        controls.querySelector('button').innerText = originalButtonText;
        container.classList.remove('pdf-export-mode');
    }
}
