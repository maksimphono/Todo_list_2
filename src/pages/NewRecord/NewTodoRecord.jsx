// <components>
import React, { useCallback, useEffect, useReducer, useRef, useMemo, useId, useState, createContext, useContext } from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';
import $ from "jquery"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./styles/ReactDatePicker.scss"
import SelectCollectionDropdown from './Components/SelectCollectionDropdown';

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOne } from '../../Context/Redux/todoRecordsSlice';
import { useNavigate } from 'react-router-dom';

// </components>

// <styles>
import style from "./styles/NewTodoRecord.module.scss";

// </styles>

export const selectedTodosCollectionContext = createContext()

import { addOneTodoRecord, selectAllCollectionRecords, selectCollectionRecordsById } from "../../Context/Redux/todoCollectionsSlice"
import { store } from '../../Context/Redux/store';

function createTodoRecord(dispatch, todoRecord, collectionRecordId) {
  dispatch(addOne(todoRecord))
  dispatch(addOneTodoRecord({id : collectionRecordId, todoRecordId : todoRecord, state : store.getState()}))
}

export default function NewTodoRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const contentRef = useRef(null);

  const [selectedTodosCollectionId, setSelectedTodosCollectionId] = useState("")
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  
  const selectedCollection = useSelector(() => selectCollectionRecordsById(store.getState(), selectedTodosCollectionId))
  const selectedCollectionTextColor = useMemo(() => ((parseInt((selectedCollection?.color || "#000").slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [selectedCollection?.color])

  const [openedSelectCollectionDropdown, setOpenedSelectCollectionDropdown] = useState(false)
  const collectionSelectionDropdown = useRef(null);

  const addNewTodoRecord = useCallback(event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    console.log(selectedEndDate)
    const newTodoRecord = {
      id : new Date().toString().slice(0, 24),
      title : formData.get("title"),
      dateEnd : new Date(selectedEndDate).toString().slice(0, 15),
      content : contentRef.current.content(),
      collection : selectedTodosCollectionId
    }

    createTodoRecord(dispatch, newTodoRecord, selectedTodosCollectionId)

    navigate("/")
  }, [selectedTodosCollectionId, contentRef, selectedEndDate])

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
                <details name="collection" ref = {collectionSelectionDropdown}>
                  <selectedTodosCollectionContext.Provider value = {{setSelectedTodosCollectionId}}>
                    <summary 
                      style = {{
                      background : selectedCollection?.color || "#000", 
                      color: selectedCollectionTextColor
                      }}
                    >
                      {selectedCollection?.name || ""}
                    </summary>
                    <SelectCollectionDropdown />
                  </selectedTodosCollectionContext.Provider>
                </details>
              </label>

              <label className = {style["end-date"]}>
                <h2>End date</h2>
                
                <DatePicker
                  selected = {selectedEndDate}
                  onChange = {setSelectedEndDate}
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
