import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Inicio } from '../pages/Inicio'

const RoutingApp = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Inicio />} />


      </Routes>
    </BrowserRouter>
  )
}

export { RoutingApp }