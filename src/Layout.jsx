import React, { memo, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom"
import Modal from './UI/Components/Modal/Modal'
import ModalContext from './Context/modalContext'
import NotificationContext from "./Context/NotificationContext"
import Notification from './UI/Components/Modal/Notification'

export default memo(function Layout() {
  const modalRef = useRef(null);
  const notificationRef = useRef(null);

  return (
    <>
        <Modal ref = {modalRef} />
        <Notification ref = {notificationRef} />
        <ModalContext.Provider value = {{modalRef : modalRef, notificationRef}}>
            <Navbar />
            <Outlet/>
        </ModalContext.Provider>        
    </>
    
  )
})
