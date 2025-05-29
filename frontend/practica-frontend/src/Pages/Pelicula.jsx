import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film, Upload, Plus, Sparkles, Camera, Star, Clock, Calendar, User } from 'lucide-react';

const Peliculas = ({ refreshMovies }) => {
  const [movie, setMovie] = useState({
    titulo: '',
    descripcion: '',
    director: '',
    genero: '',
    anio: '',
    duracion: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('titulo', movie.titulo);
    formData.append('descripcion', movie.descripcion);
    formData.append('director', movie.director);
    formData.append('genero', movie.genero);
    formData.append('anio', movie.anio);
    formData.append('duracion', movie.duracion);
    if (movie.image) {
      formData.append('img', movie.image);
    }

    try {
      await axios.post('https://mern-2-a-mxxm.vercel.app/api/PeliRoutes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMovie({
        titulo: '',
        descripcion: '',
        director: '',
        genero: '',
        anio: '',
        duracion: '',
        image: null,
      });
      alert('¡Película agregada con éxito!');
      if (refreshMovies) refreshMovies();
    } catch (error) {
      alert('Error al agregar su película');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMovie({ ...movie, image: file });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setMovie({ ...movie, image: e.dataTransfer.files[0] });
    }
  };

  useEffect(() => {
    const styles = `
      .movies-container {
  background: linear-gradient(120deg, #0a0f1c, #161b2e, #0a0f1c);
  min-height: 100vh;
  overflow: hidden;
  padding: 4rem 2rem;
  animation: bgPulse 10s ease infinite;
}

@keyframes bgPulse {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.movies-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.movies-header {
  text-align: center;
  margin-bottom: 3rem;
}

.movies-title {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #00ffe7, #7d5fff, #ff00d4);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  animation: neonGradient 6s ease infinite;
  text-shadow: 0 0 10px #00ffe7, 0 0 20px #7d5fff, 0 0 30px #ff00d4;
}

@keyframes neonGradient {
  0%, 100% { background-position: left center; }
  50% { background-position: right center; }
}

.movies-form-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 3rem;
  border-radius: 24px;
  max-width: 1100px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.1), 0 0 40px rgba(255, 0, 212, 0.1);
  backdrop-filter: blur(30px);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-group label {
  color: #b0f8ff;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  display: block;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 14px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #00ffe7;
  box-shadow: 0 0 12px rgba(0, 255, 231, 0.6);
  background: rgba(255, 255, 255, 0.1);
  outline: none;
}

.upload-area {
  border: 2px dashed rgba(255, 0, 212, 0.4);
  border-radius: 18px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  color: #ffffffb0;
}

.upload-area:hover {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 10px rgba(255, 0, 212, 0.2);
}

.submit-button {
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #00ffe7, #ff00d4);
  color: #000;
  border: none;
  border-radius: 18px;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(255, 0, 212, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(0, 255, 231, 0.5);
}

    `;
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  return (
    <div className="movies-container" onDragEnter={handleDrag}>
      <div className="movies-content">
        <div className="movies-header">
          <Film size={48} color="#fff" />
          <h1 className="movies-title">Cinepolis</h1>
          <Sparkles size={32} color="#fff" />
        </div>
        <form className="movies-form-card" onSubmit={handleSubmit} onDragOver={handleDrag} onDrop={handleDrop}>
          <div className="form-grid">
            <div className="form-group">
              <label><Star size={16} />Título</label>
              <input className="form-input" value={movie.titulo} onChange={e => setMovie({ ...movie, titulo: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><User size={16} />Director</label>
              <input className="form-input" value={movie.director} onChange={e => setMovie({ ...movie, director: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><Film size={16} />Género</label>
              <input className="form-input" value={movie.genero} onChange={e => setMovie({ ...movie, genero: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><Calendar size={16} />Año</label>
              <input type="number" className="form-input" value={movie.anio} onChange={e => setMovie({ ...movie, anio: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><Clock size={16} />Duración</label>
              <input type="number" className="form-input" value={movie.duracion} onChange={e => setMovie({ ...movie, duracion: e.target.value })} required />
            </div>
            <div className="form-group">
              <label><Camera size={16} />Descripción</label>
              <textarea className="form-textarea" value={movie.descripcion} onChange={e => setMovie({ ...movie, descripcion: e.target.value })} required />
            </div>
            <div className="form-group full-width">
              <div className={`upload-area ${dragActive ? 'drag-active' : ''}`}>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="upload-input" />
                <label htmlFor="upload-input" style={{ display: 'block', cursor: 'pointer' }}>
                  <Upload size={40} />
                  <div>{movie.image ? movie.image.name : 'Arrastra o selecciona una imagen'}</div>
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Agregando...' : 'Agregar Película'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Peliculas;
