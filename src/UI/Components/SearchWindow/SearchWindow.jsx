import React, { useMemo } from 'react'
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'

import { selectAllTodoRecords } from '../../../Context/Redux/todoRecordsSlice'
import { todoRecordsStorageThunks } from '../../../Context/Redux/todoRecordsSlice'

// <styles>
import style from "./styles/SearchWindow.module.scss"
import { useDispatch, useSelector } from 'react-redux'

// </styles>

function SearchedRecord({title, collection, due}) {
    return (
        <div className = {style["record"]}>
            <span className = {style["name"]}>{title}</span><span className = {style["sep-bar"]}></span><span>{collection}</span>
            <span className = {style["date-due"]}>{due}</span>
        </div>
    )
}

export default forwardRef(function SearchWindow(props, ref) {
    const dispatch = useDispatch()
    const dialogRef = useRef()
    const [stringToSearch, setStringToSearch] = useState("q")
    const records = useSelector((state) => {
            const records = selectAllTodoRecords(state).filter(item => item.title.includes(stringToSearch))
            return records;
        }
    )

    useImperativeHandle(ref, () =>
        ({
            showModal : () => dialogRef.current.showModal(),
            close : () => dialogRef.current.close(),
            getDialogRef : () => dialogRef
        })
    )

    useEffect(() => {
        dispatch(todoRecordsStorageThunks.loadAll())
        dialogRef.current.showModal()
    }, [])

  return (
    <>
        <dialog ref = {dialogRef} className={style["search__dialog"]}>
            <input className = {style["input"]} placeholder = "Search" type = "text" value = {stringToSearch} onChange = {({target}) => setStringToSearch(target.value)} />
            <div className = {style["separation-bar"]}></div>
            <br />
            <button className = {style["cancel-X-btn"]} value = {"cancel"} onClick={() => dialogRef.current.close()}><img src = "/src/assets/icons/close-X-btn.svg"/></button>
            <div className = {style["searched-records"]}>
                {records.map(record => <SearchedRecord title = {record.title} collection = {"Col1"} due = {"Jan 12, 2024"} />)}
                
            </div>
        </dialog>

    </>
  )
})
