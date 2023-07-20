// <components>
import React from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';

// </components>

// <styles>
import "./styles/NewTodoRecord.module.scss";

// </styles>

export default function NewTodoRecord() {
  return (
    <>
      <div id = "new_todo_record">
            <Tooltip />

            <EditableField />

            <button className = "success-btn" type = "submit">Craete record</button>
            <button className = "secondary-btn" name = 'cancel'>Cancel</button>
        </div>

    </>
  )
}
