import React, {forwardRef, useImperativeHandle, useState, useRef} from 'react'

// styles
import style from "./styles/modal.module.scss"
import styles_buttons from "../../../buttons.module.scss"

export default forwardRef(function Modal(props, ref) {
    const [title, setTitle] = useState("Title")
    const [body, setBody] = useState(<i>Body</i>)
    const [footer, setFooter] = useState([])
    const dialogRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            showModal : () => dialogRef.current.showModal(),
            close : () => dialogRef.current.close(),
            getDialogRef : () => dialogRef,
            setTitle,
            setBody,
            setFooter,
        }
    })
  
    return (
    <>
        <dialog ref = {dialogRef} id = {"modal-dialog"} className = {style.modal} open = {false}>
            <div>
                <h2 className = {style["title"]}>{title}</h2>
                <div className = {style["content"]}>{body}</div>
                <ul className = {style["buttons"]}>
                    {footer.map((item, key) => <li key = {key}>{item}</li>)}
                    <li><form method = "dialog"><button className = {styles_buttons["secondary-btn"]} value = {"cancel"} formMethod={"dialog"} onClick={() => dialogRef.current.close()}>Cancel</button></form></li>
                </ul>
                <button className = {style["cancel-X-btn"]} value = {"cancel"} onClick={() => dialogRef.current.close()}><img src = "/src/assets/icons/close-X-btn.svg"/></button>
            </div>
        </dialog>
    </>
  )
})

