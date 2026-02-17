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
        margin: [10, 10, 10, 10],
        filename: document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Hide controls for capture
    controls.style.display = 'none';

    // Generate PDF
    try {
        await html2pdf().set(opt).from(container).save();
    } catch (err) {
        console.error('PDF generation failed:', err);
        alert('Failed to generate PDF. Please try "Ctrl+P" as a backup.');
    } finally {
        // Restore controls
        controls.style.display = 'flex';
        controls.querySelector('button').innerText = 'Export PDF';
    }
}
