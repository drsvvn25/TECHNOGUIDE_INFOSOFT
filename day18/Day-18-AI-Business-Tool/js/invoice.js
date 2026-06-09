// ── invoice.js — Invoice Page ───────────────────────────────────
const API = '';
let currentInvoice = null;
let itemCount = 0;

// ── Utilities ────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
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
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function statusBadge(s) {
  const map = { draft: 'badge-draft', sent: 'badge-sent', paid: 'badge-paid', overdue: 'badge-overdue' };
  return `<span class="badge ${map[s] || 'badge-draft'}">${s.charAt(0).toUpperCase() + s.slice(1)}</span>`;
}

// ── Items Table ──────────────────────────────────────────────────
function addItemRow(desc = '', qty = 1, price = 0) {
  const id = itemCount++;
  const row = document.createElement('tr');
  row.id = `item-${id}`;
  row.innerHTML = `
    <td><input type="text" class="form-control item-desc" placeholder="Service / product description" value="${desc}" oninput="recalculate()" /></td>
    <td><input type="number" class="form-control item-qty" min="1" value="${qty}" oninput="recalculate()" /></td>
    <td><input type="number" class="form-control item-price" min="0" step="0.01" value="${price}" oninput="recalculate()" /></td>
    <td><input type="text" class="form-control item-total bg-transparent border-0" readonly value="₹ 0.00" /></td>
    <td><button class="btn btn-sm btn-danger" onclick="removeItem('item-${id}')"><i class="fa-solid fa-trash"></i></button></td>
  `;
  document.getElementById('itemsBody').appendChild(row);
  recalculate();
}

function removeItem(id) {
  const row = document.getElementById(id);
  if (row) row.remove();
  recalculate();
}

function recalculate() {
  const rows = document.querySelectorAll('#itemsBody tr');
  let subtotal = 0;
  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('.item-qty')?.value || 0);
    const price = parseFloat(row.querySelector('.item-price')?.value || 0);
    const total = qty * price;
    const totalInput = row.querySelector('.item-total');
    if (totalInput) totalInput.value = '₹ ' + total.toFixed(2);
    subtotal += total;
  });
  const taxPct = parseFloat(document.getElementById('taxPercentage')?.value || 18);
  const tax = (subtotal * taxPct) / 100;
  const total = subtotal + tax;
  document.getElementById('displaySubtotal').textContent = formatINR(subtotal);
  document.getElementById('displayTax').textContent = formatINR(tax);
  document.getElementById('displayTotal').textContent = formatINR(total);
  document.getElementById('displayTaxPct').textContent = taxPct;
}

