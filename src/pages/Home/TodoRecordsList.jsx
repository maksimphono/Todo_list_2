import React, { useCallback, useEffect, useId, useState } from 'react'
import Tooltip from './Components/Tooltip';
import Cards , {CardsRecordsCollectionByDay} from './Components/CardsRecordsList.jsx';

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
import { useNavigate, useParams } from 'react-router-dom';

import { viewModeList, viewModeCalendar, switchView, setCalendar } from './homePageViewModeSlice';

export function TodoRecordsListByDay() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const switchViewMode = useCallback(() => {dispatch(setCalendar()); navigate("/")}, [])

    const viewMode = useSelector(state => state.homePageViewMode)

  return (
    <>
      <div id = {style["todo_records"]}>
        <Tooltip viewMode = {viewMode} switchViewMode = {switchViewMode}/>
        <CardsRecordsCollectionByDay />
      </div>
    </>
  )
}

export default function TodoRecordsList() {
    const dispatch = useDispatch()
    const switchViewMode = () => dispatch(switchView())
    const creationMenuId = useId()

    const viewMode = useSelector(state => state.homePageViewMode)

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
        <label className = {style["creation__menu"]} onClick = {({target}) => console.dir(target)}>
            <span>+</span>
            <ul data-open = "false">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </label>
        
      </div>
    </>
  )
}
