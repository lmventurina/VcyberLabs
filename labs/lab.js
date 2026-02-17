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
