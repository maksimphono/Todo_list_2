import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'

// styles 
import style from "./styles/Confirmation.module.scss"
import styled_buttons from "../../../buttons.module.scss"

export default forwardRef(function (props, ref) {
    const dialogRef = useRef()
    const [text, setText] = useState("Qwerty")
    const confirmBtnRef = useRef(null)
    const rejectBtnRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            show : (text) => {
                setText(text)
                dialogRef.current.showModal()
                return new Promise((resolve, reject) => {
                    confirmBtnRef.current.onClick = () => resolve("OK")
                    rejectBtnRef.current.onClick = () => reject("OK")
                })
            }
        }
    })

    return (
        <dialog className={style["confirmation_dialog"]} ref = {dialogRef} open = {true}>
            <form method = "dialog">
                <h2>Confirm action</h2>
                <p>{text}</p>
                <button ref = {confirmBtnRef} className = {styled_buttons["success-btn"]} type = "submit">Confirm</button>
                <button ref = {rejectBtnRef} className = {styled_buttons["warning-btn"]} type = "button">Reject</button>
            </form>
        </dialog>
    )
})