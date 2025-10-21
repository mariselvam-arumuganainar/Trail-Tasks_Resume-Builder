import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function downloadResumePDF(filename: string = 'resume'): Promise<void> {
  try {
    // Get the visible preview element
    const previewElement = document.querySelector('.resume-canvas-content') as HTMLElement;
    
    if (!previewElement) {
      throw new Error('Resume preview not found');
    }

    // Store original styles
    const originalOverflow = previewElement.style.overflow;
    const originalHeight = previewElement.style.height;

    // Add print mode to hide edit controls
    document.body.classList.add('pdf-export-mode');

    // Make all content visible
    previewElement.style.overflow = 'visible';
    previewElement.style.height = 'auto';

    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 500));

    // Capture at high quality
    const canvas = await html2canvas(previewElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: previewElement.scrollWidth,
      height: previewElement.scrollHeight,
    });

    // Restore styles
    previewElement.style.overflow = originalOverflow;
    previewElement.style.height = originalHeight;
    document.body.classList.remove('pdf-export-mode');

    // Create PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;
    let heightLeft = imgHeight;

    // Add pages
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${filename}.pdf`);

  } catch (error) {
    document.body.classList.remove('pdf-export-mode');
    console.error('PDF error:', error);
    throw error;
  }
}
