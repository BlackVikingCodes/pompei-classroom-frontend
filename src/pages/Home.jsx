import { useEffect, useState } from 'react'
import { useHomeworksContext } from "../hooks/useHomeworksContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import HomeworkDetails from '../components/HomeworkDetails'
import HomeworkForm from '../components/HomeworkForm'
import PomodoroMain from '../components/Pomodoro/PomodoroMain'

const Home = () => {
  const {homeworks, dispatch} = useHomeworksContext()
  const {user} = useAuthContext()

  const [rightOnes, setRightOnes] = useState()

  useEffect(() => {
    const fetchHomeworks = async () => {
      const response = await fetch('https://pompei-classroom-api.fly.dev/api/homework', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      const jsonSorted = json.sort((a,b) => {
        if(a.grade > b.grade){
          return -1
        }
        if(b.grade > a.grade){
          return 1
        }
        else {
          return 0
        }
      })
      console.log(json)
      console.log(jsonSorted)
      

      
      if (response.ok) {
        dispatch({type: 'SET_HOMEWORKS', payload: jsonSorted})

      }
  
    }

    if (user) {
      fetchHomeworks()
    }
    
  }, [dispatch, user])

  useEffect(() =>{
    if(homeworks && homeworks.length>0){
      /* homeworks.forEach(homework => console.log(homework.grade)) */
      let studentOnes = homeworks.filter(homework => homework.grade===(parseInt(user.grade)||parseInt(user.Grade)))
      let teacherOnes = homeworks.filter(homework => homework.user_id === user.userId)
      
      if(!user.Teacher && !user.teacher){
        setRightOnes([...studentOnes])
      }
      if(user.Teacher || user.teacher){
        setRightOnes([...teacherOnes])
      }


    }
  }, [homeworks,user])
  
  

  return (
    <>
      {(user.Teacher||user.teacher) && <HomeworkForm />}
    <div className="home">
      { (!user.teacher && !user.Teacher) && 
      <section className="tools">
        <div className="pomodoro">
          <PomodoroMain />
        </div>
      </section>}
      <section className="homeworks-container">
        <h2>Your Homeworks</h2>
        <div className="homeworks">
          {rightOnes && rightOnes.map((homework) => (
            <HomeworkDetails key={homework._id} homework={homework} />
            ))}
        </div>
      </section>
    </div>
    </>
  )
}

export default Home