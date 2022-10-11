import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [teacher, setTeacher] = useState(false)
  const [grade, setGrade] = useState(0)
  const [password, setPassword] = useState('')
  const [strongPassword, setStrongPassword] = useState(false)
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, teacher, grade)
  }

  useEffect(() => {
    let regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
    if(regexPass.test(password) && password.length>=8){
      setStrongPassword(true)
    } else{
      setStrongPassword(false)
    }
  
  }, [password])

  const handleTeacher = (e) => {
    setTeacher(!teacher)
    setGrade(0)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email:</label>
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
      <label>Grade:</label>
      <input 
        type="number"
        name="grade"
        id="grade"
        min="0"
        onChange={(e) => setGrade(e.target.value)}
        readOnly={teacher}
        value={grade}
      />
      <label>Are you a Teacher?
        </label>
      
      <input
       type="checkbox"
       name="teacher"
       id="teacher_check"
       style={{width:'auto'}}
       checked={teacher}
       onChange={handleTeacher}
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

      <button className="btn btn-signup" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      <br/>
      <Link to="/login" className='switch-link'>
        Already have an account?
      </Link>
    </form>
  )
}

export default Signup