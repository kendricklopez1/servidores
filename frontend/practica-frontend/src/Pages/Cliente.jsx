import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Phone, BadgePlus } from 'lucide-react';

const Clientes = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    DUI: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('https://mern-2a-1.onrender.com/api/ClienteRoutes', cliente, {
        headers: { 'Content-Type': 'application/json' },
      });
      setCliente({
        nombre: '',
        correo: '',
        contrasena: '',
        telefono: '',
        DUI: ''
      });
      alert('Su cliente se ha agregado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al agregar el cliente');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const styles = `
      .clientes-container {
  background: radial-gradient(circle at top left, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clientes-form-card {
  background: linear-gradient(145deg, #1a1a1a, #111);
  padding: 3rem 2rem;
  border-radius: 28px;
  max-width: 1000px;
  width: 100%;
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.15), 0 0 80px rgba(0, 255, 255, 0.1) inset;
  transition: all 0.4s ease;
}

.clientes-title {
  text-align: center;
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 3px;
  color: #00f0ff;
  text-shadow: 0 0 10px #00f0ff, 0 0 30px #00f0ff;
  margin-bottom: 2rem;
  animation: neon-glow 2s infinite alternate;
}

@keyframes neon-glow {
  from {
    text-shadow: 0 0 10px #00f0ff, 0 0 30px #00f0ff;
  }
  to {
    text-shadow: 0 0 20px #00ffff, 0 0 60px #00ffff;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.form-group label {
  color: #00f0ff;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: capitalize;
  margin-bottom: 0.4rem;
  display: block;
  transition: color 0.3s ease;
}

.form-input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 14px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  border-color: #00f0ff;
  box-shadow: 0 0 10px #00f0ff, 0 0 30px #00f0ff;
  background: rgba(0, 0, 0, 0.5);
}

.submit-button {
  margin-top: 2.5rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(to right, #00f0ff, #00ffe1);
  color: #000;
  border-radius: 16px;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.6);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.submit-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.9);
}

    `;
    const style = document.createElement('style');
    style.innerText = styles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="clientes-container">
      <h1 className="clientes-title">Agregar Cliente</h1>
      <form className="clientes-form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label><User size={16} />Nombre</label>
            <input className="form-input" value={cliente.nombre} onChange={e => setCliente({ ...cliente, nombre: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Mail size={16} />Correo</label>
            <input className="form-input" type="email" value={cliente.correo} onChange={e => setCliente({ ...cliente, correo: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Lock size={16} />Contraseña</label>
            <input className="form-input" type="password" value={cliente.contrasena} onChange={e => setCliente({ ...cliente, contrasena: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Phone size={16} />Teléfono</label>
            <input className="form-input" value={cliente.telefono} onChange={e => setCliente({ ...cliente, telefono: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><BadgePlus size={16} />DUI</label>
            <input className="form-input" value={cliente.DUI} onChange={e => setCliente({ ...cliente, DUI: e.target.value })} required />
          </div>
        </div>
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Agregando...' : 'Agregar Cliente'}
        </button>
      </form>
    </div>
  );
};

export default Clientes;
