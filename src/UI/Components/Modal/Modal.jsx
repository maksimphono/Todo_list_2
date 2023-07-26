import React, {forwardRef, useImperativeHandle, useState, useRef} from 'react'

// styles
import style from "./styles/modal.module.scss"
import styles_buttons from "../../../buttons.module.scss"

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
            <form method = "dialog">
                <h2 className = {style["title"]}>{title}</h2>
                <p className = {style["content"]}>{body}</p>
                <ul className = {style["buttons"]}>
                    <li><button className = {styles_buttons["warning-btn"]} value = {"cancel"} formMethod={"dialog"} onClick={() => dialogRef.current.close()}>Cancel</button></li>
                    <li><button className = {styles_buttons["success-btn"]} type = "button">Submit</button></li>
                </ul>
                <button className = {style["cancel-X-btn"]}>x</button>
            </form>
        </dialog>
    </>
  )
})
