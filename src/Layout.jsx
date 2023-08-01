import React, { memo, useRef, useEffect } from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom"
import Modal from './UI/Components/Modal/Modal'
import ModalContext from './Context/modalContext'
import Confirmation from './UI/Components/Confirmation/Confirmation'
import $ from "jquery"

export default memo(function Layout() {
  const modalRef = useRef(null);
  const confirmationRef = useRef(null);

  useEffect(() => {
    const f = () => confirmationRef.current.show("asdfg")
    $(document).on("click", f)
    return () => $(document).off("click", f)
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
