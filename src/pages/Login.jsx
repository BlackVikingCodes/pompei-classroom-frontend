import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [strongPassword, setStrongPassword] = useState(false)
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  useEffect(() => {
    let regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
    if(regexPass.test(password) && password.length>=8){
      setStrongPassword(true)
    } else{
      setStrongPassword(false)
    }
  
  }, [password])
  
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>User Name:</label>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      {!strongPassword && 
        <div>
          <p>Your password isn't strong enough. <br/> Make sure to have:</p>
          <ul>
            <li>At least one uppercase letter</li>
            <li>At least one number</li>
            <li>At least one symbol</li>
          </ul>
        </div>
      }

      <button className="btn btn-login" disabled={isLoading||!strongPassword}>Log in</button>
      {error && <div className="error">{error}</div>}
      <br/>
      <Link to="/signup" className="switch-link">
        Don't have an account?
      </Link>
    </form>
  )
}

export default Login