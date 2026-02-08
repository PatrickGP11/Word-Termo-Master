// --- CONFIGURAÇÃO GLOBAL ---
const MODES = {
    termo: { name: 'TERMO', boards: 1, attempts: 6 },
    dueto: { name: 'DUETO', boards: 2, attempts: 7 },
    quarteto: { name: 'QUARTETO', boards: 4, attempts: 9 }
};

let currentMode = 'termo';
let secretWords = [];
let boardStates = [];
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;
let stats = { played: 0, wins: 0, streak: 0, maxStreak: 0, distribution: [0, 0, 0, 0, 0, 0, 0, 0, 0] };

// --- ELEMENTOS ---
const gameArea = document.getElementById("game-area");
const keyboard = document.getElementById("keyboard-container");
const gameLogo = document.getElementById("game-logo");
const toastContainer = document.getElementById("toast-container");
const themeSelect = document.getElementById("theme-select");
const keysLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

// Menus e Modais
const topMenu = document.getElementById("top-menu");
const menuBtn = document.getElementById("menu-btn");
const modeLinks = {
    termo: document.getElementById("mode-termo"),
    dueto: document.getElementById("mode-dueto"),
    quarteto: document.getElementById("mode-quarteto")
};

// --- INICIALIZAÇÃO ---
function init() {
    loadStats();
    loadPreferences();
    loadThemes();
    setupModals();
    setupMenu();
    startGame(currentMode);
    document.addEventListener("keydown", handlePhysicalKeyboard);
}

// --- SETUP VISUAL ---
function setupMenu() {
    menuBtn.addEventListener("click", () => topMenu.classList.toggle("hidden"));

    Object.keys(modeLinks).forEach(mode => {
        modeLinks[mode].addEventListener("click", (e) => {
            e.preventDefault();
            switchMode(mode);
        });
    });
}

function setupModals() {
    const modals = {
        help: document.getElementById("help-modal"),
        stats: document.getElementById("stats-modal"),
        settings: document.getElementById("settings-modal")
    };

    document.getElementById("help-btn").onclick = () => modals.help.classList.remove("hidden");
    document.getElementById("stats-btn").onclick = () => { updateStatsUI(); modals.stats.classList.remove("hidden"); };
    document.getElementById("settings-btn").onclick = () => modals.settings.classList.remove("hidden");

    // Botão Fechar de todos os modais
    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.onclick = (e) => e.target.closest(".modal-overlay").classList.add("hidden");
    });

    // Reiniciar no Modal de Stats
    document.getElementById("modal-restart-btn").onclick = () => {
        modals.stats.classList.add("hidden");
        startGame(currentMode);
    };

    // Toggle Contraste
    const toggleContrast = document.getElementById("toggle-contrast");
    toggleContrast.addEventListener("change", (e) => {
        document.body.classList.toggle("high-contrast", e.target.checked);
        localStorage.setItem("termo_high_contrast", e.target.checked);
    });
}

function loadPreferences() {
    if (localStorage.getItem("termo_high_contrast") === "true") {
        document.body.classList.add("high-contrast");
        document.getElementById("toggle-contrast").checked = true;
    }
}

function switchMode(mode) {
    Object.values(modeLinks).forEach(link => link.classList.remove("active"));
    modeLinks[mode].classList.add("active");
    topMenu.classList.add("hidden");
    startGame(mode);
}

// --- JOGO ---
function startGame(mode) {
    currentMode = mode;
    currentRow = 0;
    currentTile = 0;
    isGameOver = false;

    const config = MODES[mode];
    gameLogo.textContent = config.name;
    gameArea.className = `mode-${mode}`;

    // Palavras
    const allWords = (typeof wordDatabase !== 'undefined') ? Object.values(wordDatabase).flat() : ["TERMO", "DUETO", "TESTE", "JOGOS"];
    secretWords = [];
    boardStates = [];

    for (let i = 0; i < config.boards; i++) {
        const w = allWords[Math.floor(Math.random() * allWords.length)].toUpperCase();
        secretWords.push(removeAccents(w));
        boardStates.push({ solved: false });
    }

    console.log(`Modo: ${mode}`, secretWords);

    createBoardsUI(config);
    createKeyboard();
}

