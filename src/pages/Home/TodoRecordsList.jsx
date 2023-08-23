import React, { useCallback, useEffect, useId, useState } from 'react'
import Tooltip from './Components/Tooltip';
import Cards , {CardsRecordsCollectionByDay} from './Components/CardsRecordsList.jsx';

// <styles>
import style from "./styles/TodoRecordsList.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import dropdown_styles from "./styles/Dropdown.module.scss";
import styled_buttons from "../../buttons.module.scss"
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

import Dropdown from '../../UI/Components/Dropdown/Dropdown';
import { NavLink } from 'react-router-dom';
import useNewCollectionDialog from '../../hooks/useNewCollectionDialog';

export default function TodoRecordsList() {
    const dispatch = useDispatch()
    const switchViewMode = () => dispatch(switchView())
    const showNewCollectionDialog = useNewCollectionDialog(styled_buttons)

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
        <Dropdown styles = {dropdown_styles} summary = {<><span className="material-symbols-outlined">add</span></>}>
            <button className={dropdown_styles["roll_up"]} onClick={showNewCollectionDialog}><span className="material-symbols-outlined">library_add_check</span></button>
            <NavLink className={dropdown_styles["roll_up"]} to = "NewTodoRecord"><span className="material-symbols-outlined">category</span></NavLink>
        </Dropdown>
        
      </div>
    </>
  )
}
