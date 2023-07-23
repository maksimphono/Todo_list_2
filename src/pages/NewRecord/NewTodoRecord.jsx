// <components>
import React, { useCallback, useEffect, useReducer, useRef, useMemo, useId } from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';

// </components>

// <styles>
import style from "./styles/NewTodoRecord.module.scss";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOne } from '../../Context/Redux/todoRecordsSlice';
import { useNavigate } from 'react-router-dom';

// </styles>

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

  const titleInputId = useId()

  return (
    <>
        
        <div id = {style["new_todo_record"]}>
            <Tooltip />

            <form onSubmit={addNewTodoRecord}>

              <label className = {style["end-date"]}>
                <h2>End date</h2>
                <input type="date" />
              </label>

              <label className = {style["record-title"]}>
                <h2>Title:</h2>
                <input type="text" />
              </label>

              <label className = {style["record-content"]}>
                <h2>Content:</h2>              
                <EditableField ref = {contentRef}/>
              </label>
              
              <button className = {style["success-btn"]} type = "submit">Create</button>
              <NavLink className = {style["secondary-btn"]} name = 'cancel' to = "/">Cancel</NavLink>
            </form>

            
            
        </div>

    </>
  )
}
