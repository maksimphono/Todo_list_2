// <components>
import React, { useCallback, useReducer, useRef } from 'react'
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
      id : "1",
      title : 'Todo Rec',
      content : "Qwerty"//contentRef.current.content
    }
    dispatch(addOne(newTodoRecord))
    navigate("/")
  }, [])
  
  return (
    <>
        <div id = {style["new_todo_record"]}>
            <Tooltip />

            <EditableField ref = {contentRef}/>

            <button className = {style["success-btn"]} onClick = {addNewTodoRecord}>Create</button>
            <NavLink className = {style["secondary-btn"]} name = 'cancel' to = "/">Cancel</NavLink>
        </div>

    </>
  )
}
