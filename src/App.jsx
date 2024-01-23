import { useEffect, useState } from 'react'
import Layout from "./Layout"
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import TodoRecordsList from './pages/Home/TodoRecordsList'
import NewTodoRecord from "./pages/NewRecord/SingleTodoRecord"
//import CheckoutTodoRecord from './pages/CheckoutTodoRecord/CheckoutTodoRecord'
import { Provider } from 'react-redux'
import { store } from './Context/Redux/store'
import { todoRecordsStorageThunks } from './Context/Redux/todoRecordsSlice'
import { collectionsRecordsThunks } from './Context/Redux/todoCollectionsSlice'


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
        store.dispatch(todoRecordsStorageThunks.saveMany(TodoRecordsJSON))
        store.dispatch(collectionsRecordsThunks.saveMany(collectionsJSON))
    }, [])
  
    return <></>
}

import CardsRecordsList from './pages/Home/Components/CardsRecordsList'
import CalendarView from './pages/Home/Components/CalendarView'
import { TodoRecordsListByDay } from './pages/Home/TodoRecordsList'

import SearchWindow from './UI/Components/SearchWindow/SearchWindow'
function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    Array.range = (start, stop, step = 1) => {
      return Array.from((function* () {
          for (let i = start; i < stop; i += step) {
              yield i
          }
      })())
  }
  }, [])

  return (
    <Provider store = {store}>
    
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route index element = {<TodoRecordsList />}/>
          <Route path = "records_by_date/:date" element = {<TodoRecordsListByDay />}/>
          <Route path="NewTodoRecord" element = {<NewTodoRecord/>}/>
          <Route path = "CheckoutRecord/:id" element = {<NewTodoRecord />}/>
        </Route>
        <Route path = "tests">
          <Route index element = {<SearchWindow/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App