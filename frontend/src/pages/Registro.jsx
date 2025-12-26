import React from 'react'
import { useUsers } from '../hooks/useUsers'
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Registro = () => {

  const { formData, setFormData, registerUser, msgError, msgSuccess } = useUsers();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='Nombre' value={formData.name} onChange={e => handleChange(e)} />
        <input type="text" name='surname' placeholder='Apellido' value={formData.surname} onChange={e => handleChange(e)} />
        <input type="email" name='email' placeholder='Email' value={formData.email} onChange={e => handleChange(e)} />
        <input type="password" name='password' placeholder='Password' value={formData.password} onChange={e => handleChange(e)} />
        <button>Registrarse</button>

        {msgError && <p>{msgError}</p>}
        {msgSuccess && <p>{msgSuccess}</p>}
      </form>
    </Layout>
  )
}

export { Registro }