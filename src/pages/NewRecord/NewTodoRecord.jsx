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

const COLLECTION_SELECTION_PLACEHOLDER = "Select collection";
const DEADLINE_SELECTION_PLACEHOLDER = "Select deadline"
const TITLE_INPUT_PLACEHOLDER = "Title"
const CONTENT_INPUT_PLACEHOLDER = "Content"

const COLLECTION_SELECTION_ERROR = "Collection must be specified";
const DEADLINE_SELECTION_ERROR = "Deadline must be specified"
const TITLE_INPUT_ERROR = "Title can't be empty"

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
      if (!values.title){
          errors.title = TITLE_INPUT_ERROR
      }
      if (!values.selectedTodosCollectionId) {
          errors.collection = COLLECTION_SELECTION_ERROR
      }
      
      if (!values.dateEnd) {
          errors.dateEnd = DEADLINE_SELECTION_ERROR
      }
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
                      placeholder = {(touched?.title && errors?.title)?(errors?.title):TITLE_INPUT_PLACEHOLDER}
                      type="text" 
                      value = {values.title} 
                      onChange = {(event) => {handleChange(event)}}
                      onBlur = {handleBlur}
                      />
                      
                  </label>

                  <label className = {style["record-content"]}>
                    <EditableField placeholder = {CONTENT_INPUT_PLACEHOLDER} ref = {contentRef}/>
                  </label>

                  <selectedTodosCollectionContext.Provider value = {{selectedTodosCollectionId, setSelectedTodosCollectionId, inputName : "selectedTodosCollectionId"}}>
                    <CollectionSelect 
                        placeholder = {!!(errors?.collection && touched?.selectedTodosCollectionId)?errors?.collection:COLLECTION_SELECTION_PLACEHOLDER}
                        invalid = {!!(errors?.collection && touched?.selectedTodosCollectionId)} 
                        onChange = {event => {handleChange(event)}}
                        onBlur = {() => {handleBlur({target : {name : "selectedTodosCollectionId"}})}}/>
                  </selectedTodosCollectionContext.Provider>

                  <label 
                      data-invalid = {!!(errors?.dateEnd && touched?.dateEnd)} 
                      className = {style["end-date"]}
                  >
                      <h2>End date</h2>

                      <DatePicker
                          selected = {selectedEndDate}
                          onChange = {value => {handleChange({target : {name : "dateEnd", type : "date", value : value}}); setSelectedEndDate(value)}}
                          onBlur = {() => {handleBlur({target : {name : "dateEnd"}})}}
                          dateFormat = "dd/MM/yyyy"
                          placeholderText={(errors?.dateEnd && touched?.dateEnd)?(errors.dateEnd):DEADLINE_SELECTION_PLACEHOLDER}
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
