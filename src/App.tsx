import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChatPage/>}/>
        <Route path='/signIn' element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
