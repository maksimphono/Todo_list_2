import React, {forwardRef, useImperativeHandle} from 'react'

// <styles>
import style from  "../styles/EditableField.module.scss";

// </styles>

export default forwardRef(function EditableField(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      content : () => ref.current.innerHTML
    }
  })
  
  return (
    <>
        <p ref = {ref} className = {style["editable-field"]} contentEditable = {true}>
        </p>
    </>
  )
})
