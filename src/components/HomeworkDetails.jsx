import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHomeworksContext } from '../hooks/useHomeworksContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const HomeworkDetails = ({ homework }) => {
  const { dispatch } = useHomeworksContext()
  const { user } = useAuthContext()

  const [isDone, setIsDone] = useState(false)

  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('https://pompei-classroom-api.fly.dev/api/homework/' + homework._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_HOMEWORK', payload: json})
    }
  }

  const handleEdit = () => {
    if (!user) {
      return
    }

    navigate('/' + homework._id)
  }

  const handleDone = (e) => {
    setIsDone(prev => !prev)
  }

  return (
    <div className="homework-details" data-done={`${isDone}`}>
      <h4 className='accent-title'>{homework.title}</h4>
      <p><strong>content: </strong></p>
      <p>{homework.content}</p>
      <br/>
      <p><strong>grade: </strong> <span id='accent'>{homework.grade}</span></p>
      <br/>
      <p>{formatDistanceToNow(new Date(homework.createdAt), { addSuffix: true })}</p>
      { (user.teacher || user.Teacher) && <span className="material-symbols-outlined btn-icon btn-edit" onClick={handleEdit}>edit</span>}
      { (user.teacher || user.Teacher) && <span className="material-symbols-outlined btn-icon btn-del" onClick={handleDelete}>delete</span>}
      { (!user.teacher && !user.Teacher) && <span className="material-symbols-outlined btn-icon btn-done" onClick={handleDone}>done</span>}
    </div>
  )
}

export default HomeworkDetails