// ── Load Invoices ────────────────────────────────────────────────
function loadInvoices(search = '', status = '') {
  const body = document.getElementById('invoicesBody');
  body.innerHTML = '<tr><td colspan="9" class="text-center py-4 text-muted">Loading...</td></tr>';
  try {
    let data = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(inv => 
        (inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(s)) ||
        (inv.clientName && inv.clientName.toLowerCase().includes(s)) ||
        (inv.companyName && inv.companyName.toLowerCase().includes(s))
      );
    }
    if (status) {
      data = data.filter(inv => inv.status === status);
    }
    
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    if (!data.length) {
      body.innerHTML = '<tr><td colspan="9" class="text-center py-5"><div class="empty-state"><div class="empty-icon">📄</div><p class="text-muted">No invoices found. Click "New Invoice" to create one!</p></div></td></tr>';
      return;
    }
    body.innerHTML = data.map(inv => `
      <tr>
        <td><strong style="color:#818cf8">${inv.invoiceNumber}</strong></td>
        <td>${inv.companyName}</td>
        <td>${inv.clientName}</td>
        <td>${formatDate(inv.date || inv.createdAt)}</td>
        <td>${formatINR(inv.subtotal)}</td>
        <td>${formatINR(inv.taxAmount)}</td>
        <td><strong>${formatINR(inv.total)}</strong></td>
        <td>${statusBadge(inv.status)}</td>
        <td>
          <div class="d-flex gap-1 flex-wrap">
            <button class="btn btn-sm btn-outline-secondary" onclick="previewInvoice('${inv._id}')" title="Preview"><i class="fa-solid fa-eye"></i></button>
            <button class="btn btn-sm btn-success" onclick="downloadPdf('${inv._id}')" title="PDF"><i class="fa-solid fa-download"></i></button>
            <select class="form-select form-select-sm status-select" onchange="updateStatus('${inv._id}', this.value)" style="width:auto;padding:0.3rem 0.5rem!important;font-size:0.75rem!important">
              <option value="draft" ${inv.status === 'draft' ? 'selected' : ''}>Draft</option>
              <option value="sent" ${inv.status === 'sent' ? 'selected' : ''}>Sent</option>
              <option value="paid" ${inv.status === 'paid' ? 'selected' : ''}>Paid</option>
              <option value="overdue" ${inv.status === 'overdue' ? 'selected' : ''}>Overdue</option>
            </select>
            <button class="btn btn-sm btn-danger" onclick="deleteInvoice('${inv._id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    body.innerHTML = '<tr><td colspan="9" class="text-center text-danger py-4">❌ Error loading invoices.</td></tr>';
  }
}

// ── Save Invoice ─────────────────────────────────────────────────
function saveInvoice() {
  const items = [];
  let valid = true;
  let subtotal = 0;
  
  document.querySelectorAll('#itemsBody tr').forEach(row => {
    const desc = row.querySelector('.item-desc')?.value.trim();
    const qty = parseFloat(row.querySelector('.item-qty')?.value);
    const price = parseFloat(row.querySelector('.item-price')?.value);
    if (!desc || isNaN(qty) || isNaN(price)) { valid = false; return; }
    const itemTotal = qty * price;
    subtotal += itemTotal;
    items.push({ description: desc, quantity: qty, price, total: itemTotal });
  });

  if (!valid || items.length === 0) { showToast('Please fill all item rows correctly.', 'error'); return; }

  const companyName = document.getElementById('companyName').value.trim();
  const clientName = document.getElementById('clientName').value.trim();
  if (!companyName || !clientName) { showToast('Company and Client name are required.', 'error'); return; }

  const taxPercentage = parseFloat(document.getElementById('taxPercentage').value) || 18;
  const taxAmount = (subtotal * taxPercentage) / 100;
  const total = subtotal + taxAmount;
  const invoiceNumber = 'INV-' + Math.floor(100000 + Math.random() * 900000);

  const payload = {
    _id: Date.now().toString(),
    invoiceNumber,
    companyName,
    companyEmail: document.getElementById('companyEmail').value,
    companyAddress: document.getElementById('companyAddress').value,
    clientName,
    clientEmail: document.getElementById('clientEmail').value,
    clientAddress: document.getElementById('clientAddress').value,
    date: document.getElementById('invoiceDate').value || new Date().toISOString().split('T')[0],
    dueDate: document.getElementById('dueDate').value || null,
    items,
    taxPercentage,
    subtotal,
    taxAmount,
    total,
    status: 'draft',
    notes: document.getElementById('invoiceNotes').value,
    createdAt: new Date().toISOString()
  };

  try {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    invoices.push(payload);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    
    showToast(`Invoice ${invoiceNumber} created!`);
    bootstrap.Modal.getInstance(document.getElementById('invoiceModal')).hide();
    document.getElementById('invoiceForm').reset();
    document.getElementById('itemsBody').innerHTML = '';
    itemCount = 0;
    addItemRow();
    recalculate();
    loadInvoices();
  } catch (e) {
    showToast(e.message || 'Failed to save invoice', 'error');
  }
}

// ── Preview Invoice ───────────────────────────────────────────────
function previewInvoice(id) {
  try {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const data = invoices.find(i => i._id === id);
    if (!data) throw new Error('Invoice not found');
    
    currentInvoice = data;
    document.getElementById('invoicePreviewContent').innerHTML = buildPreviewHTML(data);
    new bootstrap.Modal(document.getElementById('previewModal')).show();
  } catch (e) {
    showToast('Could not load invoice', 'error');
  }
}

function buildPreviewHTML(inv) {
  const itemRows = inv.items.map(i => `
    <tr>
      <td>${i.description}</td>
      <td style="text-align:center">${i.quantity}</td>
      <td style="text-align:right">${formatINR(i.price)}</td>
      <td style="text-align:right">${formatINR(i.total)}</td>
    </tr>
  `).join('');

  return `
    <div id="invoice-print" style="background:#fff;color:#111;padding:2.5rem;border-radius:12px;font-family:'Inter',sans-serif;max-width:760px;margin:0 auto">
      <!-- Header -->
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2rem">
        <div>
          <div style="font-size:1.8rem;font-weight:800;color:#6366f1">INVOICE</div>
          <div style="font-size:1rem;color:#64748b;margin-top:2px">${inv.invoiceNumber}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700;font-size:1.1rem">${inv.companyName}</div>
          <div style="color:#64748b;font-size:0.85rem">${inv.companyEmail || ''}</div>
          <div style="color:#64748b;font-size:0.85rem">${inv.companyAddress || ''}</div>
        </div>
      </div>

      <!-- Bill To / Dates -->
      <div style="display:flex;justify-content:space-between;margin-bottom:2rem;gap:2rem">
        <div>
          <div style="text-transform:uppercase;font-size:0.72rem;color:#94a3b8;font-weight:600;margin-bottom:0.5rem;letter-spacing:.08em">Bill To</div>
          <div style="font-weight:700">${inv.clientName}</div>
          <div style="color:#64748b;font-size:0.85rem">${inv.clientEmail || ''}</div>
          <div style="color:#64748b;font-size:0.85rem">${inv.clientAddress || ''}</div>
        </div>
        <div style="text-align:right">
          <div style="margin-bottom:0.4rem"><span style="color:#94a3b8;font-size:0.82rem">Date: </span><strong>${formatDate(inv.date)}</strong></div>
          ${inv.dueDate ? `<div><span style="color:#94a3b8;font-size:0.82rem">Due: </span><strong>${formatDate(inv.dueDate)}</strong></div>` : ''}
        </div>
      </div>

      <!-- Items Table -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="padding:.7rem 1rem;text-align:left;font-size:.78rem;color:#64748b;text-transform:uppercase">Description</th>
            <th style="padding:.7rem 1rem;text-align:center;font-size:.78rem;color:#64748b;text-transform:uppercase">Qty</th>
            <th style="padding:.7rem 1rem;text-align:right;font-size:.78rem;color:#64748b;text-transform:uppercase">Price</th>
            <th style="padding:.7rem 1rem;text-align:right;font-size:.78rem;color:#64748b;text-transform:uppercase">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>

      <!-- Totals -->
      <div style="display:flex;justify-content:flex-end">
        <div style="min-width:250px;background:#f8fafc;border-radius:10px;padding:1.2rem;border:1px solid #e2e8f0">
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="color:#64748b">Subtotal:</span><span>${formatINR(inv.subtotal)}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:.5rem"><span style="color:#64748b">GST (${inv.taxPercentage}%):</span><span>${formatINR(inv.taxAmount)}</span></div>
          <hr style="margin:.5rem 0;border-color:#e2e8f0" />
          <div style="display:flex;justify-content:space-between"><strong>Total:</strong><strong style="color:#6366f1;font-size:1.1rem">${formatINR(inv.total)}</strong></div>
        </div>
      </div>

      ${inv.notes ? `<div style="margin-top:2rem;padding:1rem;background:#f8fafc;border-radius:8px;font-size:0.85rem;color:#64748b"><strong>Notes:</strong> ${inv.notes}</div>` : ''}
    </div>
  `;
}

// ── PDF Download ──────────────────────────────────────────────────
function downloadPdf(id) {
  try {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const data = invoices.find(i => i._id === id);
    if (!data) throw new Error('Invoice not found');
    
    generatePDF(data);
  } catch (e) {
    showToast('Could not generate PDF', 'error');
  }
}

function generatePDF(inv) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  // Header
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 14, 22);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(inv.invoiceNumber, 14, 31);

  // Company Info (right)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  const compX = 196;
  doc.text(inv.companyName, compX, 15, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  if (inv.companyEmail) doc.text(inv.companyEmail, compX, 21, { align: 'right' });
  if (inv.companyAddress) doc.text(inv.companyAddress, compX, 27, { align: 'right' });

  doc.setTextColor(0, 0, 0);

  // Bill To
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('BILL TO', 14, 52);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(inv.clientName, 14, 59);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  if (inv.clientEmail) doc.text(inv.clientEmail, 14, 65);
  if (inv.clientAddress) doc.text(inv.clientAddress, 14, 71);

  // Dates
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9);
  doc.text(`Date: ${formatDate(inv.date)}`, 196, 52, { align: 'right' });
  if (inv.dueDate) doc.text(`Due: ${formatDate(inv.dueDate)}`, 196, 59, { align: 'right' });

  // Items table
  doc.autoTable({
    startY: 80,
    head: [['Description', 'Qty', 'Price (₹)', 'Total (₹)']],
    body: inv.items.map(i => [i.description, i.quantity, i.price.toFixed(2), i.total.toFixed(2)]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: { 1: { halign: 'center' }, 2: { halign: 'right' }, 3: { halign: 'right' } },
  });

  const finalY = doc.lastAutoTable.finalY + 8;

  // Totals box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(130, finalY, 66, 32, 3, 3, 'F');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Subtotal:', 135, finalY + 8);
  doc.setTextColor(0, 0, 0);
  doc.text(`Rs ${inv.subtotal.toFixed(2)}`, 192, finalY + 8, { align: 'right' });
  doc.setTextColor(100, 116, 139);
  doc.text(`GST (${inv.taxPercentage}%):`, 135, finalY + 16);
  doc.setTextColor(0, 0, 0);
  doc.text(`Rs ${inv.taxAmount.toFixed(2)}`, 192, finalY + 16, { align: 'right' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(99, 102, 241);
  doc.text('TOTAL:', 135, finalY + 27);
  doc.text(`Rs ${inv.total.toFixed(2)}`, 192, finalY + 27, { align: 'right' });

  // Notes
  if (inv.notes) {
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Notes: ' + inv.notes, 14, finalY + 45);
  }

  // Footer
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 285, 210, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for your business!', 105, 292, { align: 'center' });

  doc.save(`${inv.invoiceNumber}.pdf`);
  showToast(`PDF saved as ${inv.invoiceNumber}.pdf`);
}

// ── Status Update ─────────────────────────────────────────────────
function updateStatus(id, status) {
  try {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const index = invoices.findIndex(i => i._id === id);
    if (index !== -1) {
      invoices[index].status = status;
      localStorage.setItem('invoices', JSON.stringify(invoices));
      showToast(`Status updated to ${status}`);
    }
  } catch (e) {
    showToast('Status update failed', 'error');
  }
}

// ── Delete Invoice ────────────────────────────────────────────────
function deleteInvoice(id) {
  if (!confirm('Delete this invoice permanently?')) return;
  try {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const filtered = invoices.filter(i => i._id !== id);
    localStorage.setItem('invoices', JSON.stringify(filtered));
    showToast('Invoice deleted');
    loadInvoices();
  } catch (e) {
    showToast('Delete failed', 'error');
  }
}

// ── Events ────────────────────────────────────────────────────────
document.getElementById('addItemBtn').addEventListener('click', () => addItemRow());
document.getElementById('saveInvoiceBtn').addEventListener('click', saveInvoice);
document.getElementById('taxPercentage').addEventListener('input', recalculate);
document.getElementById('downloadPdfBtn').addEventListener('click', () => { if (currentInvoice) generatePDF(currentInvoice); });

// Set today's date
document.getElementById('invoiceDate').valueAsDate = new Date();

// Search & filter
let searchTimeout;
document.getElementById('searchInvoice').addEventListener('input', e => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => loadInvoices(e.target.value, document.getElementById('filterStatus').value), 350);
});
document.getElementById('filterStatus').addEventListener('change', e => {
  loadInvoices(document.getElementById('searchInvoice').value, e.target.value);
});

// Reset form on modal open
document.getElementById('invoiceModal').addEventListener('show.bs.modal', () => {
  document.getElementById('invoiceForm').reset();
  document.getElementById('itemsBody').innerHTML = '';
  itemCount = 0;
  addItemRow();
  document.getElementById('invoiceDate').valueAsDate = new Date();
  recalculate();
});

// Init
addItemRow();
recalculate();
loadInvoices();
