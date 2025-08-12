import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ForgotPassword from './components/forgot-password'
import PasswordReset from './components/PasswordReset'
import TaskProgress from './components/task-progress'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <>
      {/* <ForgotPassword/> */}
      {/* <PasswordReset/> */}
      <TaskProgress/>
    </>
    </div>
  )
}

export default App


