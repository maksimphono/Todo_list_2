import React, { useEffect, useRef, useMemo, useState, useTransition } from 'react'
import $ from "jquery"

// <styles>
import style from "../styles/TodoRecordCard.module.scss";
import { useSelector } from 'react-redux';

// </styles>

function CardControlBtns() {
  return (
      <>
      <ul className = {style["control-buttons"]}>
          <button className = {style["success-btn"]}>Complete</button>
          <button className = {style["info-btn"]}>Check out</button>
      </ul>
      </>
  )
}

function DateStamp({date}) {
  const newDate = useMemo(() => {
    const dayOfWeeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const convertedDate = new Date(date)
    
    return convertedDate.toString().slice(0, 15)
  }, [])
  
  return (
    <span className ={style["date-stamp"]}>{newDate}</span>
  )
}

import { store } from '../../../Context/Redux/store';
import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice';

export default function TodoRecordCard({cardData}) {
  const todoCollection = useSelector(() => selectCollectionRecordsById(store.getState(), cardData.collection))
  const textColor = useMemo(() => ((parseInt(todoCollection.color.slice(1, 7), 16) > 0x7fffff)?"#333":"#ddd"), [todoCollection])

  const newCardData = useMemo(() => {
    console.dir(cardData)
    if (1)
      return {
        id : cardData.id,
        title : cardData?.title || "Title",
        dateEnd : cardData?.dateEnd || new Date().toString(),
        collection : cardData?.collection || "Collection",
        content : cardData?.content || "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nisi facilis praesentium reprehenderit facere vero quis debitis iste, vel, accusantium sit velit non hic fugiat soluta nemo maxime impedit iure!"
      }
  }, [])

  const [contentVisiable, setContentVisiable] = useState(false)
  const [isPending, startTransition] = useTransition();
  const componentMainBody = useRef();

  const handleBodyClick = (event) => {
    startTransition(() => {
      setContentVisiable(val => !val);
    })
  }

  return (
    <>
        <div 
          key = {newCardData.id}
          ref = {componentMainBody} 
          onClick = {handleBodyClick} 
          style = {{"--bg-main-color" : todoCollection.color, "--text-color" : textColor}}
          className = {
            [style["todo-record-card"], (contentVisiable?style["show-content"]:"")].join(" ").trim()
          }
          >
            <h3 className ={style["title"]}>{newCardData.title}</h3>
            <DateStamp date = {newCardData.dateEnd}/>
            <span className ={style["type"]}>Belongs to collection "{todoCollection.name}"</span>
            <CardControlBtns />
            <p className={style["content"]}>{newCardData.content}</p>
        </div>      
    </>
  )
}
