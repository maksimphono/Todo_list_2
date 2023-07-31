import React, { useRef, forwardRef, useImperativeHandle } from 'react'

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
        <dialog ref = {dialogRef} open = {false}>
            <form method = "dialog">
                <h2>Confirm action</h2>
                <p>{text}</p>
                <button ref = {confirmBtnRef} className="success-btn" type = "submit">Confirm</button>
                <button ref = {rejectBtnRef} className="warning-btn" type = "button">Reject</button>
            </form>
        </dialog>
    )
})