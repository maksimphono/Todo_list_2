import React, { useEffect, useRef, useMemo, useState, useTransition } from 'react'
import $ from "jquery"

import { removeOne } from '../../../Context/Redux/todoRecordsSlice';

// <styles>
import style from "../styles/TodoRecordCard.module.scss";
import { useDispatch, useSelector } from 'react-redux';

// </styles>

function CardControlBtns({todoRecordId, collectionId}) {
  const dispatch = useDispatch();
  
  const handleComplete = (event) => {
    console.log("Remove", todoRecordId)
    dispatch(removeOne(todoRecordId))
  }
  
  return (
      <>
      <ul className = {style["control-buttons"]}>
          <button className = {style["success-btn"]} onClick = {handleComplete}>Complete</button>
          <NavLink className = {style["info-btn"]} to = {`/CheckoutRecord/${todoRecordId}`}>Check out</NavLink>
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
import { NavLink } from 'react-router-dom';

export default function TodoRecordCard({cardData}) {
  const todoCollection = useSelector(() => selectCollectionRecordsById(store.getState(), cardData.collection))
  const textColor = useMemo(() => ((parseInt(todoCollection.color.slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [todoCollection])

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
          data-show-content = {contentVisiable}
          style = {{"--bg-main-color" : todoCollection.color, "--text-color" : textColor}}
          className = {style["todo-record-card"]}
        >
            <h3 className ={style["title"]}>{newCardData.title}</h3>
            <DateStamp date = {newCardData.dateEnd}/>
            <span className ={style["type"]}>Belongs to collection "<b>{todoCollection.name}</b>"</span>
            <CardControlBtns todoRecordId = {cardData.id}/>
            <p className={style["content"]}>{newCardData.content}</p>
        </div>      
    </>
  )
}
