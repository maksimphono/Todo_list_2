import React, { useEffect, useRef, useMemo, useState, useTransition, useContext } from 'react'

import {removeOneTodoRecord} from "../../../Context/Redux/utilities"

import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice';
import { NavLink } from 'react-router-dom';

import modalContext from '../../../Context/modalContext';

import { useDispatch, useSelector } from 'react-redux';
import useReduxStoreState from '../../../hooks/useReduxStoreState';

// <styles>
import style from "../styles/TodoRecordCard.module.scss";

// </styles>

function CardControlBtns({todoRecordId, collectionId}) {
  const dispatch = useDispatch();
  const {notificationRef, confirmationRef} = useContext(modalContext)

  const handleComplete = (event) => {
    event.preventDefault()
    removeOneTodoRecord({dispatch, todoRecordId, collectionId})
      .then(() => notificationRef.current.pop({variant : "success", text : "Task completed!"}))
      .catch(error => notificationRef.current.pop({variant : "danger", text : error.toString()}))
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
    const convertedDate = new Date(date)
    
    return convertedDate.toString().slice(0, 15)
  }, [])

  return (
    <span className ={style["date-stamp"]}>{newDate}</span>
  )
}

export default function TodoRecordCard({cardData}) {
  const storeState = useReduxStoreState()
  const todoCollection = useSelector(() => selectCollectionRecordsById(storeState, cardData.collection))
  const textColor = useMemo(() => ((parseInt(todoCollection.color.slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [todoCollection])

  const newCardData = useMemo(() => {
      return {
          id : cardData.id,
          title : cardData?.title || "Title",
          dateEnd : cardData?.dateEnd || new Date().toLocaleString(),
          collection : cardData?.collection || "Collection",
          content : cardData?.content || "Lorem ipsum dolor sit amet consectetur adipisicing elit. At nisi facilis praesentium reprehenderit facere vero quis debitis iste, vel, accusantium sit velit non hic fugiat soluta nemo maxime impedit iure!"
      }
  }, [cardData.id, cardData.title, cardData.dateEnd, cardData.collection, cardData.content])

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
            <CardControlBtns todoRecordId = {newCardData.id} collectionId = {newCardData.collection}/>
            <p className={style["content"]}>{newCardData.content}</p>
        </div>
    </>
  )
}
