import React from 'react'
import Tooltip from './Components/Tooltip';
import Cards from './Components/CardsRecordsCollection.jsx';

// <styles>
import style from "./styles/TodoRecordsList.module.scss";
//import "./styles/TodoRecordCard.module.scss"

// </styles>

export default function TodoRecordsList() {
  return (
    <>
      <div id = {style["todo_records"]}>
        <Tooltip />
        <Cards />
      </div>
    </>
  )
}
