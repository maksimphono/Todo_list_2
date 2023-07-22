import React, { useEffect, useRef, useMemo } from 'react'

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

function DateStamp({date}) {
  return (
    <span className ={style["date-stamp"]}>{Date(date).toString().slice(0, 19)}</span>
  )
}

export default function TodoRecordCard({cardData}) {
  const newCardData = useMemo(() => {
    console.dir(cardData)
    if (1) 
      return {
        title : cardData?.title || "Title",
        dateEnd : cardData?.dateEnd && new Date(cardData.dateEnd).toString() || new Date().toString(),
        collection : cardData?.collection || "Collection",
        content : cardData?.content || "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nisi facilis praesentium reprehenderit facere vero quis debitis iste, vel, accusantium sit velit non hic fugiat soluta nemo maxime impedit iure!"
      }
  }, [])

  const componentMainBody = useRef();


  const handleBodyClick = (event) => {
    console.dir(componentMainBody.current)
  }

  return (
    <>
        <div ref = {componentMainBody} onClick = {handleBodyClick} className = {style["todo-record-card"]}>
            <h3 className ={style["title"]}>{newCardData.title}</h3>
            <DateStamp date = {newCardData.dateEnd}/>
            <span className ={style["type"]}>Belongs to collection "{newCardData.collection}"</span>
            <CardControlBtns />
            <p className={style["content"]}>{newCardData.content}</p>
        </div>      
    </>
  )
}
