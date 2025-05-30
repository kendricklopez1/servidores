import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Phone, BadgePlus } from 'lucide-react';

const Empleados = () => {
  const [empleado, setEmpleados] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    telefono: '',
    DUI: '',
    dirreccion: '',
    puesto: '',
    fehcaContra:'',
    salario:''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('https://servidores.onrender.com/api/empleadoRoutes', empleado, {
        headers: { 'Content-Type': 'application/json' },
      });
      setEmpleados({
        nombre: '',
        correo: '',
        contrasena: '',
        telefono: '',
        DUI: '',
        dirreccion: '',
        puesto: '',
        fehcaContra:'',
        salario:''
      });
      alert('Su empelado se agregado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al agregar el empleado');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const styles = `
      .clientes-container {
  background: radial-gradient(circle at top right, #1e1e2f, #0e0e1a);
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clientes-form-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(30px);
  padding: 3rem 2rem;
  border-radius: 24px;
  width: 100%;
  max-width: 960px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6), 0 0 10px rgba(255, 255, 255, 0.05) inset;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.clientes-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #ff6ec4;
  background: linear-gradient(to right, #ff6ec4, #7873f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 110, 196, 0.4);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
}

.form-group label {
  color: #cfcfcf;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  display: block;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #ff6ec4;
  box-shadow: 0 0 12px rgba(255, 110, 196, 0.4);
  background: rgba(255, 255, 255, 0.12);
}

.submit-button {
  margin-top: 2rem;
  padding: 1rem 2.2rem;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(135deg, #ff6ec4, #7873f5);
  box-shadow: 0 6px 20px rgba(255, 110, 196, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 110, 196, 0.5);
}

    `;
    const style = document.createElement('style');
    style.innerText = styles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="clientes-container">
      <h1 className="clientes-title">Agregar Empleado</h1>
      <form className="clientes-form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label><User size={16} />Nombre</label>
            <input className="form-input" value={empleado.nombre} onChange={e => setEmpleados({ ...empleado, nombre: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Mail size={16} />Correo</label>
            <input className="form-input" type="email" value={empleado.correo} onChange={e => setEmpleados({ ...empleado, correo: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Lock size={16} />Contraseña</label>
            <input className="form-input" type="password" value={empleado.contrasena} onChange={e => setEmpleados({ ...empleado, contrasena: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><Phone size={16} />Teléfono</label>
            <input className="form-input" value={empleado.telefono} onChange={e => setEmpleados({ ...empleado, telefono: e.target.value })} required />
          </div>
          <div className="form-group">
            <label><BadgePlus size={16} />DUI</label>
            <input className="form-input" value={empleado.DUI} onChange={e => setEmpleados({ ...empleado, DUI: e.target.value })} required />
          </div>
           <div className="form-group">
            <label><BadgePlus size={16} />Dirrecion</label>
            <input className="form-input" value={empleado.dirreccion} onChange={e => setEmpleados({ ...empleado, dirreccion: e.target.value })} required />
          </div>
           <div className="form-group">
            <label><BadgePlus size={16} />Puesto</label>
            <input className="form-input" value={empleado.puesto} onChange={e => setEmpleados({ ...empleado, puesto: e.target.value })} required />
          </div>
           <div className="form-group">
            <label><BadgePlus size={16} />Fecha de contratacion</label>
            <input className="form-input" value={empleado.fehcaContra} onChange={e => setEmpleados({ ...empleado, fehcaContra: e.target.value })} required />
          </div>
           <div className="form-group">
            <label><BadgePlus size={16} />Salario</label>
            <input className="form-input" type='number' value={empleado.salario} onChange={e => setEmpleados({ ...empleado, salario: e.target.value })} required />
          </div>
        </div>
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Agregando...' : 'Agregar Empleado'}
        </button>
      </form>
    </div>
  );
};

export default Empleados;
