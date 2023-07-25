import React, { memo, useRef } from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom"
import Modal from './UI/Components/Modal/Modal'
import ModalContext from './Context/modalContext'

export default memo(function Layout() {
  const modalRef = useRef(null);
  
  return (
    <>
        <Modal ref = {modalRef} />
        <ModalContext.Provider value = {{modalRef : modalRef}}>
          <Navbar />
          <Outlet/>
        </ModalContext.Provider>
        
    </>
    
  )
})
