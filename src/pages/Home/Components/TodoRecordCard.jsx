import React, { useEffect } from 'react'

// <styles>
import style from "../styles/TodoRecordCard.module.scss";

// </styles>

function CardControlBtns() {
  return (
      <>
      <ul className = {style["control-buttons"]}>
          <button className = {style["success-btn"]}>Complete</button>
          <button className = {style["info-btn"]}>Edit</button>
          <button className = {style["danger-btn"]}>Delete</button>
      </ul>
      </>
  )
}

function DateStamp() {
  return (
    <span className ={style["date-stamp"]}>13 Jan 2023</span>
  )
}

export default function TodoRecordCard() {
  useEffect(() => console.dir(style),[])
  
  return (
    <>
        <div className = {style["todo-record-card"]}>
            <h3 className ={style["title"]}>Todo 1</h3>
            <DateStamp />
            <span className ={style["type"]}>Is type of Homework</span>
            <CardControlBtns />
        </div>
        
    </>
  )
}
