// <components>
import React, { useEffect, useMemo } from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodoRecordsById } from '../../Context/Redux/todoRecordsSlice';

// </components>

// <styles>
import style from "./styles/CheckoutTodoRecord.module.scss";

// </styles>

export default function CheckoutTodoRecord() {
    const params = useMemo(() => useParams(), [])
    
    const thatTodoRecord = useSelector(selectTodoRecordsById)

    useEffect(() => {
        console.dir(thatTodoRecord)
    })

    return (
    <>
      <div id = {style["new_todo_record"]}>
        <Tooltip />

        <EditableField />

        <button className = {style["success"]} type = "submit">Save</button>
        <button className = {style["delete-btn"]}>Delete</button>
        <button className = {style["secondary-btn"]} name = 'cancel'>Cancel</button>
      </div>

    </>
  )
}
