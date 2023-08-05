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
//import { loadTodoCollections,} from './LocalStorage/initStorage'

import localstorageWrapper, {todoRecordsDataAdapter, todoCollectionsDataAdapter} from './LocalStorage/initStorage'
import { loadAllCollections } from './Context/Redux/todoCollectionsSlice'


const TodoRecordsJSON = [
  {
      id : "1",
      title : "Todo 1",
      dateEnd : "2022-02-03",
      collection : "1",
      content : "Qwertyasdfghzxcvbn"
  },
  {
      id : "2",
      title : "Second Todo",
      dateEnd : "2023-12-10",
      collection : "2",
      content : "Second Todo qwerftgvcxsaswderftghbvcfdxsa"
  },
  {
      id : "3",
      title : "Third Todo#3",
      dateEnd : "2023-04-28",
      collection : "1",
      content : "#3 todo Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae commodi, architecto saepe placeat ipsum quidem beatae cum soluta assumenda quia, vitae quod pariatur debitis nam. Eum voluptatibus sed unde adipisci."
  }
]

const collectionsJSON = [
  {
      id : "1",
      name : "Col_1",
      color: "#ada",
      todoRecordsIds : ["1", "3"]
  },
  {
      id : "2",
      name : "Col_2",
      color: "#e4c",
      todoRecordsIds : ["2"]
  }
]


function TestComponent() {
    useEffect(() => {
        console.log("Records")
        store.dispatch(loadAllCollections())
        //todoRecordsDataAdapter.saveMany(TodoRecordsJSON)
        //todoCollectionsDataAdapter.saveMany(collectionsJSON)
        //todoCollectionsDataAdapter.saveOne(collectionsJSON[0])
        //console.dir(todoRecordsDataAdapter.loadOne(1))
        //todoRecordsDataAdapter.removeOne(2)
        //todoRecordsDataAdapter.saveOne(TodoRecordsJSON[1])
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