function createBoardsUI(config) {
    gameArea.innerHTML = "";
    for (let b = 0; b < config.boards; b++) {
        const boardDiv = document.createElement("div");
        boardDiv.className = "board-container";
        boardDiv.id = `board-${b}`;

        for (let r = 0; r < config.attempts; r++) {
            const row = document.createElement("div");
            row.className = "row";
            row.id = `board-${b}-row-${r}`;
            for (let t = 0; t < 5; t++) {
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.id = `board-${b}-row-${r}-tile-${t}`;
                row.appendChild(tile);
            }
            boardDiv.appendChild(row);
        }
        gameArea.appendChild(boardDiv);
    }
}

function createKeyboard() {
    keyboard.innerHTML = "";
    keysLayout.forEach((rowKeys, idx) => {
        const row = document.createElement("div");
        row.className = "keyboard-row";
        if (idx === 2) { const e = createKey("ENTER", true); e.onclick = checkGuess; row.appendChild(e); }
        for (let char of rowKeys) { const k = createKey(char); k.onclick = () => addLetter(char); row.appendChild(k); }
        if (idx === 2) { const bk = createKey("⌫", true); bk.onclick = deleteLetter; row.appendChild(bk); }
        keyboard.appendChild(row);
    });
}
function createKey(char, wide = false) {
    const k = document.createElement("div"); k.textContent = char; k.className = `key ${wide ? "wide" : ""}`; k.dataset.key = char; return k;
}

// --- INPUTS ---
function handlePhysicalKeyboard(e) {
    if (isGameOver) return;
    const key = e.key.toUpperCase();
    if (key === "ENTER") checkGuess();
    else if (key === "BACKSPACE") deleteLetter();
    else if (/^[A-Z]$/.test(key)) addLetter(key);
}

function addLetter(l) {
    if (currentTile < 5 && currentRow < MODES[currentMode].attempts) {
        for (let b = 0; b < MODES[currentMode].boards; b++) {
            if (!boardStates[b].solved) {
                const t = document.getElementById(`board-${b}-row-${currentRow}-tile-${currentTile}`);
                if (t) { t.textContent = l; t.setAttribute("data-state", "active"); }
            }
        }
        currentTile++;
    }
}

function deleteLetter() {
    if (currentTile > 0) {
        currentTile--;
        for (let b = 0; b < MODES[currentMode].boards; b++) {
            if (!boardStates[b].solved) {
                const t = document.getElementById(`board-${b}-row-${currentRow}-tile-${currentTile}`);
                if (t) { t.textContent = ""; t.removeAttribute("data-state"); }
            }
        }
    }
}

