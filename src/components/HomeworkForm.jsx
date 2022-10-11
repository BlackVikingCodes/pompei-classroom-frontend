import { useState } from "react"
import { useHomeworksContext } from "../hooks/useHomeworksContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const HomeworkForm = () => {
  const { dispatch } = useHomeworksContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [grade, setGrade] = useState(0)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  let isTeacher
  Object.keys(user).includes('Teacher') ? isTeacher = user.Teacher : isTeacher = user.teacher
  


  const newHomework = async (e) => {
    if (!user) {
      setError('You must be logged in')
      return
    }

    const homework = {title, content, grade, teacher:isTeacher}
    console.log(homework)

    const response = await fetch('https://pompei-classroom-api.fly.dev/api/homework', {
      method: 'POST',
      body: JSON.stringify(homework),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    console.log(json)

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setTitle('')
      setContent('')
      setGrade(0)
      setError(null)
      dispatch({type: 'CREATE_HOMEWORK', payload: json})
    }

    navigate(`/${json._id}`)
  }

  return (
    <>
      <button className="btn btn-new" onClick={newHomework}>
        Create New Homework
      </button>
      {error && <div className="error">{error}</div>}
    </>
  )
}

export default HomeworkForm