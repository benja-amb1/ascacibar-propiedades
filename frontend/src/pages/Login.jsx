import React from 'react'
import { Layout } from '../components/Layout'
import { useUsers } from '../hooks/useUsers'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { login, msgError, msgSuccess, formData, setFormData } = useUsers();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    setTimeout(() => {
      navigate('/')
    }, 3000);
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" placeholder='Email' name='email' value={formData.email} onChange={e => handleChange(e)} />

        <label>Contraseña:</label>
        <input type="password" placeholder='Contraseña' name='password' value={formData.password} onChange={e => handleChange(e)} />

        <button>Loguearse</button>

        {msgError && <p>{msgError}</p>}
        {msgSuccess && <p>{msgSuccess}</p>}
      </form>
    </Layout>
  )
}

export { Login }