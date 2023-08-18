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

import {removeOneTodoRecord, alterOneTodoRecord} from "../../Context/Redux/utilities"
import modalContext from '../../Context/modalContext';

import { todoRecordsStorageThunks } from '../../Context/Redux/todoRecordsSlice';
import { collectionsRecordsThunks } from '../../Context/Redux/todoCollectionsSlice';

function setInitialState(dispatch) {
  dispatch(todoRecordsStorageThunks.loadAll())
  dispatch(collectionsRecordsThunks.loadAll())
}

export default function NewTodoRecord() {
  const { id : todoRecordId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const contentRef = useRef(null);
  const {notificationRef, confirmationRef} = useContext(modalContext)

  const todoRecordsLoadStatus = useSelector(state => state.todoRecords.loadstatus)
  const collectionsLoadStatus = useSelector(state => state.todoRecordsCollection.loadstatus)

  useEffect(() => {
         // only for tests, actifically add some records to state, so I don't have to add it manually
      if (todoRecordsLoadStatus == "idle" && collectionsLoadStatus == "idle")
        setInitialState(dispatch)
  }, [])

  const selectedTodoRecord = useSelector(globalState => selectTodoRecordsById(globalState, todoRecordId))
  const [selectedTodosCollectionId, setSelectedTodosCollectionId] = useState(selectedTodoRecord?.collection)
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(selectedTodoRecord?.dateEnd))

  const alterTodoRecord = useCallback(async event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const alteredTodoRecord = {
      id : selectedTodoRecord.id,
      title : formData.get("title"),
      dateEnd : new Date(`${selectedEndDate.getMonth() + 1}/${selectedEndDate.getDate()}/${selectedEndDate.getFullYear()} 11:59:59 PM`).toString(),
      content : contentRef.current.content(),
      collection : selectedTodosCollectionId
    }

    try {
      await confirmationRef.current.show("Save the changes?")
      await alterOneTodoRecord({dispatch, alteredTodoRecord})
      notificationRef.current.pop({variant : "success", text : "Record saved successfuly!"})
      navigate("/")
    } catch(error) {
      notificationRef.current.pop({variant : "warning", text : error.toString()})
    }

  }, [selectedTodosCollectionId, contentRef, selectedEndDate])

  const handleDelete = async event => {
    try {
      await confirmationRef.current.show("Are you sure you want to delete that task?")
      await removeOneTodoRecord({dispatch, todoRecordId, collectionId : selectedTodoRecord?.collection})
      notificationRef.current.pop({variant : "warning", text : "Record deleted"})
      navigate("/")
    } catch(error) {
      notificationRef.current.pop({variant : "danger", text : error.toString()})
    }
  }

  return (
    <>
        <div id = {style["checkout_todo_record"]}>
            <Tooltip />

            <form onSubmit={alterTodoRecord}>

              <label className = {style["record-title"]}>
                <input name = "title" type="text" defaultValue={selectedTodoRecord?.title || ""} />
              </label>

              <label className = {style["record-content"]}>
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
