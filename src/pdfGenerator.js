// pdfGenerator.js
import { jsPDF } from "jspdf";

export const generatePDF = (formData, images) => {
  const doc = new jsPDF();
  
  // Título: grande, negrita, en color oscuro (contraste)
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Registro de Hallazgos", 20, 20);
  
  // Nombre debajo del título
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text("José Cortez Echeverria", 20, 30);
  
  // Espaciado y detalles en la sección
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  let y = 40;
  doc.text(`Hallazgo: ${formData.hallazgo}`, 20, y); y += 10;
  doc.text(`Ubicación: ${formData.ubicacion}`, 20, y); y += 10;
  doc.text(`Fecha: ${formData.fecha}`, 20, y); y += 10;
  doc.text(`Hora: ${formData.hora}`, 20, y); y += 10;
  
  // Descripción del hallazgo
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text("Descripción del Hallazgo:", 20, y); y += 10;
  doc.setFontSize(14);
  doc.text(formData.descripcion, 30, y, { maxWidth: 160 }); y += 20;
  
  // Notas adicionales
  doc.setFontSize(16);
  doc.setTextColor(60, 60, 60);
  doc.text("Notas Adicionales:", 20, y); y += 10;
  doc.setFontSize(14);
  doc.text(formData.notas, 30, y, { maxWidth: 160 }); y += 20;
  
  // Sección de fotos
  if (images.length > 0) {
    doc.addPage();
    doc.setTextColor(30, 30, 30);
    doc.text("Anexos - Fotografías", 20, 20);
    
    let x = 20;
    y = 30;
    const imgWidth = 180;
    const imgHeight = 100;
    
    images.forEach((img, index) => {
      if (y + imgHeight > 280) {
        doc.addPage();
        doc.text("Anexos - Fotografías (continuación)", 20, 20);
        y = 30;
      }
      doc.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
      y += imgHeight + 10;
    });
  }
  
  doc.save("hallazgo.pdf");
};