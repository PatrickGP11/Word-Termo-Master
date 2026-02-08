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
let stats = { played: 0, wins: 0, streak: 0, maxStreak: 0, distribution: Array(10).fill(0) };

const gameArea = document.getElementById("game-area");
const keyboard = document.getElementById("keyboard-container");
const gameLogo = document.getElementById("game-logo");
const keysLayout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const topMenu = document.getElementById("top-menu");
const menuBtn = document.getElementById("menu-btn");
const modeLinks = {
    termo: document.getElementById("mode-termo"),
    dueto: document.getElementById("mode-dueto"),
    quarteto: document.getElementById("mode-quarteto")
};

function init() {
    loadStats();
    setupModals();
    setupMenu();
    if (!loadGameState()) {
        startGame(currentMode);
    }
    document.addEventListener("keydown", handlePhysicalKeyboard);
}

function saveGameState() {
    const gridData = [];
    for (let b = 0; b < MODES[currentMode].boards; b++) {
        let rows = [];
        for (let r = 0; r < MODES[currentMode].attempts; r++) {
            let rowTxt = "";
            for (let t = 0; t < 5; t++) {
                const el = document.getElementById(`board-${b}-row-${r}-tile-${t}`);
                rowTxt += el ? (el.textContent || " ") : " ";
            }
            rows.push(rowTxt);
        }
        gridData.push(rows);
    }
    const state = {
        mode: currentMode, secretWords: secretWords, boardStates: boardStates,
        currentRow: currentRow, currentTile: currentTile, isGameOver: isGameOver,
        gridData: gridData, date: new Date().toDateString()
    };
    localStorage.setItem('termo_save_v3', JSON.stringify(state));
}

function loadGameState() {
    const saved = localStorage.getItem('termo_save_v3');
    if (!saved) return false;
    try {
        const state = JSON.parse(saved);
        currentMode = state.mode;
        secretWords = state.secretWords;
        boardStates = state.boardStates;
        currentRow = state.currentRow;
        currentTile = state.currentTile;
        isGameOver = state.isGameOver;

        gameLogo.textContent = MODES[currentMode].name;
        gameArea.className = `mode-${currentMode}`;
        updateMenuUI(currentMode);
        createBoardsUI(MODES[currentMode]);
        createKeyboard();

        state.gridData.forEach((rows, b) => {
            rows.forEach((rowTxt, r) => {
                const chars = rowTxt.split("");
                chars.forEach((char, t) => {
                    if (char.trim()) {
                        const tile = document.getElementById(`board-${b}-row-${r}-tile-${t}`);
                        if (tile) {
                            tile.textContent = char;
                            if (r < currentRow) {
                                const color = calcColor(b, rowTxt, t);
                                tile.classList.add(color);
                                updateKey(char, color);
                            } else if (r === currentRow) {
                                tile.setAttribute("data-state", "active");
                            }
                        }
                    }
                });
            });
            if (boardStates[b].solved) document.getElementById(`board-${b}`).classList.add("solved");
        });
        return true;
    } catch (e) { return false; }
}

function calcColor(b, rowWord, t) {
    const secret = secretWords[b].split("");
    const guess = rowWord.split("");
    if (guess[t] === secret[t]) return "correct";
    if (secret.includes(guess[t])) return "present";
    return "absent";
}

function setupMenu() {
    menuBtn.addEventListener("click", () => topMenu.classList.toggle("hidden"));
    Object.keys(modeLinks).forEach(m => {
        modeLinks[m].addEventListener("click", (e) => { e.preventDefault(); switchMode(m); });
    });
}
function updateMenuUI(m) {
    Object.values(modeLinks).forEach(l => l.classList.remove("active"));
    modeLinks[m].classList.add("active");
}
function switchMode(m) {
    updateMenuUI(m);
    topMenu.classList.add("hidden");
    localStorage.removeItem('termo_save_v3');
    startGame(m);
}

function startGame(mode) {
    currentMode = mode;
    currentRow = 0; currentTile = 0; isGameOver = false;
    const config = MODES[mode];
    gameLogo.textContent = config.name;
    gameArea.className = `mode-${mode}`;
    const allWords = (typeof wordDatabase !== 'undefined') ? Object.values(wordDatabase).flat() : ["TERMO"];
    secretWords = []; boardStates = [];
    for (let i = 0; i < config.boards; i++) {
        const w = allWords[Math.floor(Math.random() * allWords.length)].toUpperCase();
        secretWords.push(removeAccents(w));
        boardStates.push({ solved: false });
    }
    createBoardsUI(config);
    createKeyboard();
    saveGameState();
}

