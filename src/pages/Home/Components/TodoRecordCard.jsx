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
          <button className = {style["success-btn"]} onClick = {handleComplete}><span className="material-symbols-outlined">check_circle</span>Complete</button>
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
    <>
      <span className ={style["date-stamp"]}><span className="material-symbols-outlined">date_range</span>{newDate}</span>
    </>
    
  )
}

export default function TodoRecordCard({cardData, index}) {
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
          style = {{"--bg-main-color" : todoCollection.color, "--text-color" : textColor, "--appear-delay" : `${(0.1 * +index)}s`}}
          className = {style["todo-record-card"]}
        >
            <svg className = {style["background_down"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,160L40,149.3C80,139,160,117,240,133.3C320,149,400,203,480,192C560,181,640,107,720,101.3C800,96,880,160,960,192C1040,224,1120,224,1200,202.7C1280,181,1360,139,1400,117.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            <h3 className ={style["title"]}>{newCardData.title}</h3>
            <DateStamp date = {newCardData.dateEnd}/>
            <span className ={style["type"]}>Collection "<b>{todoCollection.name}</b>"</span>
            <CardControlBtns todoRecordId = {newCardData.id} collectionId = {newCardData.collection}/>
            <p className={style["content"]}>{newCardData.content}</p>
        </div>
    </>
  )
}
