import React from 'react'

// <styles>
import style from  "../styles/EditableField.module.scss";

// </styles>

export default function EditableField({HTMLcontent}) {
  return (
    <>
        <p className = {style["editable-field"]} contentEditable = {true}>
          {HTMLcontent}
        </p>
    </>
  )
}
