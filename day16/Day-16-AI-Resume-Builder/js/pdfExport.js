/**
 * pdfExport.js
 * Handles PDF generation via html2canvas + jsPDF.
 */

window.PDFExporter = {

  /**
   * Export the #resumePaper element as a PDF.
   * @param {string} filename
   */
  async exportPDF(filename = 'resume.pdf') {
    const paper = document.getElementById('resumePaper');
    if (!paper) return;

    // Check if resume has been generated
    if (paper.querySelector('.empty-state')) {
      window.showToast('Please generate your resume first!', 'error');
      return;
    }

    window.showToast('Preparing PDF…', 'info');
    window.showAIOverlay('Generating your PDF…');

    try {
      // Temporarily scale to 1 for capture
      const prevTransform = paper.style.transform;
      paper.style.transform = 'scale(1)';
      paper.style.transformOrigin = 'top left';

      const canvas = await html2canvas(paper, {
        scale: 2,           // 2x resolution for crisp PDF
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: paper.offsetWidth,
        height: paper.scrollHeight
      });

      paper.style.transform = prevTransform;

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const { jsPDF } = window.jspdf;

      // A4 page size in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let position = 0;
      let heightLeft = imgHeight;

      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add extra pages if resume is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(filename);
      window.showToast('✅ PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF export error:', err);
      window.showToast('PDF export failed. Try again.', 'error');
    } finally {
      window.hideAIOverlay();
    }
  }
};
