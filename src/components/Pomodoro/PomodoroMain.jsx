import React, { useState, useRef } from 'react'
import Countdown, {zeroPad} from 'react-countdown';
import classNames from 'classnames'
/* import tone from '../../tone.mp3'
import same from '../../to' */

//COMPONENTS
import PomodoroButton from './PomodoroButton';

function PomodoroMain() {
  
  /*================ useState Timer Mode =================== */
  
  const [timerMode, setTimerMode] = useState('Pomodoro')
  const [resetPomodoros, setResetPomodoros] = useState(false)
 
  const timerClasses = classNames({
    'timer-counter-pomodoro': timerMode==='Pomodoro',
    'timer-counter-break': timerMode==='Break',
    'timer-counter-long-break': timerMode==='Long-break',
  })
  
  const modeClasses = classNames({
    'timer-mode-pomodoro': timerMode==='Pomodoro',
    'timer-mode-break': timerMode==='Break',
    'timer-mode-long-break': timerMode==='Long-break',
  })
  
  /*================ react-timer Renderer logic =================== */
  
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Timer completed</span>;
    } else {
      // Render a countdown
      return <h3 className={timerClasses}>{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</h3>;
    }
  };
  
  /*================ useRef for Timer Element and Pomodoro Counter =================== */
  
  const timerRef = useRef()
  const pomodoroCounter = useRef(0)

  /*================ Logic for Timer Buttons =================== */
  
  const playTimer = (e) => {
    if((pomodoroCounter.current===0 || resetPomodoros )&& e.target.clicked){
      setTimerMode('Pomodoro')
    }
    timerRef.current.start()
  }

  const pauseTimer = () => {
    timerRef.current.pause()
  }

  const stopTimer = () => {
    timerRef.current.stop()
  }

  const resetCounter = () => {
    setResetPomodoros(true)
    setTimerMode('Pomodoro')
    pomodoroCounter.current = pomodoroCounter.current - pomodoroCounter.current
    setTimeout(() => {
      resetPomodoros && setResetPomodoros(false)
    }, 0)
  }
  
  /*================ Logic for timerMode changing automagically =================== */
  
/*   const audio = new Audio(tone)*/
  const handleComplete = () => {
    if(timerMode==='Pomodoro' && (pomodoroCounter.current%4)===3 && pomodoroCounter.current!==0){
/*       audio.play()
 */      setTimerMode('Long-break')
    }
    if((timerMode==='Pomodoro' && (pomodoroCounter.current%4)!==3) || pomodoroCounter.current===0){
/*       audio.play()
 */      setTimerMode('Break')
    }
    if(timerMode==='Break'){
/*       audio.play()
 */      pomodoroCounter.current = pomodoroCounter.current + 1
      setTimerMode('Pomodoro')
    }
    if(timerMode==='Long-break'){
/*       audio.play()
 */      pomodoroCounter.current = pomodoroCounter.current + 1
      setTimerMode('Pomodoro')
    }
    
  }

  /*================ Number of Minutes for each Mode =================== */

  let number = 600000

  if (timerMode==='Pomodoro') {
    number=25*60000
  } if (timerMode==='Break') {
    number=5*60000
  } if (timerMode==='Long-break') {
    number=15*60000
  }

  return (
      <div>
        <h2 className='timer-component__title'>Pomodoro Timer</h2>
        <p>The current mode is: <b className={modeClasses}>{timerMode}</b></p>
        <div>
          <Countdown
            date={Date.now() + number}
            renderer={renderer}
            onComplete={handleComplete}
            autoStart={false}
            ref={timerRef}
          />
        </div>
        <div className="timer-btn--container">
          <PomodoroButton role={playTimer} name='Play' icon='FaPlay'/>
          <PomodoroButton role={pauseTimer} name='Pause' icon='FaPause'/>
          <PomodoroButton role={stopTimer} name='Stop' icon='FaStop'/>
        </div>
        <p>You've done <b>{`${pomodoroCounter.current}`}</b> pomodoros until now</p>
        <PomodoroButton role={resetCounter} name='reset-counter' icon='FaTimes'/>
      </div>
  )
}

export default PomodoroMain