// <components>
import React, { useCallback, useMemo, useRef, useState, createContext, useContext } from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';
import CollectionSelect from "./Components/CollectionSelect"
import DatePicker from "react-datepicker"

import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// </components>

import { alterOneTodoRecord, removeOneTodoRecord } from '../../Context/Redux/utilities';
import { Refused } from '../../UI/Components/Confirmation/Confirmation';
import {createTodoRecord} from "../../Context/Redux/utilities"
import modalContext from '../../Context/modalContext';
import { Formik } from 'formik';

// <styles>
import style from "./styles/TodoRecord.module.scss";
import "react-datepicker/dist/react-datepicker.css"
import "./styles/ReactDatePicker.scss"
import { selectTodoRecordsById } from '../../Context/Redux/todoRecordsSlice';

// </styles>

export const selectedTodosCollectionContext = createContext()

const COLLECTION_SELECTION_PLACEHOLDER = "Select collection";
const DEADLINE_SELECTION_PLACEHOLDER = "Select deadline"
const TITLE_INPUT_PLACEHOLDER = "Title"
const CONTENT_INPUT_PLACEHOLDER = "Content"

const COLLECTION_SELECTION_ERROR = "Collection must be specified";
const DEADLINE_SELECTION_ERROR = "Deadline must be specified"
const TITLE_INPUT_ERROR = "Title can't be empty"

const ACTION_CANCELED = "Action canceled"
const CREATED_SUCCESSFULLY = "Record created"
const ALTERED_SUCCESSFULLY = "Record saved"

const CHECKOUT_EXISTING__MODE = "checkoutExisting"
const CREATE_NEW__MODE = "createNew"

function NewRecord_Header() {
    return (<>
        <header>
            <h1>Add new todo record</h1>
            <p>Please make sure to specify collection, which your new todo record belongs to. Also don't forget to specify date of deadline</p>
        </header>
    </>)
}

function CheckoutRecord_Header() {
    return (<>
      <header>
        <h1>Customize your todo record</h1>
        <p>You can edit your record as you like, or delete it completely.</p>
      </header>
    </>)
}

