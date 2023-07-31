import React, {createContext, forwardRef, useImperativeHandle, useRef, useState} from 'react'

import style from "./styles/notification.module.scss"

const disappearTime = 2000;

export default forwardRef(function(props, ref) {
  const [variant, setVariant] = useState("info")
  const [text, setText] = useState("Warning!")
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      pop : ({variant, text} = {variant : "info", text : "Qwerty"}) => {
        dialogRef.current.style.animation = ""
        setText(text)
        setVariant(variant)
        dialogRef.current.show()
        setTimeout(() => {
          dialogRef.current.close(); 
          dialogRef.current.style.animation = "none"
        }, disappearTime)
      }
    }
  })

  return (
    <dialog ref = {dialogRef} className = {style["notification"]} data-variant = {variant} open = {false}>
        <p>{text}</p>
        <form method = "dialog">
          <button className = {style["cancel-X-btn"]} value = {"cancel"} formMethod={"dialog"} onClick={() => dialogRef.current.close()}>x</button>
        </form>
        
    </dialog>
  )
})
