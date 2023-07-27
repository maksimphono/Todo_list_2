// <components>
import React, { useCallback, useEffect, useReducer, useRef, useMemo, useId, useState, createContext, useContext } from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';
import $ from "jquery"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./styles/ReactDatePicker.scss"
import SelectCollection from './Components/SelectCollection';

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOne } from '../../Context/Redux/todoRecordsSlice';
import { useNavigate } from 'react-router-dom';

// </components>

// <styles>
import style from "./styles/NewTodoRecord.module.scss";

// </styles>

export const selectedTodosCollectionContext = createContext()

import { addOneTodoRecord, selectAllCollectionRecords } from "../../Context/Redux/todoCollectionsSlice"
import { store } from '../../Context/Redux/store';

function createTodoRecord(dispatch, todoRecord, collectionRecordId) {
  dispatch(addOne(todoRecord))
  dispatch(addOneTodoRecord({id : collectionRecordId, todoRecordId : todoRecord, state : store.getState()}))
}

export default function NewTodoRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const contentRef = useRef(null);

  const [selectedTodosCollection, setSelectedTodosCollection] = useState({id : "", name : "", color : "#fff"})

  const [selectedEndDate, setSelectedEndDate] = useState(null)


  const collections = useSelector(selectAllCollectionRecords)
  const addNewTodoRecord = useCallback(event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    console.log(selectedEndDate)
    const newTodoRecord = {
      id : new Date().toString().slice(0, 24),
      title : formData.get("title"),
      dateEnd : new Date(selectedEndDate).toString().slice(0, 15),
      content : contentRef.current.content(),
      collection : selectedTodosCollection.id
    }
     // selectedTodosCollection.id
    createTodoRecord(dispatch, newTodoRecord, selectedTodosCollection.id)

    navigate("/")
  }, [selectedTodosCollection, contentRef, selectedEndDate])

  const hadleDateChange = (date) => {
    setSelectedEndDate(date)
  }

  return (
    <>
        
        <div id = {style["new_todo_record"]}>
            <Tooltip />

            <form onSubmit={addNewTodoRecord}>

              <label className = {style["record-title"]}>
                <h2>Title:</h2>
                <input name = "title" type="text" />
              </label>

              <label className = {style["record-content"]}>
                <h2>Content:</h2>              
                <EditableField ref = {contentRef}/>
              </label>

              <label className = {style["select-collection"]}>
                <h2>
                  Collection
                </h2>
                <details name="collection">
                  <selectedTodosCollectionContext.Provider value = {{setSelectedTodosCollection}}>
                    <summary 
                      style = {{
                        background : selectedTodosCollection.color, 
                        color: selectedTodosCollection.textColor
                      }}
                    >
                      {selectedTodosCollection.title}
                    </summary>
                    <SelectCollection />
                  </selectedTodosCollectionContext.Provider>
                  
                </details>
              </label>

              <label className = {style["end-date"]}>
                <h2>End date</h2>
                
                <DatePicker
                  selected = {selectedEndDate}
                  onChange = {hadleDateChange}
                  dateFormat = "dd/MM/yyyy"
                  placeholderText='Select a Date'
                ></DatePicker>  
              </label>
              
              <button className = {style["success-btn"]} type = "submit">Create</button>
              <NavLink className = {style["secondary-btn"]} name = 'cancel' to = "/">Cancel</NavLink>
            </form>

            
            
        </div>

    </>
  )
}
