import { useState } from 'react'
import { Link } from 'react-router-dom'
import Switch from 'react-switch'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useThemeContext } from '../hooks/useThemeContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const {theme, toggleTheme} = useThemeContext()

  const [showMenu, setShowMenu] = useState()
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    logout()
  }

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleCheck = () => {
    setChecked(!checked)
    toggleTheme()
  }

  return (
    <header id={theme}>
      <div className="container">
        <Link to="/">
          <h1>Pompei Classroom</h1>
        </Link>
        <Switch 
          onChange={handleCheck}
          checked={checked}
          onColor="#0788ab"
          offColor='#3b3b3b'
          offHandleColor='#0788ab'
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          checkedIcon={<div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 5,
            color: '#fff'
          }}
        >
        <span className="material-symbols-outlined">
          light_mode
        </span>
        </div>
        }
          uncheckedIcon={<div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "5px",
            fontWeight: 800,
            color: '#0788ab'
          }}
        >
        <span className="material-symbols-outlined">
          dark_mode
        </span>
        </div>
        }
        />
        <button
          className='menu-btn'
          onClick={handleMenu}
        >
          <span className="material-symbols-outlined" id='accent'>
            menu
          </span>
        </button>
        <nav id={!showMenu && 'hidden'}>
          {user && (
            <div>
              <span className='nav__user-name'>Hey, {user.email}!</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar