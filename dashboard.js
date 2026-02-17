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
    {
        id: 1,
        title: "The CIA Triad & Password Security",
        subtitle: "Confidentiality • Integrity • Hashing",
        active: true,
        labs: [
            {
                title: "The CIA Triad",
                id: "1.2.2",
                url: "labs/u01/cia-triad.html",
                icon: "shield",
                desc: "Explore the three pillars of information security: Confidentiality, Integrity, and Availability."
            },
            {
                title: "Password Security",
                id: "1.3.1",
                url: "labs/u01/password-security.html",
                icon: "key",
                desc: "Test password strength and learn about hashing, salting, and entropy."
            }
        ]
    },
    {
        id: 2,
        title: "Malicious Code & Sys Admin",
        subtitle: "CLI Basics • Cracking • VM Access",
        active: true,
        labs: [
            {
                title: "Terminus Game (Pt 1)",
                id: "2.1.2",
                url: "labs/u02/terminus-part1.html",
                icon: "gamepad-2",
                desc: "Learn basic shell commands through an interactive text-based adventure."
            },
            {
                title: "Password Cracking with JtR",
                id: "2.2.3",
                url: "labs/u02/password-cracking-jtr.html",
                icon: "unlock",
                desc: "Use John the Ripper to crack password hashes and understand brute-force attacks."
            },
            {
                title: "Windows CLI Basics",
                id: "2.3.1",
                url: "labs/u02/windows-cli-basics.html",
                icon: "terminal",
                desc: "Navigate the Windows Command Prompt and perform system administration tasks."
            },
            {
                title: "Linux Command Reference",
                id: "2.3.2",
                url: "labs/u02/linux-command-reference.html",
                icon: "file-code",
                desc: "A comprehensive guide to essential Linux commands for file management and system control."
            },
            {
                title: "Accessing the VM",
                id: "2.3.3",
                url: "labs/u02/vm-access-setup.html",
                icon: "monitor",
                desc: "Setup and configure access to the virtual lab environment."
            }
        ]
    },
    {
        id: 3,
        title: "Social Engineering",
        subtitle: "Phishing • SET Tool • Cloning",
        active: true,
        labs: [
            {
                title: "Social Engineering Toolkit",
                id: "3.2.3",
                url: "labs/u03/social-engineering-toolkit.html",
                icon: "users",
                desc: "Use SET to simulate credential harvesting attacks and site cloning."
            }
        ]
    },
    {
        id: 4,
        title: "System Security & Analysis",
        subtitle: "Vuln Scanning • Mitigation • MBSA",
        active: true,
        labs: [
            {
                title: "MBSA Vulnerability Scan",
                id: "4.1.2",
                url: "labs/u04/mbsa-scan.html",
                icon: "shield-check",
                desc: "Scan Windows 7 with Microsoft Baseline Security Analyzer and mitigate vulnerabilities."
            }
        ]
    },
    {
        id: 5,
        title: "Data Representation & Cryptography Concepts",
        subtitle: "Encoding • Steganography • Analysis",
        active: true,
        labs: [
            {
                title: "Decoding with CTF Challenges",
                id: "4.1.3",
                url: "labs/u05/decoding-ctf.html",
                icon: "lock",
                desc: "Solve picoCTF challenges using various decoding techniques (Hex, Binary, Base64)."
            },
            {
                title: "Steganography CTF",
                id: "4.2.2",
                url: "labs/u05/steganography-ctf.html",
                icon: "image",
                desc: "Use Okteta, Exiftool, Binwalk, and Steghide to find hidden flags in images."
            }
        ]
    },
    {
        id: 6,
        title: "Advanced Command Line & Scripting",
        subtitle: "Grep • Scripting • Piping • Regex",
        active: true,
        labs: [
            {
                title: "Advanced Linux CLI",
                id: "4.3.1",
                url: "labs/u06/advanced-linux-cli.html",
                icon: "terminal",
                desc: "Master advanced CLI commands: paths, redirection, and piping."
            },
            {
                title: "Searching with Grep",
                id: "4.3.1b",
                url: "labs/u06/grep-searching.html",
                icon: "search",
                desc: "Use grep with regex to find patterns in files."
            },
            {
                title: "Terminus Game (Pt 2)",
                id: "4.3.1c",
                url: "labs/u06/terminus-part2.html",
                icon: "map",
                desc: "Navigate the Terminus adventure game using Linux commands."
            },
            {
                title: "Scripting in Linux",
                id: "4.3.2",
                url: "labs/u06/linux-scripting.html",
                icon: "code",
                desc: "Write and execute simple Bash scripts."
            },
            {
                title: "CLI for Networking",
                id: "8.1.1",
                url: "labs/u06/cli-networking.html",
                icon: "wifi",
                desc: "Use ifconfig, ping, ssh, nc, and netstat for network recon."
            }
        ]
    },
    {
        id: 7,
        title: "Networking Fundamentals",
        subtitle: "Hardware • Wireshark • PCAP",
        active: true,
        labs: [
            {
                title: "Installing PC Components",
                id: "5.1.1",
                url: "labs/u07/installing-pc-components.html",
                icon: "cpu",
                desc: "Identify and install key hardware components on a Desktop computer motherboard."
            },
            {
                title: "ARP with Wireshark",
                id: "5.2.2",
                url: "labs/u07/arp-wireshark.html",
                icon: "activity",
                desc: "Use Wireshark to capture and analyze ARP packets and understand network resolution."
            },
            {
                title: "Packet Analysis",
                id: "5.3.2",
                url: "labs/u07/packet-analysis.html",
                icon: "file-search",
                desc: "Deep dive into PCAP analysis to find credentials, malicious commands, and hidden flags."
            }
        ]
    },
    {
        id: 8,
        title: "Ethics & Reconnaissance",
        subtitle: "WHOIS • DNS • Nmap Scanning",
        active: true,
        labs: [
            {
                title: "Recon with WHOIS",
                id: "7.2.1",
                url: "labs/u08/recon-whois.html",
                icon: "search",
                desc: "Practice performing reconnaissance using the WHOIS tool to gather domain information."
            },
            {
                title: "Using nslookup",
                id: "7.2.2",
                url: "labs/u08/nslookup.html",
                icon: "globe",
                desc: "Learn to use nslookup interactively and non-interactively to query DNS records."
            },
            {
                title: "Nmap & Zenmap Scanning",
                id: "7.3.2",
                url: "labs/u08/nmap-scanning.html",
                icon: "radar",
                desc: "Use Nmap and Zenmap to scan networks, identify devices, and detect open ports."
            }
        ]
    },
    {
        id: 9,
        title: "Network Attacks and Penetration Testing",
        subtitle: "Spoofing • Metasploit • Mimikatz",
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
    {
        id: 10,
        title: "Web Application Security",
        subtitle: "SQL Injection • XSS • Cookies",
        active: true,
        labs: [
            {
                title: "Exploring Developer Tools",
                id: "9.1.1",
                url: "labs/u10/developer-tools.html",
                icon: "code",
                desc: "Learn to use browser developer tools to inspect and modify web page elements."
            },
            {
                title: "Cookie Manipulation",
                id: "9.2.1",
                url: "labs/u10/cookie-manipulation.html",
                icon: "cookie",
                desc: "Understand session management and how cookie manipulation can lead to privilege escalation."
            },
            {
                title: "Command Injection & XSS",
                id: "9.2.2",
                url: "labs/u10/command-injection.html",
                icon: "terminal",
                desc: "Execute arbitrary commands and inject scripts into vulnerable web applications."
            },
            {
                title: "Basic SQL Commands",
                id: "9.3.1",
                url: "labs/u10/sql-basics.html",
                icon: "database",
                desc: "Master fundamental SQL queries to interact with and manage databases."
            },
            {
                title: "Exploring SQL Injection",
                id: "9.3.2",
                url: "labs/u10/sql-injection.html",
                icon: "shield-alert",
                desc: "Exploit SQL injection vulnerabilities to bypass authentication and extract data."
            }
        ]
    },
    {
        id: 11,
        title: "Applied Cryptography & Secure Communications",
        subtitle: "SSL Decryption • PCAP Analysis",
        active: true,
        labs: [
            {
                title: "Decrypting SSL",
                id: "10.2.1",
                url: "labs/u11/decrypting-ssl.html",
                icon: "unlock",
                desc: "Analyze PCAP files to recover session keys and decrypt SSL/TLS traffic."
            }
        ]
    }
];

