// Global System Utility
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast("Command copied to clipboard");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
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

// Curriculum Data
const UNITS = [
    { id: 1, title: "Introduction to Cybersecurity & Authentication", subtitle: "Foundational Research", labs: [] },
    { id: 2, title: "Malicious Code & Secure Environment", subtitle: "Foundational Research", labs: [] },
    { id: 3, title: "The Human Element Social Engineering & OSINT", subtitle: "Foundational Research", labs: [] },
    { id: 4, title: "System Security & Hardening", subtitle: "Foundational Research", labs: [] },
    { id: 5, title: "Data Representation & Cryptography Concepts", subtitle: "Foundational Research", labs: [] },
    { id: 6, title: "Advanced Command Line & Scripting", subtitle: "Foundational Research", labs: [] },
    { id: 7, title: "Networking Fundamentals", subtitle: "Foundational Research", labs: [] },
    { id: 8, title: "Ethics & Reconnaissance", subtitle: "Foundational Research", labs: [] },
    {
        id: 9,
        title: "Network Attacks and Penetration Testing",
        subtitle: "Active Lab Sequence",
        active: true,
        labs: [
            {
                title: "SYN Flood Attack",
                id: "8.1.2",
                url: "labs/u09/syn-flood.html",
                icon: "zap",
                desc: "Explore the mechanics of TCP handshake exploitation and resource exhaustion through SYN flooding."
            },
            {
                title: "ARP Spoofing & AiTM",
                id: "8.2.1",
                url: "labs/u09/arp-spoofing.html",
                icon: "network",
                desc: "Analyze ARP vulnerabilities and execute Man-in-the-Middle attacks to intercept traffic."
            },
            {
                title: "SSH Tunneling",
                id: "8.3.1",
                url: "labs/u09/ssh-tunneling.html",
                icon: "lock",
                desc: "Bypass firewall restrictions and secure traffic using local and remote SSH port forwarding."
            },
            {
                title: "Metasploit Framework",
                id: "8.4.1",
                url: "labs/u09/metasploit.html",
                icon: "terminal-square",
                desc: "Master the world's most used penetration testing framework to scan and exploit targets."
            },
            {
                title: "Exfiltration with Mimikatz",
                id: "8.4.2",
                url: "labs/u09/mimikatz.html",
                icon: "cat",
                desc: "Extract plaintext passwords, hashes, and Kerberos tickets from memory using Mimikatz."
            },
            {
                title: "Hunting a Backdoor",
                id: "8.4.3",
                url: "labs/u09/hunting-backdoor.html",
                icon: "crosshair",
                desc: "Investigate compromised systems to identify and remove persistent backdoor mechanisms."
            }
        ]
    },
    { id: 10, title: "Web Application Security", subtitle: "Tier 2 Research", labs: [] },
    { id: 11, title: "Applied Cryptography & Secure Communications", subtitle: "Tier 2 Research", labs: [] }
];

// UI Generator
function renderUnits() {
    const grid = document.getElementById('unit-grid');
    if (!grid) return;

    grid.innerHTML = UNITS.map(unit => `
        <div class="unit-card glass-panel p-8 ${unit.active ? 'border-[#023047]/20 ring-1 ring-[#023047]/10' : 'opacity-40 hover:opacity-60 transition-opacity'} flex flex-col justify-between">
            <div class="unit-badge ${unit.active ? '!text-[#023047] !border-[#023047]/40 !bg-[#8ecae6]' : ''}">UNIT ${String(unit.id).padStart(2, '0')}</div>
            
            <button 
                id="unit-toggle-${unit.id}"
                type="button"
                class="w-full text-left mb-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#fb8500] rounded-lg p-2 -ml-2 transition-colors hover:bg-[#023047]/5" 
                onclick="toggleUnit(${unit.id})"
                aria-expanded="false"
                aria-controls="labs-container-${unit.id}"
            >
                <div class="flex justify-between items-start pointer-events-none">
                    <div>
                        <h3 class="text-xl font-bold ${unit.active ? 'text-[#023047]' : 'text-slate-500'} mb-2">${unit.title}</h3>
                        <p class="text-[10px] ${unit.active ? 'text-[#219ebc] font-mono' : 'text-slate-500'} uppercase tracking-widest pb-2">${unit.subtitle}</p>
                    </div>
                    <i data-lucide="chevron-down" id="chevron-${unit.id}" class="w-5 h-5 text-slate-500 transition-transform duration-300"></i>
                </div>
            </button>
            
            <div id="labs-container-${unit.id}" class="labs-container space-y-4">
                <div class="pt-4 border-t border-[#023047]/10">
                ${unit.labs.length > 0 ? unit.labs.map(lab => `
                    <a href="${lab.url}" class="lab-card group bg-white/60 border border-[#023047]/10 p-5 rounded-2xl block relative overflow-hidden mb-4 last:mb-0 focus:outline-none focus:ring-2 focus:ring-[#fb8500] focus:ring-offset-2 focus:ring-offset-[#CFCFCF]">
                        <i data-lucide="${lab.icon}" class="absolute -bottom-2 -right-2 w-16 h-16 text-[#023047]/5 group-hover:text-[#023047]/10 transition-colors"></i>
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-8 h-8 bg-[#fb8500]/20 rounded-lg flex items-center justify-center border border-[#fb8500]/30">
                                <i data-lucide="${lab.icon}" class="text-[#fb8500] w-4 h-4"></i>
                            </div>
                            <span class="text-[9px] font-mono text-[#fb8500]/80 uppercase tracking-widest">Lab ${lab.id}</span>
                        </div>
                        <h4 class="text-sm font-bold text-[#023047] group-hover:text-[#219ebc] transition-colors">${lab.title}</h4>
                        <div class="mt-4 flex items-center justify-between">
                            <span class="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
                            </span>
                            <i data-lucide="chevron-right" class="w-4 h-4 text-[#023047]"></i>
                        </div>
                    </a>
                `).join('') : `
                    <div class="flex items-center justify-center py-10 border-2 border-dashed border-[#023047]/10 rounded-xl bg-black/5">
                        <div class="text-center">
                            <i data-lucide="lock" class="w-8 h-8 text-slate-600 mx-auto mb-3"></i>
                            <p class="text-[9px] font-black text-slate-600 uppercase tracking-widest">${unit.id < 9 ? 'In Development' : 'Reserved Space'}</p>
                        </div>
                    </div>
                `}
                </div>
            </div>
        </div>
    `).join('');

    // Refresh icons after render
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function toggleUnit(unitId) {
    const container = document.getElementById(`labs-container-${unitId}`);
    const chevron = document.getElementById(`chevron-${unitId}`);
    const button = document.getElementById(`unit-toggle-${unitId}`);

    if (container) {
        container.classList.toggle('expanded');

        // Update ARIA state
        if (button) {
            const isExpanded = container.classList.contains('expanded');
            button.setAttribute('aria-expanded', isExpanded);
        }
    }

    if (chevron) {
        chevron.classList.toggle('rotate-180');
    }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
    // Render curriculum if on dashboard
    renderUnits();

    // Initialize icons globally
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
