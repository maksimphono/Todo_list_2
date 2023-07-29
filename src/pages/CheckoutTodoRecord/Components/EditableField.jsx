import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'

// <styles>
import style from  "../styles/EditableField.module.scss";

// </styles>

export default forwardRef(function EditableField({defaultValue}, ref) {
  const pRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      content : () => pRef.current.innerHTML
    }
  })

  useEffect(() => {
    pRef.current.innerHTML = defaultValue;
  }, [defaultValue])
  
  return (
    <>
        <p ref = {pRef} className = {style["editable-field"]} contentEditable = {true}>
        </p>
    </>
  )
})
