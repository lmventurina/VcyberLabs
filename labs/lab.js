// Logic to handle image pasting in specific zones
document.addEventListener('DOMContentLoaded', () => {
    const imageZones = document.querySelectorAll('.image-zone');

    imageZones.forEach(zone => {
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
                const reader = new FileReader();
                reader.onload = (event) => {
                    // Clear current content
                    zone.innerHTML = '';
                    zone.classList.add('has-image');

                    // Create image element
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    zone.appendChild(img);
                };
                reader.readAsDataURL(blob);
            } else {
                alert("No image found in clipboard. Please take a screenshot first, then click the box and press Ctrl+V.");
            }
        });

        // Focus styling assistance
        zone.addEventListener('focus', () => {
            zone.style.borderColor = '#0056b3';
        });
        zone.addEventListener('blur', () => {
            if (!zone.classList.contains('has-image')) {
                zone.style.borderColor = '#adb5bd';
            }
        });
    });
});

// PDF Export Functionality
async function downloadPDF() {
    const controls = document.querySelector('.controls');
    const container = document.querySelector('.container');
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
