import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

const NewHomework = () => {
  const {user} = useAuthContext()

  const { id } = useParams()
  const navigate = useNavigate()


  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [grade, setGrade] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHomework = async () => {
      const response = await fetch(`https://pompei-classroom-api.fly.dev/api/homework/${id}`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      const current = json.filter(homework => homework._id === id)
      setTitle(current[0].title)
      setContent(current[0].content)
      setGrade(current[0].grade)
      console.log(json)
      console.log(current[0].title)
    }

      fetchHomework()
  }, [id, user.token])

  const saveHomework = async (e) => {
    if (!user) {
      setError('You must be logged in')
      return
    }

    const homework = {title, content, grade}

    const response = await fetch(`https://pompei-classroom-api.fly.dev/api/homework/${id}`, {
      method: 'PUT',
      body: JSON.stringify(homework),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setTitle('')
      setContent('')
      setError(null)
    }

    navigate('/')
  }


  if(grade<0){
    setGrade(0)
  }

  const handlePlus = () => {
    setGrade(prev => prev+1)
  }
  const handleMinus = () => {
    setGrade(prev => prev-1)
  }


  return (
    <div className="home newHomework__component">
      
      <section className='homeworks-container'>
        <input 
          name='title' 
          type='text' 
          placeholder='Homework Title' 
          className='title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea 
          name="test" 
          id="test" 
          cols="30" 
          rows="10" 
          placeholder='Content'
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <div className='counter-component'>
          <span>Grade: </span>
          <button onClick={handleMinus}>-</button>
          <span><strong>{grade}</strong></span>
          <button onClick={handlePlus}>+</button>
        </div>
        <br/>
        <button className='btn btn-save' onClick={saveHomework}>Save</button>
        {error && <div className="error">{error}</div>}
      </section>
    </div>
  )
}

export default NewHomework