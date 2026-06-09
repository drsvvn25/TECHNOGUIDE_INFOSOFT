// ── caption.js — Caption Generator Page ─────────────────────────
const API = '';

// ── Toast ────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✅' : '❌'} ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── Copy to Clipboard ────────────────────────────────────────────
function copyText(id) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => showToast('Copied to clipboard!'));
}

function copyHashtags() {
  const chips = document.querySelectorAll('.hashtag-chip');
  const text = Array.from(chips).map(c => c.textContent).join(' ');
  navigator.clipboard.writeText(text).then(() => showToast('Hashtags copied!'));
}

// ── Tone Selection ───────────────────────────────────────────────
document.querySelectorAll('input[name="tone"]').forEach(radio => {
  radio.addEventListener('change', () => {
    // Visual already handled via CSS :checked + .tone-btn
  });
});

// ── Generate Caption ─────────────────────────────────────────────
document.getElementById('captionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const businessType = document.getElementById('businessType').value.trim();
  const productName = document.getElementById('productName').value.trim();
  const toneEl = document.querySelector('input[name="tone"]:checked');

  if (!businessType || !productName) { showToast('Please fill in Business Type and Product Name', 'error'); return; }
  if (!toneEl) { showToast('Please select a caption tone', 'error'); return; }

  const tone = toneEl.value;
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Generating...';

  try {
    // Simulate API delay
    await new Promise(res => setTimeout(res, 800));

    const resultData = {
      _id: Date.now().toString(),
      businessType, 
      productName, 
      tone,
      instagram: `✨ Excited to introduce ${productName} for your ${businessType} needs! Experience the next level of innovation. Check out the link in bio to learn more. 🚀\n\n#${businessType.replace(/\\s+/g,'')} #${productName.replace(/\\s+/g,'')} #Innovation #Growth`,
      linkedin: `I am thrilled to announce our latest offering: ${productName}. In the fast-paced world of ${businessType}, staying ahead is crucial. Let's connect and discuss how this can add value to your workflow. 📈\n\n#${businessType.replace(/\\s+/g,'')} #Professional #Tech`,
      facebook: `Looking for the best ${productName}? We've got you covered! 🌟 Whether you're in ${businessType} or just love quality, this is for you. Send us a message today! 💬\n\n#Facebook #Community #${productName.replace(/\\s+/g,'')}`,
      twitter: `Ready to upgrade your ${businessType} game? ${productName} is live! 🔥 Click below to see why everyone is talking about it. ⚡\n\n#${productName.replace(/\\s+/g,'')} #Trending`,
      cta: 'Click the link in bio to get started today!',
      hashtags: [`#${businessType.replace(/\\s+/g,'')}`, `#${productName.replace(/\\s+/g,'')}`, '#Trending', '#Viral', '#Business'],
      emojis: ['🚀', '✨', '🔥', '🌟', '📈'],
      createdAt: new Date().toISOString()
    };

    const history = JSON.parse(localStorage.getItem('captions') || '[]');
    history.push(resultData);
    localStorage.setItem('captions', JSON.stringify(history));

    renderCaptions(resultData);
    loadCaptionHistory();
    showToast('Captions generated successfully!');
  } catch (e) {
    showToast(e.message || 'Generation failed', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles me-2"></i>Generate Captions';
  }
});

// ── Render Output ─────────────────────────────────────────────────
function renderCaptions(data) {
  document.getElementById('captionPlaceholder').style.display = 'none';
  document.getElementById('captionOutput').style.display = 'block';

  document.getElementById('igText').textContent = data.instagram || '—';
  document.getElementById('liText').textContent = data.linkedin  || '—';
  document.getElementById('fbText').textContent = data.facebook  || '—';
  document.getElementById('twText').textContent = data.twitter   || '—';
  document.getElementById('ctaText').textContent = data.cta      || '—';

  const toneName = data.tone ? data.tone.charAt(0).toUpperCase() + data.tone.slice(1) : 'Generated';
  document.getElementById('outputToneBadge').textContent = toneName;

  // Hashtags
  const hashEl = document.getElementById('hashtagsContainer');
  hashEl.innerHTML = (data.hashtags || []).map(h => `<span class="hashtag-chip">${h.startsWith('#') ? h : '#' + h}</span>`).join('');

  // Emojis
  const emoEl = document.getElementById('emojisContainer');
  emoEl.innerHTML = (data.emojis || []).map(em => `<span class="emoji-chip">${em}</span>`).join('');

  // Scroll to output
  document.getElementById('captionOutput').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Load History ──────────────────────────────────────────────────
function loadCaptionHistory() {
  const body = document.getElementById('captionHistoryBody');
  body.innerHTML = '<tr><td colspan="5" class="text-center py-3 text-muted">Loading...</td></tr>';
  try {
    const data = JSON.parse(localStorage.getItem('captions') || '[]');
    data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    if (!data.length) {
      body.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">No captions generated yet</td></tr>';
      return;
    }
    body.innerHTML = data.map(c => `
      <tr>
        <td>${c.businessType}</td>
        <td>${c.productName}</td>
        <td><span class="badge badge-sent">${c.tone}</span></td>
        <td>${formatDate(c.createdAt)}</td>
        <td>
          <button class="btn btn-sm btn-outline-secondary me-1" onclick="viewSaved(${JSON.stringify(c).replace(/"/g, '&quot;')})" title="View">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteCaption('${c._id}')" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    body.innerHTML = '<tr><td colspan="5" class="text-center text-danger py-3">Could not load local data</td></tr>';
  }
}

// ── View Saved Caption ────────────────────────────────────────────
function viewSaved(data) {
  // Populate form fields
  document.getElementById('businessType').value = data.businessType;
  document.getElementById('productName').value = data.productName;
  const radio = document.querySelector(`input[name="tone"][value="${data.tone}"]`);
  if (radio) radio.checked = true;
  renderCaptions(data);
}

// ── Delete Caption ────────────────────────────────────────────────
function deleteCaption(id) {
  if (!confirm('Delete this caption?')) return;
  try {
    let history = JSON.parse(localStorage.getItem('captions') || '[]');
    history = history.filter(c => c._id !== id);
    localStorage.setItem('captions', JSON.stringify(history));
    
    showToast('Caption deleted');
    loadCaptionHistory();
  } catch (e) {
    showToast('Delete failed', 'error');
  }
}

// ── Init ──────────────────────────────────────────────────────────
loadCaptionHistory();
