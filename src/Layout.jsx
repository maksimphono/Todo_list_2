import React, { memo, useRef, useEffect } from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom"
import Modal from './UI/Components/Modal/Modal'
import ModalContext from './Context/modalContext'
import Confirmation from './UI/Components/Confirmation/Confirmation'

export default memo(function Layout() {
  const modalRef = useRef(null);
  const confirmationRef = useRef(null);

  useEffect(() => {
    //confirmationRef.current.setText("Asdfg")
    const f = () => confirmationRef.current.show("Asdfgh")
    document.addEventListener("click", f)
    return document.removeEventListener("click", f)
  }, [])

  return (
    <>
        <Modal ref = {modalRef} />
        <Confirmation ref = {confirmationRef} />
        <ModalContext.Provider value = {{modalRef : modalRef, confirmationRef}}>
          <Navbar />
          <Outlet/>
        </ModalContext.Provider>
        
    </>
    
  )
})
