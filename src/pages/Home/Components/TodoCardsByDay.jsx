import React from 'react'

import TodoRecordCard from './TodoRecordCard'

import style from "../styles/TodoCardByDay.module.scss"

export default function TodoCardsByDay() {
    return (
        <dialog className = {style["todo_cards_by_day"]}>
            <div className = {style["title"]}></div>
        </dialog>
    )
}
