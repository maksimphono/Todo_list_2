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
import { addOne, alterTodoRecord, selectTodoRecordsById } from '../../Context/Redux/todoRecordsSlice';
import { useNavigate } from 'react-router-dom';

// </components>

// <styles>
import style from "./styles/CheckoutTodoRecord.module.scss";

// </styles>

export const selectedTodosCollectionContext = createContext()

import { addOneTodoRecord, selectAllCollectionRecords, selectCollectionRecordsById } from "../../Context/Redux/todoCollectionsSlice"
import { store } from '../../Context/Redux/store';

import {createTodoRecord, removeOneTodoRecord} from "../../Context/Redux/utilities"
import modalContext from '../../Context/modalContext';

export default function NewTodoRecord() {
  const { id : todoRecordId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const contentRef = useRef(null);
  const {notificationRef} = useContext(modalContext)

  const selectedTodoRecord = useSelector(() => selectTodoRecordsById(store.getState(), todoRecordId))
  const [selectedTodosCollectionId, setSelectedTodosCollectionId] = useState(selectedTodoRecord?.collection)
  const [selectedEndDate, setSelectedEndDate] = useState(selectedTodoRecord?.endDate)

  const addNewTodoRecord = useCallback(event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newDate = ((new Date(selectedEndDate)).toString() == "Invalid Date")?selectedTodoRecord.dateEnd:(new Date(selectedEndDate)).toString()
    const alteredTodoRecord = {
      id : selectedTodoRecord.id,
      title : formData.get("title"),
      dateEnd : newDate.slice(0, 15),
      content : contentRef.current.content(),
      collection : selectedTodosCollectionId
    }

    dispatch(alterTodoRecord(alteredTodoRecord))
    if (JSON.stringify(selectTodoRecordsById(store.getState(), alteredTodoRecord.id)) == JSON.stringify(alteredTodoRecord)) {
      notificationRef.current.pop({variant : "success", text : "Record altering success!"})
      navigate("/")
    } else {
      notificationRef.current.pop({variant : "danger", text : "Record altering failed!"})
    }

    
  }, [selectedTodosCollectionId, contentRef, selectedEndDate])

  const handleDelete = event => {
    removeOneTodoRecord({dispatch, todoRecordId, collectionId : selectedTodoRecord?.collection})
      .then(result => {
        notificationRef.current.pop({variant : "warning", text : "Record deleted"})
        navigate("/")
      })
      .catch(error => {
        notificationRef.current.pop({variant : "danger", text : error})
      }) 
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
