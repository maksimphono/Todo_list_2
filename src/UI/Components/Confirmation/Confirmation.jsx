import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import $ from "jquery"

// styles 
import style from "./styles/Confirmation.module.scss"
import styled_buttons from "../../../buttons.module.scss"

export default forwardRef(function (props, ref) {
    const dialogRef = useRef()
    const [text, setText] = useState("")
    const confirmBtnRef = useRef(null)
    const rejectBtnRef = useRef(null)
    const pRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            show : (request) => {
                setText(request)
                dialogRef.current.show()

                $(dialogRef.current).css({"opacity" : "0"})
                $(dialogRef.current).animate({
                    opacity : "1"
                }, 500, "swing")

                return new Promise((resolve, reject) => {
                    const confirm = () => {
                        confirmBtnRef.current.removeEventListener("click", confirm)
                        resolve("OK")
                    }
                    const decline = () => {
                        rejectBtnRef.current.removeEventListener("click", decline)        
                        reject("NO")
                    }
                    confirmBtnRef.current.addEventListener("click", confirm)
                    rejectBtnRef.current.addEventListener("click", decline)
                })
            }
        }
    }, [])

    return (
        <dialog className={style["confirmation_dialog"]} ref = {dialogRef} open = {false}>
            <form method = "dialog">
                <h2>Confirm action</h2>
                <p>{text}</p>
                <button ref = {confirmBtnRef} className = {styled_buttons["success-btn"]}>Confirm</button>
                <button ref = {rejectBtnRef} className = {styled_buttons["warning-btn"]}>Reject</button>
            </form>
        </dialog>
    )
})