import { NavLink } from 'react-router'

function LibraryHeader() {
  return (
    <header className="app-header">
      <h1>Welcome to the Library System</h1>
      <p>This library system helps you manage books and offices.</p>
      <nav className="office-navigation" aria-label="Main navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'nav-button active' : 'nav-button'
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/Office"
          className={({ isActive }) =>
            isActive ? 'nav-button active' : 'nav-button'
          }
        >
          Offices
        </NavLink>
        <NavLink
          to="/LibraryBooks"
          className={({ isActive }) =>
            isActive ? 'nav-button active' : 'nav-button'
          }
        >
          Books
        </NavLink>
      </nav>
    </header>
  )
}

export default LibraryHeader