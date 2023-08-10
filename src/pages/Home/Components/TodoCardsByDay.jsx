import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

import TodoRecordCard from './TodoRecordCard'

import style from "../styles/TodoCardByDay.module.scss"

export default function TodoCardsByDay({date}) {
    const dialogRef = useRef(null)
    
    useImperativeHandle(ref, () => ({
        showModal : () => {
            dialogRef.current.showModal()
        }
    }))

    return (
        <dialog ref = {dialogRef} className = {style["todo_cards_by_day"]} open = {false}>
            <form method = "dialog">
                <div className = {style["title"]}>
                    <h2>{date}</h2>
                    <button type = "button"></button>
                </div>
            </form>
        </dialog>
    )
}
