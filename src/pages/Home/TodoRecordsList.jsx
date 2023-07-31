import React, { useEffect } from 'react'
import Tooltip from './Components/Tooltip';
import Cards from './Components/CardsRecordsList.jsx';

// <styles>
import style from "./styles/TodoRecordsList.module.scss";
import { useDispatch, useSelector } from 'react-redux';
//import "./styles/TodoRecordCard.module.scss"

// </styles>

import {addOneCollection} from "../../Context/Redux/todoCollectionsSlice"
import {addOne, selectAllTodoRecords} from "../../Context/Redux/todoRecordsSlice"

import { selectAllCollectionRecords } from '../../Context/Redux/todoCollectionsSlice';
import { store } from '../../Context/Redux/store';

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
