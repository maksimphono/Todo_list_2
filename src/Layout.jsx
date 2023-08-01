import React, { memo, useRef, useEffect } from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom"
import Modal from './UI/Components/Modal/Modal'
import ModalContext from './Context/modalContext'
import Confirmation from './UI/Components/Confirmation/Confirmation'
import $ from "jquery"
import NotificationContext from "./Context/NotificationContext"
import Notification from './UI/Components/Modal/Notification'

export default memo(function Layout() {
  const modalRef = useRef(null);
  const confirmationRef = useRef(null);

  const notificationRef = useRef(null);

  return (
    <>
        <Modal ref = {modalRef} />
        <Confirmation ref = {confirmationRef} />
        <Notification ref = {notificationRef} />
        <ModalContext.Provider value = {{modalRef : modalRef, confirmationRef, notificationRef}}>
            <Navbar />
            <Outlet/>
        </ModalContext.Provider>        
    </>
    
  )
})
