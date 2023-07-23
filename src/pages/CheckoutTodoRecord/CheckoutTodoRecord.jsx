// <components>
import React from 'react'
import Tooltip from './Components/Tooltip'
import EditableField from './Components/EditableField';

// </components>

// <styles>
import style from "./styles/CheckoutTodoRecord.module.scss";

// </styles>

export default function CheckoutTodoRecord() {
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
