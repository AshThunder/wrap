// projects is loaded from data.js (Removed)

const DEFAULT_PFP = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236b7280'%3E%3Cpath d='M24 24H0v-2a10 10 0 1 1 24 0v2zM12 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12z'/%3E%3C/svg%3E";

const state = {
    mode: 'gbu', // 'gbu' or 'gbb'
    slot1: "---",
    slot2: "---",
    slot3: "---",
    username: "username",
    pfp: DEFAULT_PFP
};

const config = {
    gbu: {
        subtitle: "The Good, The Bad & The Ugly",
        labels: ["The Good", "The Bad", "The Ugly"],
        subtitles: ["Bullish", "Mid", "Bearish"],
        colors: ["text-green-400", "text-yellow-400", "text-red-400"],
        cardClasses: ["category-good", "category-bad", "category-ugly"],
        borderClasses: ["border-green-400", "border-yellow-400", "border-red-400"],
        glows: ["bg-green-400/20", "bg-red-400/20"],
        emojis: ["🟢", "🟡", "🔴"]
    },
    gbb: {
        subtitle: "Good, Better, Best",
        labels: ["Good", "Better", "Best"],
        subtitles: ["Solid", "Upgrade", "Top Pick"],
        colors: ["text-amber-400", "text-cyan-400", "text-green-400"],
        cardClasses: ["category-best", "category-better", "category-good"],
        borderClasses: ["border-amber-400", "border-cyan-400", "border-green-400"],
        glows: ["bg-amber-400/20", "bg-green-400/20"],
        emojis: ["🏆", "⭐", "✅"]
    }
};

// Elements
const usernameInput = document.getElementById('usernameInput');
const pfpInput = document.getElementById('pfpInput');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const backBtn = document.getElementById('backBtn');

const selectors = {
    slot1: {
        label: document.getElementById('label1'),
        input: document.getElementById('input1'),
        card: document.getElementById('card-val1'),
        cardLabel: document.getElementById('card-label1'),
        cardSub: document.getElementById('card-sub1'),
        cardBox: document.getElementById('card-box1'),
        cap: {
            val: document.getElementById('cap-card-val1'),
            label: document.getElementById('cap-card-label1'),
            sub: document.getElementById('cap-card-sub1'),
            box: document.getElementById('cap-card-box1')
        }
    },
    slot2: {
        label: document.getElementById('label2'),
        input: document.getElementById('input2'),
        card: document.getElementById('card-val2'),
        cardLabel: document.getElementById('card-label2'),
        cardSub: document.getElementById('card-sub2'),
        cardBox: document.getElementById('card-box2'),
        cap: {
            val: document.getElementById('cap-card-val2'),
            label: document.getElementById('cap-card-label2'),
            sub: document.getElementById('cap-card-sub2'),
            box: document.getElementById('cap-card-box2')
        }
    },
    slot3: {
        label: document.getElementById('label3'),
        input: document.getElementById('input3'),
        card: document.getElementById('card-val3'),
        cardLabel: document.getElementById('card-label3'),
        cardSub: document.getElementById('card-sub3'),
        cardBox: document.getElementById('card-box3'),
        cap: {
            val: document.getElementById('cap-card-val3'),
            label: document.getElementById('cap-card-label3'),
            sub: document.getElementById('cap-card-sub3'),
            box: document.getElementById('cap-card-box3')
        }
    }
};

// Initialize
function init() {
    // Get mode from URL
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    if (mode && config[mode]) {
        state.mode = mode;
    }

    updateUI();
    setupEventListeners();
}

