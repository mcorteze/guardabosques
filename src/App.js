import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { generatePDF } from "./pdfGenerator";
import "./styles/App.css";
import "./App.css";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [activeField, setActiveField] = useState("");

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

  const openModal = (field) => {
    if (window.innerWidth < 800) {
      setActiveField(field);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="app-container">
      <h1>Registro de Hallazgos</h1>
      <form>
        <label>
          Hallazgo:
          <Input
            type="text"
            name="hallazgo"
            value={formData.hallazgo}
            onChange={handleChange}
            onClick={() => openModal("hallazgo")}
            required
          />
        </label>
        <label>
          Ubicación:
          <Input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            onClick={() => openModal("ubicacion")}
            required
          />
        </label>
        <label>
          Fecha:
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        </label>
        <label>
          Hora:
          <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
        </label>
        <br />
        <br />
        <label>
          Descripción del Hallazgo:
          <Input.TextArea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            onClick={() => openModal("descripcion")}
            required
          />
        </label>
        <label>
          Notas Adicionales:
          <Input.TextArea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            onClick={() => openModal("notas")}
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
        <button type="button" onClick={() => generatePDF(formData, images)}>
          Generar PDF
        </button>
      </form>

      <Modal
        title=""
        open={modalVisible}
        onCancel={closeModal}
        footer={[<Button key="ok" type="primary" onClick={closeModal}>Aceptar</Button>]}
        width="100vw"
        style={{ top: 0, padding: 0 }}
        bodyStyle={{ height: "100%", padding: "10px" }}
        closable={false}
      >
        <Input.TextArea
          value={formData[activeField]}
          onChange={(e) => setFormData({ ...formData, [activeField]: e.target.value })}
          autoSize={{ minRows: 20, maxRows: 30 }}
          style={{ width: "100%", height: "100%", fontSize: "16px", border: "none" }}
        />
      </Modal>
    </div>
  );
}

export default App;