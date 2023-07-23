import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./Navbar"
import Layout from "./Layout"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import TodoRecordsList from './pages/Home/TodoRecordsList'
import NewTodoRecord from "./pages/NewRecord/NewTodoRecord"
import CheckoutTodoRecord from './pages/CheckoutTodoRecord/CheckoutTodoRecord'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route index element = {<TodoRecordsList/>}/>
          <Route path="NewTodoRecord" element = {<NewTodoRecord/>}/>
          <Route path = "CheckoutRecord/:id" element = {<CheckoutTodoRecord />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
