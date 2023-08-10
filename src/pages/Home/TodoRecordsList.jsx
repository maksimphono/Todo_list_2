import React, { useCallback, useEffect, useState } from 'react'
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

import CalendarView from './Components/CalendarView';

export const viewModeList = Symbol("viewModeList")
export const viewModeCalendar = Symbol("viewModeCalendar")

export default function TodoRecordsList() {
  const [viewMode, setViewMod] = useState(viewModeList)

  const switchViewMode = useCallback(() => setViewMod(mode => 
      mode === viewModeCalendar?( viewModeList ):( viewModeCalendar )), 
  [])
  
  return (
    <>
      <div id = {style["todo_records"]}>
        <Tooltip viewMode = {viewMode} switchViewMode = {switchViewMode}/>
        {(viewMode === viewModeList)?
            <Cards />
        :(viewMode === viewModeCalendar)?
            <CalendarView />
        :
            <></>
        }
      </div>
    </>
  )
}
