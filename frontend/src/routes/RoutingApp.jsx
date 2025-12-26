import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Inicio } from '../pages/Inicio'
import { Registro } from '../pages/Registro'
import { Login } from '../pages/Login'

const RoutingApp = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Inicio />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RoutingApp }