import React, {forwardRef, useId, useImperativeHandle, useRef, useState} from 'react'
import $ from "jquery"

// <styles>
import style from  "../styles/EditableField.module.scss";

// </styles>

export default forwardRef(function EditableField(props, ref) {
  const pRef = useRef(null);
  const placeHolderId = useId()
  const [showPlaceHolder, setShowPlaceHolder] = useState(true)

  useImperativeHandle(ref, () => {
    return {
      content : () => pRef.current.innerHTML
    }
  })

  const handleFocus = (event) => {
      setShowPlaceHolder(false)
  }

  const handleBlur = (event) => {
    console.log($(event.target).children())
      if (event.target.innerHTML == "") {
        setShowPlaceHolder(true)
      }
  }
  
  return (
    <>
        <p className = {style["placeholder"]} hidden = {!showPlaceHolder}>Content</p>
        <p ref = {pRef} className = {style["editable-field"]} contentEditable = {true} onFocus={handleFocus} onBlur = {handleBlur}>
            
        </p>
    </>
  )
})
