import React, {forwardRef, useImperativeHandle, useRef} from 'react'

// <styles>
import style from  "../styles/EditableField.module.scss";

// </styles>

export default forwardRef(function EditableField(props, ref) {
  const pRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      content : () => pRef.current.innerHTML
    }
  })
  
  return (
    <>
        <p ref = {pRef} className = {style["editable-field"]} contentEditable = {true}>
        </p>
    </>
  )
})
