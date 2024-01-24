import React, { memo, useRef, useEffect } from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom"
import Modal from './UI/Components/Modal/Modal'
import ModalContext from './Context/modalContext'
import Confirmation from './UI/Components/Confirmation/Confirmation'
import SearchWindow from './UI/Components/SearchWindow/SearchWindow'
import $ from "jquery"
import NotificationContext from "./Context/NotificationContext"
import Notification from './UI/Components/Modal/Notification'
import { useDispatch } from 'react-redux'

import { selectAllTodoRecords } from './Context/Redux/todoRecordsSlice'
import { selectAllCollectionRecords } from './Context/Redux/todoCollectionsSlice'

export default memo(function Layout() {
  const dispatch = useDispatch()
  const modalRef = useRef(null);
  const confirmationRef = useRef(null);
  const notificationRef = useRef(null);
  const searchWindowRef = useRef(null)

  return (
    <>
        <Notification ref = {notificationRef} />
        <ModalContext.Provider value = {
          {
            modalRef : modalRef, 
            confirmationRef, 
            notificationRef,
            searchWindowRef
          }}>
            <Modal ref = {modalRef} />
            <Confirmation ref = {confirmationRef} />
            <SearchWindow ref = {searchWindowRef} />
            <Navbar />
            <Outlet />
        </ModalContext.Provider>        
    </>
    
  )
})