function createBoardsUI(config) {
    gameArea.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.className = "boards-wrapper";
    for (let b = 0; b < config.boards; b++) {
        const div = document.createElement("div");
        div.className = "board-container";
        div.id = `board-${b}`;
        for (let r = 0; r < config.attempts; r++) {
            const row = document.createElement("div");
            row.className = "row";
            for (let t = 0; t < 5; t++) {
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.id = `board-${b}-row-${r}-tile-${t}`;
                row.appendChild(tile);
            }
            div.appendChild(row);
        }
        wrapper.appendChild(div);
    }
    gameArea.appendChild(wrapper);
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
    const k = document.createElement("div");
    k.textContent = char; k.className = `key ${wide ? "wide" : ""}`; k.dataset.key = char;
    return k;
}

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
        saveGameState();
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
        saveGameState();
    }
}

function checkGuess() {
    if (currentTile < 5) return;
    let guess = "";
    let activeIdx = boardStates.findIndex(s => !s.solved);
    if (activeIdx === -1) activeIdx = 0;
    for (let i = 0; i < 5; i++) guess += document.getElementById(`board-${activeIdx}-row-${currentRow}-tile-${i}`).textContent;

    for (let b = 0; b < MODES[currentMode].boards; b++) {
        if (boardStates[b].solved) continue;
        const sArr = secretWords[b].split("");
        const gArr = guess.split("");
        const res = Array(5).fill("absent");
        for (let i = 0; i < 5; i++) if (gArr[i] === sArr[i]) { res[i] = "correct"; sArr[i] = null; gArr[i] = null; }
        for (let i = 0; i < 5; i++) if (gArr[i] && sArr.includes(gArr[i])) { res[i] = "present"; sArr[sArr.indexOf(gArr[i])] = null; }
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
        setTimeout(() => document.getElementById("stats-btn").click(), 1500);
        isGameOver = true;
    } else if (currentRow >= maxAtt - 1 && !allSolved) {
        updateStats(false);
        setTimeout(() => document.getElementById("stats-btn").click(), 1500);
        isGameOver = true;
    } else {
        currentRow++; currentTile = 0;
    }
    saveGameState();
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

function removeAccents(str) { return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function loadStats() { const s = localStorage.getItem("termo_stats"); if (s) stats = JSON.parse(s); }
function updateStats(won) {
    stats.played++;
    if (won) { stats.wins++; stats.streak++; if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak; }
    else { stats.streak = 0; }
    localStorage.setItem("termo_stats", JSON.stringify(stats));
}
function updateStatsUI() {
    document.getElementById("stat-played").textContent = stats.played;
    document.getElementById("stat-win-pct").textContent = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) + "%" : "0%";
    document.getElementById("stat-streak").textContent = stats.streak;
    document.getElementById("stat-max-streak").textContent = stats.maxStreak;
}
function setupModals() {
    document.getElementById("help-btn").onclick = () => document.getElementById("help-modal").classList.remove("hidden");
    document.getElementById("stats-btn").onclick = () => { updateStatsUI(); document.getElementById("stats-modal").classList.remove("hidden"); };
    document.getElementById("settings-btn").onclick = () => document.getElementById("settings-modal").classList.remove("hidden");
    document.querySelectorAll(".close-modal").forEach(b => b.onclick = (e) => e.target.closest(".modal-overlay").classList.add("hidden"));
    document.getElementById("modal-restart-btn").onclick = () => {
        document.getElementById("stats-modal").classList.add("hidden");
        localStorage.removeItem('termo_save_v3');
        startGame(currentMode);
    };
    document.getElementById("toggle-contrast").onchange = (e) => {
        document.body.classList.toggle("high-contrast", e.target.checked);
        localStorage.setItem("termo_high_contrast", e.target.checked);
    };
}
function loadPreferences() {
    if (localStorage.getItem("termo_high_contrast") === "true") {
        document.body.classList.add("high-contrast");
        document.getElementById("toggle-contrast").checked = true;
    }
}

init();