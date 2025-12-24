import { NavLink } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <img src="https://www.camaltec.es/wp-content/uploads/2016/11/URBAN-LOGO-FINAL-1.png" alt="Logo Ascacibar Inmobiliaria" />

        <nav>
          <ul>
            <li>
              <NavLink to={'/inicio'}>Inicio</NavLink>
            </li>
            <li>
              <NavLink to={'/propiedades'}>Propiedades</NavLink>
            </li>
            <li>
              <NavLink to={'/login'}>Login</NavLink>
            </li>
            <li>
              <NavLink to={'/registro'}>Registro</NavLink>
            </li>
            <li>
              <NavLink to={'/contacto'}>Contacto</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {children}
      </main>

      <footer>
        <p>Sitio desarrollado por benja-dev. Todos los derechos reservados {new Date().getFullYear()} &copy;</p>
      </footer>

    </>
  )
}

export { Layout }