import React from 'react'
import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'

// <styles>
import style from "./styles/SearchWindow.module.scss"

// </styles>

function SearchedRecord({name, collection}) {
    return (
        <div className = {style["record"]}>
            <span className = {style["name"]}>Todo 1</span><span className = {style["sep-bar"]}></span><span>Col 1</span>
            <span className = {style["date-due"]}>Jan 12, 2024</span>
        </div>
    )
}

export default forwardRef(function SearchWindow(props, ref) {
    const dialogRef = useRef()

    useImperativeHandle(ref, () =>
        ({
            showModal : () => dialogRef.current.showModal(),
            close : () => dialogRef.current.close(),
            getDialogRef : () => dialogRef
        })
    )

    useEffect(() => {dialogRef.current.showModal()}, [])

  return (
    <>
        <dialog ref = {dialogRef} className={style["search__dialog"]}>
            <input className = {style["input"]} placeholder = "Search" type = "text" />
            <div className = {style["separation-bar"]}></div>
            <br />
            <button className = {style["cancel-X-btn"]} value = {"cancel"} onClick={() => dialogRef.current.close()}><img src = "/src/assets/icons/close-X-btn.svg"/></button>
            <div className = {style["searched-records"]}>
                <SearchedRecord/>
                <SearchedRecord/>
                <SearchedRecord/>
                <SearchedRecord/>
                <SearchedRecord/>
            </div>
        </dialog>

    </>
  )
})
