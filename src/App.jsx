import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./Navbar"
import Layout from "./Layout"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import TodoRecordsList from './pages/Home/TodoRecordsList'
import NewTodoRecord from "./pages/NewRecord/NewTodoRecord"
import CheckoutTodoRecord from './pages/CheckoutTodoRecord/CheckoutTodoRecord'
import { Provider } from 'react-redux'
import { store } from './Context/Redux/store'
import ModalContext from "./Context/modalContext"
import Confirmation from "./UI/Components/Confirmation/Confirmation";
import { loadTodoCollections, loadTodoRecords } from './LocalStorage/initStorage'

function TestComponent() {
    useEffect(() => {
        console.log("Records")
        console.dir(loadTodoCollections())
    }, [])
  
    return <></>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store = {store}>
    
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route index element = {<TodoRecordsList/>}/>
          <Route path="NewTodoRecord" element = {<NewTodoRecord/>}/>
          <Route path = "CheckoutRecord/:id" element = {<CheckoutTodoRecord />}/>
        </Route>
        <Route path = "tests">
        <Route index element = {<TestComponent/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