export default function NewTodoRecord() {
  const {id : selectedTodoRecordId} = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const contentRef = useRef(null);
  const {notificationRef, confirmationRef} = useContext(modalContext)

  const selectedTodoRecord = useSelector((state) => selectTodoRecordsById(state, selectedTodoRecordId) || null)
  const componentMode = useMemo(() => selectedTodoRecord?(CHECKOUT_EXISTING__MODE):(CREATE_NEW__MODE), [])
  const formInitialValues = useMemo(() => {
      switch (componentMode) {
          case CHECKOUT_EXISTING__MODE:
              return {__proto__ : null,
                  title : selectedTodoRecord?.title || "",
                  selectedTodosCollectionId : selectedTodoRecord?.collection || "",
                  dateEnd : selectedTodoRecord?.dateEnd || "",
                  content : selectedTodoRecord?.content || ""
              }
          default:
              return {__proto__ : null,
                  title : "",
                  selectedTodosCollectionId : "",
                  dateEnd : "",
                  content : ""
              }
      }
  }, [])
  
  const [selectedTodosCollectionId, setSelectedTodosCollectionId] = useState(selectedTodoRecord?.collection || "")
  const [selectedEndDate, setSelectedEndDate] = useState(selectedTodoRecord?(new Date(selectedTodoRecord?.dateEnd)):"")

  const handleFormSubmit = useCallback(async values => {
    const todoRecordData = {
      id : (componentMode === CHECKOUT_EXISTING__MODE)?(selectedTodoRecord.id):(new Date().toString().slice(0, 24)),
      title : values["title"],
      dateEnd : new Date(`${selectedEndDate.getMonth() + 1}/${selectedEndDate.getDate()}/${selectedEndDate.getFullYear()} 11:59:59 PM`).toString(),
      content : contentRef.current.content(),
      collection : selectedTodosCollectionId
    }

    try {
        if (componentMode === CHECKOUT_EXISTING__MODE) {
            await confirmationRef.current.show("Are you sure you want to save the changes?")
            await alterOneTodoRecord({dispatch, alteredTodoRecord : todoRecordData})
            notificationRef.current.pop({variant : "success", text : ALTERED_SUCCESSFULLY})
        }
        else if (componentMode === CREATE_NEW__MODE) {
            await confirmationRef.current.show("Create new record?")
            await createTodoRecord(dispatch, todoRecordData, selectedTodosCollectionId);
            notificationRef.current.pop({variant : "success", text : CREATED_SUCCESSFULLY})
        } else {
            notificationRef.current.pop({variant : "warning", text : "Unknown action!"})
        }
        navigate("/")

    } catch (error) {
      switch (error) {
          case Refused:
              notificationRef.current.pop({variant : "info", text : ACTION_CANCELED})
              break;
          default:
              notificationRef.current.pop({variant : "warning", text : error.toString()})
      }
    }

  }, [selectedTodosCollectionId, contentRef, selectedEndDate, selectedTodoRecord])

  const handleRecordDelete = async event => {
      if (componentMode !== CHECKOUT_EXISTING__MODE) return;
      try {
        await confirmationRef.current.show("Are you sure you want to delete that record?")
        await removeOneTodoRecord({dispatch, todoRecordId : selectedTodoRecord?.id, collectionId : selectedTodoRecord?.collection})
        notificationRef.current.pop({variant : "info", text : "Record deleted"})
        navigate("/")
      } catch(error) {
        switch (error) {
          case Refused:
              notificationRef.current.pop({variant : "info", text : ACTION_CANCELED})
              break;
          default:
              notificationRef.current.pop({variant : "danger", text : error.toString()})
              break;
        }
      }
  }

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
  }, [])

  return (
    <>
        <div id = {style["new_todo_record"]}>
            {componentMode === CREATE_NEW__MODE?
                <NewRecord_Header />
            :
                <CheckoutRecord_Header />
            }

            <Formik
              initialValues={formInitialValues}
              validate = {validateForm}
              onSubmit={event => {handleFormSubmit(event)}}
            >
            {
              ({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
                <form onSubmit={(event) => {handleSubmit(event)}}>

                  <label className = {style["record-title"]}>
                    <input 
                        data-invalid = {!!(touched?.title && errors?.title)}
                        name = "title"
                        placeholder = {(touched?.title && errors?.title)?(errors?.title):TITLE_INPUT_PLACEHOLDER}
                        type="text"
                        defaultValue={formInitialValues.title}
                        value = {values.title} 
                        onChange = {(event) => {handleChange(event)}}
                        onBlur = {handleBlur}
                    />
                      
                  </label>

                  <label className = {style["record-content"]}>
                    <EditableField 
                        placeholder = {CONTENT_INPUT_PLACEHOLDER} 
                        ref = {contentRef}
                        defaultValue = {formInitialValues.content}
                    />
                  </label>

                  <selectedTodosCollectionContext.Provider value = {{selectedTodosCollectionId, setSelectedTodosCollectionId, inputName : "selectedTodosCollectionId"}}>
                    <CollectionSelect 
                        placeholder = {!!(errors?.collection && touched?.selectedTodosCollectionId)?(errors?.collection):COLLECTION_SELECTION_PLACEHOLDER}
                        invalid = {!!(errors?.collection && touched?.selectedTodosCollectionId)} 
                        onChange = {event => {handleChange(event)}}
                        onBlur = {() => {handleBlur({target : {name : "selectedTodosCollectionId"}})}}/>
                  </selectedTodosCollectionContext.Provider>

                  <label 
                      data-invalid = {!!(errors?.dateEnd && touched?.dateEnd)} 
                      className = {style["end-date"]}
                  >
                      <h2><span className="material-symbols-outlined">pending_actions</span> Deadline</h2>

                      <DatePicker
                          selected = {selectedEndDate}
                          onChange = {value => {handleChange({target : {name : "dateEnd", type : "date", value : value}}); setSelectedEndDate(value)}}
                          onBlur = {() => {handleBlur({target : {name : "dateEnd"}})}}
                          dateFormat = "dd/MM/yyyy"
                          placeholderText={(errors?.dateEnd && touched?.dateEnd)?(errors.dateEnd):DEADLINE_SELECTION_PLACEHOLDER}
                      ></DatePicker>
                  </label>

                  <div className = {style["buttons"]}>
                      <button className = {style["success-btn"]} type = "submit">{(selectedTodoRecord)?(<><span className="material-symbols-outlined">task</span>Save</>):(<><span className="material-symbols-outlined">add_task</span> Create</>)}</button>
                      {(componentMode === CHECKOUT_EXISTING__MODE)?(<button className = {style["delete-btn"]} type = "button" name = "delete" onClick = {(event) => handleRecordDelete(event)}><span className="material-symbols-outlined">delete</span> Delete</button>):(<></>)}
                      <NavLink className = {style["secondary-btn"]} name = 'cancel' to = "/"><span className="material-symbols-outlined">close</span> Cancel</NavLink>
                  </div>
                </form>
              )
            }
            </Formik>
        </div>
    </>
  )
}