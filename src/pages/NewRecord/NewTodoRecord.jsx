// <components>
import React from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';

// </components>

// <styles>
import style from "./styles/NewTodoRecord.module.scss";

// </styles>

export default function NewTodoRecord() {
  return (
    <>
      <div id = {style["new_todo_record"]}>
            <Tooltip />

            <EditableField />

            <button className = {style["success-btn"]} type = "submit">Craete record</button>
            <button className = {style["secondary-btn"]} name = 'cancel'>Cancel</button>
        </div>

    </>
  )
}