// --- VERIFICAÇÃO ---
function checkGuess() {
    if (currentTile < 5) { showToast("Palavra muito curta"); return; }

    // Obter palavra digitada (do primeiro board ativo)
    let guess = "";
    let activeIdx = boardStates.findIndex(s => !s.solved);
    if (activeIdx === -1) activeIdx = 0;

    for (let i = 0; i < 5; i++) {
        guess += document.getElementById(`board-${activeIdx}-row-${currentRow}-tile-${i}`).textContent;
    }

    // Verificar cada tabuleiro
    for (let b = 0; b < MODES[currentMode].boards; b++) {
        if (boardStates[b].solved) continue;

        const sArr = secretWords[b].split("");
        const gArr = guess.split("");
        const res = Array(5).fill("absent");

        // Verdes
        for (let i = 0; i < 5; i++) {
            if (gArr[i] === sArr[i]) { res[i] = "correct"; sArr[i] = null; gArr[i] = null; }
        }
        // Amarelos
        for (let i = 0; i < 5; i++) {
            if (gArr[i] && sArr.includes(gArr[i])) { res[i] = "present"; sArr[sArr.indexOf(gArr[i])] = null; }
        }

        applyColors(b, currentRow, res);

        if (guess === secretWords[b]) {
            boardStates[b].solved = true;
            document.getElementById(`board-${b}`).classList.add("solved");
        }
    }

    const allSolved = boardStates.every(s => s.solved);
    const maxAtt = MODES[currentMode].attempts;

    if (allSolved) {
        updateStats(true);
        setTimeout(() => { showToast("🏆 VENCEDOR!"); document.getElementById("stats-btn").click(); }, 1500);
        isGameOver = true;
    } else if (currentRow >= maxAtt - 1) {
        updateStats(false);
        setTimeout(() => { showToast("Fim! Eram: " + secretWords.join(", ")); document.getElementById("stats-btn").click(); }, 1500);
        isGameOver = true;
    } else {
        currentRow++;
        currentTile = 0;
    }
}

function applyColors(b, r, colors) {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`board-${b}-row-${r}-tile-${i}`);
        setTimeout(() => {
            tile.classList.add("flip", colors[i]);
            updateKey(tile.textContent, colors[i]);
        }, i * 200);
    }
}

function updateKey(char, color) {
    const k = document.querySelector(`.key[data-key="${char}"]`);
    if (!k) return;
    const priority = { "correct": 3, "present": 2, "absent": 1, "": 0 };
    const cur = k.classList.contains("correct") ? "correct" : k.classList.contains("present") ? "present" : k.classList.contains("absent") ? "absent" : "";
    if (priority[color] > priority[cur]) {
        k.classList.remove("absent", "present", "correct");
        k.classList.add(color);
    }
}

// --- STATS E UTILS ---
function loadStats() {
    const s = localStorage.getItem("termo_stats");
    if (s) stats = JSON.parse(s);
}
function updateStats(won) {
    stats.played++;
    if (won) {
        stats.wins++;
        stats.streak++;
        if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
        if (currentRow < stats.distribution.length) stats.distribution[currentRow]++;
    } else {
        stats.streak = 0;
    }
    localStorage.setItem("termo_stats", JSON.stringify(stats));
}
function updateStatsUI() {
    document.getElementById("stat-played").textContent = stats.played;
    document.getElementById("stat-win-pct").textContent = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) + "%" : "0%";
    document.getElementById("stat-streak").textContent = stats.streak;
    document.getElementById("stat-max-streak").textContent = stats.maxStreak;

    const container = document.getElementById("chart-container");
    container.innerHTML = "";
    const maxVal = Math.max(...stats.distribution, 1);

    stats.distribution.forEach((val, idx) => {
        if (idx >= MODES[currentMode].attempts) return; // Mostra só até o limite do modo
        const row = document.createElement("div"); row.className = "chart-row";
        const lbl = document.createElement("div"); lbl.textContent = idx + 1;
        const bar = document.createElement("div"); bar.className = "chart-bar";
        if (isGameOver && currentRow === idx && boardStates.every(s => s.solved)) bar.classList.add("highlight");
        bar.style.width = Math.max((val / maxVal) * 100, 8) + "%";
        bar.textContent = val;
        row.appendChild(lbl); row.appendChild(bar); container.appendChild(row);
    });
}
function removeAccents(str) { return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function loadThemes() {
    // Carrega select de temas se existir
    if (typeof wordDatabase !== 'undefined' && themeSelect) {
        Object.keys(wordDatabase).forEach(t => {
            const o = document.createElement("option"); o.value = t; o.textContent = t.toUpperCase(); themeSelect.appendChild(o);
        });
        themeSelect.addEventListener("change", () => { startGame(currentMode); themeSelect.blur(); });
    }
}
function showToast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; toastContainer.appendChild(t); setTimeout(() => t.remove(), 3000);
}

// Start
init();