function updateUI() {
    const cfg = config[state.mode];

    // Update subtitle
    document.getElementById('app-subtitle').textContent = cfg.subtitle;

    // Update slots
    ['slot1', 'slot2', 'slot3'].forEach((key, index) => {
        const s = selectors[key];

        // Control labels
        s.label.textContent = cfg.labels[index];
        s.label.className = `text-[10px] font-black uppercase tracking-[0.2em] ${cfg.colors[index]}`;

        // Card labels (Preview)
        if (s.cardLabel) {
            s.cardLabel.textContent = cfg.labels[index];
            s.cardLabel.className = `text-[18px] font-black tracking-[0.5em] uppercase mb-5 opacity-40 ${cfg.colors[index]}`;
        }

        // Card values (Preview)
        if (s.card) {
            s.card.className = `text-3xl md:text-4xl font-black font-heading uppercase tracking-tighter ${cfg.cardClasses[index]}`;
        }

        // Card subtitles (Preview)
        if (s.cardSub) {
            s.cardSub.textContent = cfg.subtitles[index];
            s.cardSub.className = `mt-3 text-[12px] font-black uppercase tracking-[0.3em] opacity-30 ${cfg.colors[index]}`;
        }

        // Card box borders (Preview)
        if (s.cardBox) {
            s.cardBox.className = `w-full flex-grow flex flex-col items-center justify-center glass-premium rounded-[2rem] group-hover:bg-white/[0.02] transition-all ${cfg.borderClasses[index]}/20 group-hover:${cfg.borderClasses[index]}/40 relative overflow-hidden`;
        }

        // CAP Zone Updates
        if (s.cap.label) {
            s.cap.label.textContent = cfg.labels[index];
            s.cap.label.className = `text-[18px] font-black tracking-[0.5em] uppercase mb-5 opacity-40 ${cfg.colors[index]}`;
        }
        if (s.cap.val) {
            s.cap.val.className = `text-4xl font-black font-heading uppercase tracking-tighter ${cfg.cardClasses[index]}`;
        }
        if (s.cap.sub) {
            s.cap.sub.textContent = cfg.subtitles[index];
            s.cap.sub.className = `mt-3 text-[12px] font-black uppercase tracking-[0.3em] opacity-30 ${cfg.colors[index]}`;
        }
        if (s.cap.box) {
            s.cap.box.className = `w-full flex-grow flex flex-col items-center justify-center glass-premium rounded-[2rem] border ${cfg.borderClasses[index]}/20 relative overflow-hidden`;
        }

        // Input hover border
        s.input.className = `w-full bg-black/60 border border-white/10 rounded-xl px-4 py-4 focus:outline-none input-focus transition-all placeholder:text-gray-700 text-white font-bold hover:${cfg.borderClasses[index]}/30`;
    });
}

function updateSlot(slotKey, value) {
    state[slotKey] = value || "---";
    const s = selectors[slotKey];

    if (s.card) s.card.textContent = state[slotKey];
    if (s.cap.val) s.cap.val.textContent = state[slotKey];

    // Pop animation (Preview only)
    if (value && s.cardBox) {
        s.cardBox.style.transform = 'scale(1.05)';
        setTimeout(() => {
            s.cardBox.style.transform = 'scale(1)';
        }, 200);
    }
}

