import React, {forwardRef, useImperativeHandle, useState, useRef} from 'react'

// styles
import style from "./styles/modal.module.scss"

export default forwardRef(function Modal(props, ref) {
    const [title, setTitle] = useState("Title")
    const [body, setBody] = useState(<i>Body</i>)
    const dialogRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            showModal : () => dialogRef.current.showModal(),
            setTitle,
            setBody
        }
    })
  
    return (
    <>
        <dialog ref = {dialogRef} id = {"modal-dialog"} className = {style.modal} open = {false}>
            <>
                <h2 className = {style["title"]}>{title}</h2>
                <p className = {style["content"]}>{body}</p>
                <ul className = {style["buttons"]}>
                    <li><form method = "dialog"><button className = {style["warning-btn"]} value = {"cancel"} formMethod={"dialog"} onClick={() => dialogRef.current.close()}>Cancel</button></form></li>
                    <li><button className = {style["success-btn"]}>Submit</button></li>
                </ul>
                <button className = {style["cancel-X-btn"]}>x</button>
            </>    
        </dialog>
    </>
  )
})
