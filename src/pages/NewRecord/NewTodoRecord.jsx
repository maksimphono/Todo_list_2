// <components>
import React, { useCallback, useEffect, useReducer, useRef, useMemo, useId, useState, createContext, useContext } from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';
import $ from "jquery"

// </components>

// <styles>
import style from "./styles/NewTodoRecord.module.scss";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOne } from '../../Context/Redux/todoRecordsSlice';
import { useNavigate } from 'react-router-dom';

// </styles>

const selectedTodosCollectionContext = createContext()

function CollectionOption({title}) {
  const context = useContext(selectedTodosCollectionContext);
  const radioInput = useRef(null);

  useEffect(() => {
    console.dir(context.setSelectedTodosCollection)
    //context.setSelectedTodosCollection("qwertyu");
    //radioInput.current.onClick = () => context.setSelectedTodosCollection("qwertyu");
    //console.dir(radioInput.current.onClick)
  }, [])

  return (
    <>
      <li>
          <label>
            {title}
            <input ref = {radioInput} name = "select-collection-item" type="radio" onClick = {event => context.setSelectedTodosCollection(title)} />
          </label>
                      
          <button className = {style["edit-collection"]} type = "button">Edit</button>
        </li>
    </>
  )
}

function SelectCollection() {
  return (
    <>
    <ul>
        <li className = {style["add-collection"]}>
          <button type = "button">Add</button>
        </li>
        <CollectionOption title = "qert"/>
        <CollectionOption title = "asdfg"/>
        <CollectionOption title = "lkmn "/>
    </ul>
    </>
  )
}

export default function NewTodoRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const contentRef = useRef(null);
  const addNewTodoRecord = useCallback(event => {
    event.preventDefault()
    const newTodoRecord = {
      id : new Date().toString().slice(0, 24),
      title : 'Todo Rec',
      content : contentRef.current.content()
    }
    dispatch(addOne(newTodoRecord))
    navigate("/")
  }, [])

  const dateInputRef = useRef(null);
  const titleInputId = useId()

  const [selectedTodosCollection, setSelectedTodosCollection] = useState("null")

  return (
    <>
        
        <div id = {style["new_todo_record"]}>
            <Tooltip />

            <form onSubmit={addNewTodoRecord}>

              <label className = {style["record-title"]}>
                <h2>Title:</h2>
                <input type="text" />
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
                    <summary>{selectedTodosCollection}</summary>
                    <SelectCollection />
                  </selectedTodosCollectionContext.Provider>
                  
                </details>
              </label>

              <label className = {style["end-date"]}>
                <h2>End date</h2>
                <input ref = {dateInputRef} type="date" />
                <span className='display-date'>{0}</span>
              </label>
              
              <button className = {style["success-btn"]} type = "submit">Create</button>
              <NavLink className = {style["secondary-btn"]} name = 'cancel' to = "/">Cancel</NavLink>
            </form>

            
            
        </div>

    </>
  )
}