function setupEventListeners() {
    // Slot Inputs
    Object.keys(selectors).forEach(key => {
        selectors[key].input.oninput = (e) => updateSlot(key, e.target.value);
    });

    usernameInput.oninput = (e) => {
        const val = e.target.value || "username";
        state.username = val;
        const u1 = document.getElementById('card-username');
        const u2 = document.getElementById('cap-card-username');
        if (u1) u1.textContent = `@${val}`;
        if (u2) u2.textContent = `@${val}`;
    };

    pfpInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                state.pfp = event.target.result;

                // Update Card Previews
                const p1 = document.getElementById('card-pfp');
                const p2 = document.getElementById('cap-card-pfp');
                if (p1) p1.src = state.pfp;
                if (p2) p2.src = state.pfp;

                // Update Upload UI Success State
                const pfpPrompt = document.getElementById('pfpPrompt');
                const pfpSuccess = document.getElementById('pfpSuccess');
                const pfpPreviewThumb = document.getElementById('pfpPreviewThumb');

                if (pfpPrompt && pfpSuccess && pfpPreviewThumb) {
                    pfpPreviewThumb.src = state.pfp;
                    pfpPrompt.classList.add('hidden');
                    pfpSuccess.classList.remove('hidden');
                    setTimeout(() => {
                        pfpSuccess.classList.remove('opacity-0');
                    }, 10);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    downloadBtn.onclick = async () => {
        if (typeof htmlToImage === 'undefined') {
            alert('Image generation library is still loading. Please wait a moment.');
            return;
        }

        const card = document.getElementById('capture-card');
        if (!card) {
            alert('Capture zone not found.');
            return;
        }

        downloadBtn.disabled = true;
        const originalContent = downloadBtn.innerHTML;
        downloadBtn.textContent = "GENERATING...";

        try {
            // 1. Ensure fonts are ready
            await document.fonts.ready;

            // 2. Ensure PFP image is fully loaded
            const pfpImg = document.getElementById('cap-card-pfp');
            if (pfpImg && pfpImg.src && !pfpImg.src.startsWith('data:image/svg+xml')) {
                if (!pfpImg.complete) {
                    await new Promise((resolve) => {
                        pfpImg.onload = resolve;
                        pfpImg.onerror = resolve;
                    });
                }
            }

            // 3. Safari Warm-up: Call the library once to "wake up" the rendering engine
            // Wrapped in try-catch so it doesn't block the main capture if it fails
            try {
                await htmlToImage.toPng(card, { quality: 0.1, pixelRatio: 1 });
            } catch (e) {
                console.warn('Warm-up failed, proceeding anyway:', e);
            }

            // 4. Increased delay for complex rendering (glassmorphism/gradients)
            await new Promise(resolve => setTimeout(resolve, 500));

            // 5. Actual high-quality capture
            const dataUrl = await htmlToImage.toPng(card, {
                width: 1200,
                height: 675,
                pixelRatio: 2,
                quality: 1,
                backgroundColor: '#050505',
                cacheBust: true
            });

            const link = document.createElement('a');
            link.download = `airdrops-2025-${state.username}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Download failed:', error);
            alert(`Failed to generate image: ${error.message}.`);
        } finally {
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = originalContent;
        }
    };

    shareBtn.onclick = () => {
        const cfg = config[state.mode];
        const text = `My Airdrops 2025 Picks (${cfg.subtitle}):\n\n${cfg.emojis[0]} ${cfg.labels[0]}: ${state.slot1}\n${cfg.emojis[1]} ${cfg.labels[1]}: ${state.slot2}\n${cfg.emojis[2]} ${cfg.labels[2]}: ${state.slot3}\n\nGenerate yours here:`;
        const url = window.location.origin; // Link to landing page (root)
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
    };

    backBtn.onclick = () => {
        window.location.href = 'index.html';
    };

    // Help Modal Logic
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const closeHelpBtn = document.getElementById('closeHelpBtn');

    function toggleHelp(show) {
        if (show) {
            helpModal.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                helpModal.classList.remove('opacity-0');
                helpModal.querySelector('div').classList.remove('scale-95');
                helpModal.querySelector('div').classList.add('scale-100');
            }, 10);
        } else {
            helpModal.classList.add('opacity-0');
            helpModal.querySelector('div').classList.remove('scale-100');
            helpModal.querySelector('div').classList.add('scale-95');
            setTimeout(() => {
                helpModal.classList.add('hidden');
            }, 300);
        }
    }

    if (helpBtn && helpModal && closeHelpBtn) {
        helpBtn.onclick = () => toggleHelp(true);
        closeHelpBtn.onclick = () => toggleHelp(false);
        helpModal.onclick = (e) => {
            if (e.target === helpModal) toggleHelp(false);
        };

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !helpModal.classList.contains('hidden')) {
                toggleHelp(false);
            }
        });
    }
}

// Start
init();