// UI Generator
function renderUnits() {
    const grid = document.getElementById('unit-grid');
    if (!grid) return;

    grid.innerHTML = UNITS.map(unit => `
        <div class="unit-card glass-panel p-8 ${unit.active ? 'border-[#385CC3]/20 ring-1 ring-[#385CC3]/10' : 'opacity-60 hover:opacity-100 transition-opacity bg-[#f8f9fa]'} flex flex-col justify-between">
            <div class="unit-badge ${unit.active ? '!text-[#ffffff] !border-[#385CC3] !bg-[#385CC3]' : 'text-[#555] border-[#ccc]'}">UNIT ${String(unit.id).padStart(2, '0')}</div>
            
            <button 
                id="unit-toggle-${unit.id}"
                type="button"
                class="w-full text-left mb-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#385CC3] rounded-lg p-2 -ml-2 transition-colors hover:bg-[#385CC3]/5" 
                onclick="toggleUnit(${unit.id})"
                aria-expanded="false"
                aria-controls="labs-container-${unit.id}"
            >
                <div class="flex justify-between items-start pointer-events-none">
                    <div>
                        <h3 class="text-xl font-bold ${unit.active ? 'text-[#385CC3]' : 'text-[#555]'} mb-2">${unit.title}</h3>
                        <p class="text-[10px] ${unit.active ? 'text-[#e85d04] font-mono' : 'text-[#777]'} uppercase tracking-widest pb-2 font-bold">${unit.subtitle}</p>
                    </div>
                    <i data-lucide="chevron-down" id="chevron-${unit.id}" class="w-5 h-5 text-[#385CC3] transition-transform duration-300"></i>
                </div>
            </button>
            
            <div id="labs-container-${unit.id}" class="labs-container space-y-4">
                <div class="pt-4 border-t border-[#385CC3]/10">
                ${unit.labs.length > 0 ? unit.labs.map(lab => `
                    <a href="${lab.url}" class="lab-card group bg-white border border-[#ced4da] p-4 rounded-xl flex items-center justify-between relative overflow-hidden mb-3 last:mb-0 focus:outline-none focus:ring-2 focus:ring-[#385CC3] focus:ring-offset-2 focus:ring-offset-[#E0D9CF] hover:border-[#385CC3] hover:shadow-md transition-all">
                        <i data-lucide="${lab.icon}" class="absolute -bottom-2 -right-2 w-16 h-16 text-[#385CC3]/5 group-hover:text-[#385CC3]/10 transition-colors"></i>
                        <div class="flex items-center gap-4 z-10">
                            <div class="w-10 h-10 bg-[#385CC3]/10 rounded-lg flex items-center justify-center border border-[#385CC3]/20 shrink-0">
                                <i data-lucide="${lab.icon}" class="text-[#385CC3] w-5 h-5"></i>
                            </div>
                            <h4 class="text-sm font-bold text-[#292B27] group-hover:text-[#385CC3] transition-colors">${lab.title}</h4>
                        </div>
                        <div class="z-10">
                            <i data-lucide="chevron-right" class="w-5 h-5 text-[#ccc] group-hover:text-[#385CC3] transition-colors"></i>
                        </div>
                    </a>
                `).join('') : `
                    <div class="flex items-center justify-center py-10 border-2 border-dashed border-[#ccc] rounded-xl bg-[#f8f9fa]">
                        <div class="text-center">
                            <i data-lucide="lock" class="w-8 h-8 text-[#999] mx-auto mb-3"></i>
                            <p class="text-[9px] font-black text-[#999] uppercase tracking-widest">${unit.id < 9 ? 'In Development' : 'Reserved Space'}</p>
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
