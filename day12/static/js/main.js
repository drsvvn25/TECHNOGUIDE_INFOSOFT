// Main Application Logic for SpamShield AI

document.addEventListener("DOMContentLoaded", () => {
    // State management
    let appState = {
        dataset: [],
        stats: {},
        activeTab: "dashboard",
        vocabTab: "spam"
    };

    // DOM Elements
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".tab-content");
    const pageTitle = document.getElementById("page-title");
    const pageSubtitle = document.getElementById("page-subtitle");
    
    // Status banner
    const statusBanner = document.getElementById("status-banner");
    const statusMessage = document.getElementById("status-message");
    const bannerClose = document.querySelector(".banner-close");
    
    // Reset btn
    const btnReset = document.getElementById("btn-reset");

    // Stats elements
    const statAccuracy = document.getElementById("stat-accuracy");
    const statF1 = document.getElementById("stat-f1");
    const statSize = document.getElementById("stat-size");
    const statDistribution = document.getElementById("stat-distribution");

    // Predict elements
    const predictInput = document.getElementById("predict-input");
    const btnPredict = document.getElementById("btn-predict");
    const predictResult = document.getElementById("predict-result");
    const predictVerdict = document.getElementById("predict-verdict");
    const predictConfidence = document.getElementById("predict-confidence");
    const probHamFill = document.getElementById("prob-ham-fill");
    const probHamPct = document.getElementById("prob-ham-pct");
    const probSpamFill = document.getElementById("prob-spam-fill");
    const probSpamPct = document.getElementById("prob-spam-pct");
    const quickProcessedText = document.getElementById("quick-processed-text");

    // Vocab elements
    const vocabTabBtns = document.querySelectorAll(".vocab-tab-btn");
    const vocabSpamList = document.getElementById("vocab-spam-list");
    const vocabHamList = document.getElementById("vocab-ham-list");

    // Sandbox elements
    const sandboxInput = document.getElementById("sandbox-input");
    const btnSandboxRun = document.getElementById("btn-sandbox-run");
    const stepRawOut = document.getElementById("step-raw-out");
    const stepLowercaseOut = document.getElementById("step-lowercase-out");
    const stepPunctuationOut = document.getElementById("step-punctuation-out");
    const stepTokensOut = document.getElementById("step-tokens-out");
    const stepStopwordsOut = document.getElementById("step-stopwords-out");
    const stepVectorOut = document.getElementById("step-vector-out");

    // Dataset Manager elements
    const addSampleForm = document.getElementById("add-sample-form");
    const newMessage = document.getElementById("new-message");
    const datasetSearch = document.getElementById("dataset-search");
    const datasetTbody = document.getElementById("dataset-tbody");

    // ----------------------------------------------------
    // TAB NAVIGATION
    // ----------------------------------------------------
    const titles = {
        dashboard: { title: "Model Overview", subtitle: "Analyze, train, and inspect Naive Bayes text classification." },
        sandbox: { title: "NLP Sandbox", subtitle: "Visualize natural language processing pipelines step by step." },
        dataset: { title: "Dataset Manager", subtitle: "Review, add, and filter training samples with live retraining." },
        education: { title: "Educational Center", subtitle: "Learn the mathematical principles of Naive Bayes and token bag counts." }
    };

    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const tabId = item.getAttribute("data-tab");
            
            // Toggle active menu item
            menuItems.forEach(mi => mi.classList.remove("active"));
            item.classList.add("active");

            // Toggle sections
            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(`sect-${tabId}`).classList.add("active");

            // Update titles
            pageTitle.textContent = titles[tabId].title;
            pageSubtitle.textContent = titles[tabId].subtitle;
            
            appState.activeTab = tabId;

            // Trigger action on entry if needed
            if (tabId === "sandbox") {
                runSandboxPipeline();
            }
        });
    });

    // Close status banner
    bannerClose.addEventListener("click", () => {
        statusBanner.classList.add("hidden");
    });

    function showStatus(message, isError = false) {
        statusMessage.textContent = message;
        statusBanner.classList.remove("hidden");
        if (isError) {
            statusBanner.classList.add("error");
        } else {
            statusBanner.classList.remove("error");
        }
        // Auto hide after 5 seconds
        setTimeout(() => {
            statusBanner.classList.add("hidden");
        }, 5000);
    }

    // ----------------------------------------------------
    // API CALLS
    // ----------------------------------------------------
    
    // Fetch stats
    async function fetchStats() {
        try {
            const res = await fetch("/api/stats");
            const data = await res.json();
            appState.stats = data;
            renderStats();
            renderVocabCharts();
        } catch (err) {
            console.error("Error fetching stats:", err);
        }
    }

    // Fetch dataset
    async function fetchDataset() {
        try {
            const res = await fetch("/api/dataset");
            const data = await res.json();
            appState.dataset = data;
            renderDatasetTable();
        } catch (err) {
            console.error("Error fetching dataset:", err);
        }
    }

    // Initialize Page
    async function initializeApp() {
        await fetchStats();
        await fetchDataset();
    }

    // ----------------------------------------------------
    // RENDER FUNCTIONS
    // ----------------------------------------------------

    function renderStats() {
        const stats = appState.stats;
        
        if (stats.error) {
            statAccuracy.textContent = "Error";
            statF1.textContent = "Error";
            statSize.textContent = "0";
            statDistribution.textContent = stats.error;
            return;
        }

        // Format decimal scores to percentages
        const accPct = (stats.accuracy * 100).toFixed(1) + "%";
        const f1Pct = (stats.f1_score * 100).toFixed(1) + "%";
        
        statAccuracy.textContent = accPct;
        statF1.textContent = f1Pct;
        statSize.textContent = stats.total_samples;
        statDistribution.textContent = `${stats.ham_samples} Ham / ${stats.spam_samples} Spam`;
    }

    function renderVocabCharts() {
        const stats = appState.stats;
        if (!stats || stats.error) return;

        // Render Spam Chart
        vocabSpamList.innerHTML = "";
        const maxSpamCount = stats.top_spam_words.length > 0 ? stats.top_spam_words[0].count : 1;
        
        if (stats.top_spam_words.length === 0) {
            vocabSpamList.innerHTML = `<div class="text-secondary text-center">No spam terms found.</div>`;
        } else {
            stats.top_spam_words.forEach(item => {
                const widthPct = (item.count / maxSpamCount) * 100;
                const row = document.createElement("div");
                row.className = "chart-bar-row";
                row.innerHTML = `
                    <div class="bar-label-group">
                        <span class="bar-word">${item.word}</span>
                        <span class="bar-count">${item.count}</span>
                    </div>
                    <div class="bar-fill-track">
                        <div class="bar-fill" style="width: 0%"></div>
                    </div>
                `;
                vocabSpamList.appendChild(row);
                // Animate expansion after appending
                setTimeout(() => {
                    row.querySelector(".bar-fill").style.width = `${widthPct}%`;
                }, 50);
            });
        }

        // Render Ham Chart
        vocabHamList.innerHTML = "";
        const maxHamCount = stats.top_ham_words.length > 0 ? stats.top_ham_words[0].count : 1;
        
        if (stats.top_ham_words.length === 0) {
            vocabHamList.innerHTML = `<div class="text-secondary text-center">No ham terms found.</div>`;
        } else {
            stats.top_ham_words.forEach(item => {
                const widthPct = (item.count / maxHamCount) * 100;
                const row = document.createElement("div");
                row.className = "chart-bar-row";
                row.innerHTML = `
                    <div class="bar-label-group">
                        <span class="bar-word">${item.word}</span>
                        <span class="bar-count">${item.count}</span>
                    </div>
                    <div class="bar-fill-track">
                        <div class="bar-fill" style="width: 0%"></div>
                    </div>
                `;
                vocabHamList.appendChild(row);
                setTimeout(() => {
                    row.querySelector(".bar-fill").style.width = `${widthPct}%`;
                }, 50);
            });
        }
    }

    // Toggle Vocab Tabs
    vocabTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            vocabTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const vocabType = btn.getAttribute("data-vocab");
            if (vocabType === "spam") {
                vocabSpamList.classList.remove("hidden");
                vocabHamList.classList.add("hidden");
            } else {
                vocabSpamList.classList.add("hidden");
                vocabHamList.classList.remove("hidden");
            }
            appState.vocabTab = vocabType;
        });
    });

    // ----------------------------------------------------
    // PREDICTION CONTROLLER
    // ----------------------------------------------------
    
    async function runPrediction() {
        const text = predictInput.value.trim();
        if (!text) return;

        btnPredict.disabled = true;
        btnPredict.querySelector("span").textContent = "Analyzing...";

        try {
            const res = await fetch("/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            
            if (data.success) {
                displayPredictionResult(data);
            } else {
                showStatus(data.error || "Failed to make prediction.", true);
            }
        } catch (err) {
            showStatus("Failed to communicate with prediction API.", true);
            console.error(err);
        } finally {
            btnPredict.disabled = false;
            btnPredict.querySelector("span").textContent = "Classify Message";
        }
    }

    function displayPredictionResult(data) {
        predictResult.classList.remove("hidden");
        
        // Clear classes
        predictResult.classList.remove("spam-verdict", "ham-verdict");
        
        const isSpam = data.prediction === "spam";
        predictResult.classList.add(isSpam ? "spam-verdict" : "ham-verdict");
        
        // Update verdict label and icon
        const iconHTML = isSpam 
            ? `<i class="fa-solid fa-triangle-exclamation"></i>` 
            : `<i class="fa-solid fa-circle-check"></i>`;
        
        predictVerdict.querySelector(".verdict-icon").innerHTML = iconHTML;
        predictVerdict.querySelector(".verdict-text").textContent = isSpam ? "Spam (Junk)" : "Ham (Safe)";
        
        // Confidence
        const confidencePct = (data.confidence * 100).toFixed(1) + "%";
        predictConfidence.textContent = confidencePct;
        
        // Probabilities fills
        const hamPct = (data.probabilities.ham * 100).toFixed(0) + "%";
        const spamPct = (data.probabilities.spam * 100).toFixed(0) + "%";
        
        probHamFill.style.width = hamPct;
        probHamPct.textContent = hamPct;
        
        probSpamFill.style.width = spamPct;
        probSpamPct.textContent = spamPct;

        // Quick cleaned tokens list
        if (data.steps && data.steps.processed) {
            quickProcessedText.textContent = data.steps.processed || "[Empty - Completely filtered out]";
        } else {
            quickProcessedText.textContent = "[No tokens remaining]";
        }
        
        // Scroll slightly if viewport demands
        predictResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    btnPredict.addEventListener("click", runPrediction);
    predictInput.addEventListener("keydown", (e) => {
        // Ctrl + Enter to submit
        if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            runPrediction();
        }
    });

    // ----------------------------------------------------
    // SANDBOX PIPELINE CONTROLLER
    // ----------------------------------------------------
    
    async function runSandboxPipeline() {
        const text = sandboxInput.value.trim();
        if (!text) return;

        btnSandboxRun.disabled = true;
        btnSandboxRun.innerHTML = `Processing... <i class="fa-solid fa-spinner fa-spin"></i>`;

        try {
            const res = await fetch("/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            
            if (data.success && data.steps) {
                renderSandboxPipelineSteps(data.steps);
            } else {
                showStatus(data.error || "Sandbox pipeline failed.", true);
            }
        } catch (err) {
            showStatus("Failed to run sandbox pipeline.", true);
            console.error(err);
        } finally {
            btnSandboxRun.disabled = false;
            btnSandboxRun.innerHTML = `Process <i class="fa-solid fa-play"></i>`;
        }
    }

    function renderSandboxPipelineSteps(steps) {
        // Step 1: Raw
        stepRawOut.textContent = `"${steps.original}"`;

        // Step 2: Lowercase
        stepLowercaseOut.textContent = `"${steps.lowercase}"`;

        // Step 3: Punctuation
        stepPunctuationOut.textContent = steps.no_punctuation ? `"${steps.no_punctuation}"` : `"" [Completely stripped]`;

        // Step 4: Tokenization
        stepTokensOut.innerHTML = "";
        if (steps.tokens.length === 0) {
            stepTokensOut.innerHTML = `<span class="text-secondary italic">No tokens found.</span>`;
        } else {
            steps.tokens.forEach(token => {
                const pill = document.createElement("span");
                pill.className = "token-pill";
                pill.textContent = token;
                stepTokensOut.appendChild(pill);
            });
        }

        // Step 5: Stopwords
        stepStopwordsOut.innerHTML = "";
        if (steps.tokens.length === 0) {
            stepStopwordsOut.innerHTML = `<span class="text-secondary italic">No tokens to filter.</span>`;
        } else {
            // Compare tokens using stopwords list
            steps.tokens.forEach(token => {
                const pill = document.createElement("span");
                const isStopword = window.commonStopwords.includes(token);
                
                pill.className = `token-pill ${isStopword ? "removed" : "kept"}`;
                pill.textContent = token;
                if (isStopword) {
                    pill.title = "Stopword filtered out";
                } else {
                    pill.title = "Kept as classifier feature";
                }
                
                stepStopwordsOut.appendChild(pill);
            });
        }

        // Step 6: Vector Representation
        // Generate mock dictionary mapping from kept items
        stepVectorOut.innerHTML = "";
        if (steps.no_stopwords.length === 0) {
            stepVectorOut.textContent = "[]";
        } else {
            // Count occurrence of unique terms
            const freq = {};
            steps.no_stopwords.forEach(word => {
                freq[word] = (freq[word] || 0) + 1;
            });
            
            let vectorHTML = `[\n`;
            Object.entries(freq).forEach(([word, count]) => {
                vectorHTML += `  "${word}": ${count},\n`;
            });
            // remove last comma
            vectorHTML = vectorHTML.slice(0, -2) + `\n]`;
            
            stepVectorOut.textContent = vectorHTML;
        }
    }

    btnSandboxRun.addEventListener("click", runSandboxPipeline);
    sandboxInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            runSandboxPipeline();
        }
    });

    // ----------------------------------------------------
    // DATASET MANAGER CONTROLLER
    // ----------------------------------------------------
    
    function renderDatasetTable() {
        const query = datasetSearch.value.trim().toLowerCase();
        datasetTbody.innerHTML = "";
        
        let filtered = appState.dataset;
        if (query) {
            filtered = appState.dataset.filter(item => 
                item.message.toLowerCase().includes(query) ||
                item.label.toLowerCase().includes(query) ||
                item.id.toString() === query
            );
        }

        if (filtered.length === 0) {
            datasetTbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 24px;" class="text-secondary">
                        No messages found matching search criteria.
                    </td>
                </tr>
            `;
            return;
        }

        // Reverse to display newest items first
        const displayList = [...filtered].reverse();

        displayList.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="code-box" style="font-size:12px;">#${item.id}</td>
                <td><span class="badge ${item.label}">${item.label}</span></td>
                <td>${escapeHTML(item.message)}</td>
                <td style="text-align: center;">
                    <button class="btn-delete" data-id="${item.id}" title="Remove item from training set">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            datasetTbody.appendChild(tr);
        });

        // Attach delete events
        datasetTbody.querySelectorAll(".btn-delete").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.getAttribute("data-id");
                if (confirm(`Are you sure you want to remove item #${id} from the training dataset?`)) {
                    await deleteDatasetItem(id);
                }
            });
        });
    }

    async function deleteDatasetItem(id) {
        try {
            const res = await fetch(`/api/dataset/${id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            
            if (data.success) {
                showStatus(`Message #${id} deleted successfully. Model retrained!`);
                appState.stats = data.stats;
                
                // Fetch refreshed dataset
                await fetchDataset();
                renderStats();
                renderVocabCharts();
            } else {
                showStatus(data.error || "Failed to delete item.", true);
            }
        } catch (err) {
            showStatus("Failed to connect to dataset API.", true);
            console.error(err);
        }
    }

    addSampleForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const message = newMessage.value.trim();
        const label = document.querySelector('input[name="new-label"]:checked').value;

        if (!message) return;

        const submitBtn = addSampleForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.querySelector("span").textContent = "Adding & Training...";

        try {
            const res = await fetch("/api/dataset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, label })
            });
            const data = await res.json();

            if (data.success) {
                showStatus("New sample added successfully! Model has been retrained.");
                newMessage.value = "";
                appState.stats = data.stats;
                
                await fetchDataset();
                renderStats();
                renderVocabCharts();
            } else {
                showStatus(data.error || "Failed to add sample.", true);
            }
        } catch (err) {
            showStatus("Failed to submit sample.", true);
            console.error(err);
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector("span").textContent = "Add & Retrain Model";
        }
    });

    datasetSearch.addEventListener("input", renderDatasetTable);

    // ----------------------------------------------------
    // SYSTEM RESET
    // ----------------------------------------------------
    
    btnReset.addEventListener("click", async () => {
        if (confirm("Reset dataset back to the initial 20 samples from day12.py? All customized modifications will be cleared.")) {
            btnReset.disabled = true;
            btnReset.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Resetting...`;
            
            try {
                const res = await fetch("/api/reset", { method: "POST" });
                const data = await res.json();
                
                if (data.success) {
                    showStatus("Dataset reset successfully! Model retrained on initial data.");
                    appState.stats = data.stats;
                    
                    await fetchDataset();
                    renderStats();
                    renderVocabCharts();
                    
                    // Clear search
                    datasetSearch.value = "";
                    
                    // Clear sandbox and live input
                    predictInput.value = "";
                    predictResult.classList.add("hidden");
                } else {
                    showStatus(data.error || "Reset failed.", true);
                }
            } catch (err) {
                showStatus("Error communicating with reset API.", true);
                console.error(err);
            } finally {
                btnReset.disabled = false;
                btnReset.innerHTML = `<i class="fa-solid fa-rotate-left"></i> Reset Dataset`;
            }
        }
    });

    // Helper functions
    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Trigger Initial Load
    initializeApp();
});
