document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Tab switching if we decide to add panels
});

// Copy to Clipboard with Toast feedback
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Command copied to clipboard");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Toast System
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Image Preview and Upload handling
function previewImage(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('preview-container');
    const previewImg = document.getElementById('preview-img');
    const dropzone = document.getElementById('upload-dropzone');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
            previewContainer.classList.remove('hidden');
            if (dropzone) dropzone.classList.add('hidden');
        }
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    const uploadInput = document.getElementById('screenshot-upload');
    const previewContainer = document.getElementById('preview-container');
    const previewImg = document.getElementById('preview-img');
    const dropzone = document.getElementById('upload-dropzone');

    if (uploadInput) uploadInput.value = '';
    if (previewContainer) previewContainer.classList.add('hidden');
    if (previewImg) previewImg.src = '';
    if (dropzone) dropzone.classList.remove('hidden');
}
