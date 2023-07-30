// <components>
import React, { useCallback, useEffect, useReducer, useRef, useMemo, useId, useState, createContext, useContext } from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';
import $ from "jquery"
import CollectionSelect from "./Components/CollectionSelect"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./styles/ReactDatePicker.scss"
import SelectCollectionDropdown from './Components/SelectCollectionDropdown';

import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOne, selectTodoRecordsById } from '../../Context/Redux/todoRecordsSlice';
import { useNavigate } from 'react-router-dom';

// </components>

// <styles>
import style from "./styles/CheckoutTodoRecord.module.scss";

// </styles>

export const selectedTodosCollectionContext = createContext()

import { addOneTodoRecord, selectAllCollectionRecords, selectCollectionRecordsById } from "../../Context/Redux/todoCollectionsSlice"
import { store } from '../../Context/Redux/store';

function createTodoRecord(dispatch, todoRecord, collectionRecordId) {
  dispatch(addOne(todoRecord))
  dispatch(addOneTodoRecord({id : collectionRecordId, todoRecordId : todoRecord, state : store.getState()}))
}

function removeOneTodoRecord({dispatch, todoRecordId, collectionId}) {
  dispatch(removeOne(todoRecordId))
  dispatch(unbindTodoRecord({id : collectionId, todoRecordId, state : store.getState()}))
}

import { removeOne } from '../../Context/Redux/todoRecordsSlice';
import { unbindTodoRecord } from "../../Context/Redux/todoCollectionsSlice";

export default function NewTodoRecord() {
  const { id : todoRecordId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const contentRef = useRef(null);

  const selectedTodoRecord = useSelector(() => selectTodoRecordsById(store.getState(), todoRecordId))
  const [selectedTodosCollectionId, setSelectedTodosCollectionId] = useState(selectedTodoRecord?.collection)
  const [selectedEndDate, setSelectedEndDate] = useState(selectedTodoRecord?.endDate)

  useEffect(() => {
    console.log(todoRecordId)
  })

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

  const handleDelete = event => {
    removeOneTodoRecord({dispatch, todoRecordId, collectionId : selectedTodoRecord?.collection})
    navigate("/")
  }

  return (
    <>
        <div id = {style["checkout_todo_record"]}>
            <Tooltip />

            <form onSubmit={addNewTodoRecord}>

              <label className = {style["record-title"]}>
                <h2>Title:</h2>
                <input name = "title" type="text" defaultValue={selectedTodoRecord?.title || ""} />
              </label>

              <label className = {style["record-content"]}>
                <h2>Content:</h2>              
                <EditableField defaultValue = {selectedTodoRecord?.content} ref = {contentRef}/>
              </label>

              <selectedTodosCollectionContext.Provider value = {{selectedTodosCollectionId, setSelectedTodosCollectionId}}>
                <CollectionSelect defaultValue = {selectedTodoRecord?.collection}/>
              </selectedTodosCollectionContext.Provider>
              

              <label className = {style["end-date"]}>
                <h2>End date</h2>
                
                <DatePicker
                  selected = {selectedEndDate}
                  onChange = {setSelectedEndDate}
                  dateFormat = "dd/MM/yyyy"
                  placeholderText='Select a Date'
                ></DatePicker>
              </label>
              
              <button className = {style["success-btn"]} type = "submit">Save</button>
              <button className = {style["delete-btn"]} type = "button" onClick = {handleDelete}>Delete</button>
              <NavLink className = {style["secondary-btn"]} name = 'cancel' to = "/">Cancel</NavLink>
            </form>
        </div>
    </>
  )
}
