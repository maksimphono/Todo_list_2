import React, { useEffect } from 'react'
import Tooltip from './Components/Tooltip';
import Cards from './Components/CardsRecordsList.jsx';

// <styles>
import style from "./styles/TodoRecordsList.module.scss";
import { useDispatch } from 'react-redux';
//import "./styles/TodoRecordCard.module.scss"

// </styles>

export default function TodoRecordsList() {
  const dispatch = useDispatch()
  
  useEffect(() => {

  })
  
  return (
    <>
      <div id = {style["todo_records"]}>
        <Tooltip />
        <Cards />
      </div>
    </>
  )
}
