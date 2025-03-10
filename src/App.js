import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./styles/App.css";

function App() {
  const [formData, setFormData] = useState({
    hallazgo: "",
    ubicacion: "",
    fecha: "",
    hora: "",
    descripcion: "",
    notas: ""
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Título: grande, negrita, en color oscuro (contraste)
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30); // Gris oscuro
    doc.text("Registro de Hallazgos", 20, 20);
    
    // Nombre debajo del título: tamaño de fuente más pequeño pero legible
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80); // Gris medio
    doc.text("José Cortez Echeverria", 20, 30);
    
    // Espaciado y detalles en la sección
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50); // Gris oscuro para los detalles

    let y = 40;
    doc.text(`Hallazgo: ${formData.hallazgo}`, 20, y); y += 10;
    doc.text(`Ubicación: ${formData.ubicacion}`, 20, y); y += 10;
    doc.text(`Fecha: ${formData.fecha}`, 20, y); y += 10;
    doc.text(`Hora: ${formData.hora}`, 20, y); y += 10;
    
    // Descripción del hallazgo: se hace un poco más grande para resaltar
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40); // Gris aún más oscuro
    doc.text("Descripción del Hallazgo:", 20, y); y += 10;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(formData.descripcion, 30, y, { maxWidth: 160 }); y += 20;
    
    // Notas adicionales: gris más suave para las notas
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60); // Gris intermedio
    doc.text("Notas Adicionales:", 20, y); y += 10;
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text(formData.notas, 30, y, { maxWidth: 160 }); y += 20;
    
    // Sección de fotos, si existen
    if (images.length > 0) {
      doc.addPage();
      doc.setTextColor(30, 30, 30); // Gris oscuro para la sección de fotos
      doc.text("Anexos - Fotografías", 20, 20);
      
      let x = 20;
      y = 30;
      const imgWidth = 180; // Ajuste del tamaño de las fotos
      const imgHeight = 100;

      images.forEach((img, index) => {
        if (y + imgHeight > 280) { // Si no cabe en la página, agregamos una nueva
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

  return (
    <div className="app-container">
      <h1>Registro de Hallazgos</h1>
      <form>
        <label>
          Hallazgo:
          <input
            type="text"
            name="hallazgo"
            value={formData.hallazgo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Ubicación:
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Hora:
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Descripción del Hallazgo:
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Notas Adicionales:
          <textarea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
          />
        </label>
        <label>
          Fotos:
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        </label>
        <div className="image-preview">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`preview-${index}`} className="thumbnail" />
          ))}
        </div>
        <button type="button" onClick={generatePDF}>Generar PDF</button>
      </form>
    </div>
  );
}

export default App;
