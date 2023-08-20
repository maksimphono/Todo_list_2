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

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOne } from '../../Context/Redux/todoRecordsSlice';
import { useNavigate } from 'react-router-dom';

import { addOneTodoRecord, selectAllCollectionRecords, selectCollectionRecordsById } from "../../Context/Redux/todoCollectionsSlice"
import { store } from '../../Context/Redux/store';

// </components>

// <styles>
import style from "./styles/NewTodoRecord.module.scss";

// </styles>

export const selectedTodosCollectionContext = createContext()

import {createTodoRecord} from "../../Context/Redux/utilities"

import modalContext from '../../Context/modalContext';

import { Formik } from 'formik';

export default function NewTodoRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const contentRef = useRef(null);
  const {notificationRef, confirmationRef} = useContext(modalContext)

  const [selectedTodosCollectionId, setSelectedTodosCollectionId] = useState("")
  const [selectedEndDate, setSelectedEndDate] = useState(null)

  const addNewTodoRecord = useCallback(async event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    console.log(formData.get("title"))
    const newTodoRecord = {
      id : new Date().toString().slice(0, 24),
      title : formData.get("title"),
      dateEnd : new Date(`${selectedEndDate.getMonth() + 1}/${selectedEndDate.getDate()}/${selectedEndDate.getFullYear()} 11:59:59 PM`).toString(),
      content : contentRef.current.content(),
      collection : selectedTodosCollectionId
    }

    try {
      await confirmationRef.current.show("Create?")
      await createTodoRecord(dispatch, newTodoRecord, selectedTodosCollectionId);
      notificationRef.current.pop({variant : "success", text : "Record created"})
      navigate("/")

    } catch (error) {
      notificationRef.current.pop({variant : "warning", text : error.toString()})
    }

  }, [selectedTodosCollectionId, contentRef, selectedEndDate])

  const validateForm = useCallback(values => {
      const errors = {__proto__ : null}
      console.dir(values)
      if (!values.title){
          errors.title = "Title can not be empty!"
      }
      if (!values.selectedTodosCollectionId) {
          errors.collection = "Collection must be specified!"
      }
      
      if (!values.selectedEndDate) {
          errors.dateEnd = "Deadline must be specified!"
      }
      console.table(errors)
      return errors
  }, [selectedTodosCollectionId, selectedEndDate])

  const checkBeforeSubmission = (values) => {
      const errors = validateForm(values)
      if (errors.length > 1) return null
  }

  return (
    <>
        <div id = {style["new_todo_record"]}>
            <Tooltip />

            <Formik
              initialValues={{title : ""}}
              validate = {validateForm}
            >
            {
              ({
                values,
                errors,
                touched,
                handleChange,
                handleBlur
              }) => (
                <form onSubmit={addNewTodoRecord}>

              <label className = {style["record-title"]}>
                <input 
                  data-invalid = {!!(touched?.title && errors?.title)}
                  name = "title"
                  placeholder = {(touched?.title && errors?.title)?(errors?.title):"Title"}
                  type="text" 
                  value = {values.title} 
                  onChange = {(event) => {handleChange(event); console.dir(touched)}}
                  onBlur = {handleBlur}
                  />
                  
              </label>

              <label className = {style["record-content"]}>
                <EditableField ref = {contentRef}/>
              </label>

              <selectedTodosCollectionContext.Provider value = {{selectedTodosCollectionId, setSelectedTodosCollectionId, inputName : "selectedTodosCollectionId"}}>
                <CollectionSelect 
                    placeholder = {!!(errors?.collection && touched?.collection)?errors?.collection:"Select collection"}
                    invalid = {!!(errors?.collection && touched?.collection)} 
                    onChange = {event => {handleChange(event)}}
                    onBlur = {() => {handleBlur({target : {name : "selectedTodosCollectionId"}}); touched.collection = true}}/>
              </selectedTodosCollectionContext.Provider>
              

              <label data-invalid = {!!(errors?.dateEnd && touched?.dateEnd)} className = {style["end-date"]}>
                <h2>End date</h2>

                <DatePicker
                  selected = {selectedEndDate}
                  onChange = {value => {handleChange({target : {name : "selectedEndDate", type : "date", value : value}}); setSelectedEndDate(value)}}
                  onBlur = {() => {handleChange({target : {name : "selectedEndDate", type : "date", value : selectedEndDate}}); touched.dateEnd = true}}
                  dateFormat = "dd/MM/yyyy"
                  placeholderText={(errors?.dateEnd && touched?.dateEnd)?(errors.dateEnd):'Select a Date'}
                ></DatePicker>
              </label>

              <button className = {style["success-btn"]} type = "submit">Create</button>
              <NavLink className = {style["secondary-btn"]} name = 'cancel' to = "/">Cancel</NavLink>
            </form>
              )
            }
            </Formik>
            
        </div>

    </>
  )
}
