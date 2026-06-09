// ── app.js — Dashboard ──────────────────────────────────────────
const API = '';

// Toast utility
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer') || (() => {
    const el = document.createElement('div');
    el.className = 'toast-container';
    el.id = 'toastContainer';
    document.body.appendChild(el);
    return el;
  })();

  const toast = document.createElement('div');
  toast.className = `custom-toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✅' : '❌'} ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function formatINR(n) {
  return '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 });
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function statusBadge(s) {
  const map = { draft: 'badge-draft', sent: 'badge-sent', paid: 'badge-paid', overdue: 'badge-overdue' };
  return `<span class="badge ${map[s] || 'badge-draft'}">${s.charAt(0).toUpperCase() + s.slice(1)}</span>`;
}

// Load dashboard stats
function loadStats() {
  try {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const stats = {
      total: invoices.length,
      paid: invoices.filter(i => i.status === 'paid').length,
      pending: invoices.filter(i => i.status !== 'paid').length,
      totalRevenue: invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.total, 0)
    };
    
    document.getElementById('statTotal').textContent = stats.total;
    document.getElementById('statPaid').textContent = stats.paid;
    document.getElementById('statPending').textContent = stats.pending;
    document.getElementById('statRevenue').textContent = stats.totalRevenue >= 1000
      ? `₹${(stats.totalRevenue / 1000).toFixed(1)}K`
      : formatINR(stats.totalRevenue);
  } catch (e) {
    console.warn('Stats error:', e.message);
  }
}

// Load recent invoices
function loadRecentInvoices() {
  const body = document.getElementById('recentInvoicesBody');
  if (!body) return;
  try {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    // Sort by date descending
    invoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const recent = invoices.slice(0, 5);
    
    if (!recent.length) {
      body.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted"><div class="empty-state"><div class="empty-icon">📄</div><p>No invoices yet — <a href="invoice.html" style="color:#818cf8">create one!</a></p></div></td></tr>';
      return;
    }
    body.innerHTML = recent.map(inv => `
      <tr>
        <td><strong style="color:#818cf8">${inv.invoiceNumber}</strong></td>
        <td>${inv.clientName}</td>
        <td>${formatDate(inv.date || inv.createdAt)}</td>
        <td>${formatINR(inv.total)}</td>
        <td>${statusBadge(inv.status)}</td>
      </tr>
    `).join('');
  } catch (e) {
    body.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-3">Could not load local data</td></tr>';
  }
}

// Init
loadStats();
loadRecentInvoices();
