import React, { useCallback, useMemo } from 'react'
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'

import { selectAllTodoRecords } from '../../../Context/Redux/todoRecordsSlice'
import { todoRecordsStorageThunks } from '../../../Context/Redux/todoRecordsSlice'
import { collectionsRecordsThunks } from '../../../Context/Redux/todoCollectionsSlice'
import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice'

// <styles>
import style from "./styles/SearchWindow.module.scss"
import { useDispatch, useSelector } from 'react-redux'

// </styles>

function SearchedRecord({title, collection, due}) {
    const recordColectionName = useSelector(state => selectCollectionRecordsById(state, collection).name)

    return (
        <div className = {style["record"]}>
            <span className = {style["name"]}>{title}</span><span className = {style["sep-bar"]}></span><span>{recordColectionName}</span>
            <span className = {style["date-due"]}>{due}</span>
        </div>
    )
}

export default forwardRef(function SearchWindow(props, ref) {
    const dispatch = useDispatch()
    const dialogRef = useRef()
    const [stringToSearch, setStringToSearch] = useState("")

    const records = useSelector((state) => {
            const records = selectAllTodoRecords(state).filter(item => (stringToSearch)?item.title.includes(stringToSearch):false)
            return records;
        }
    )

    const closeDialog = useCallback(() => {
        setStringToSearch("")
        dialogRef.current.close()
    }, [dialogRef.current])

    useImperativeHandle(ref, () =>
        ({
            showModal : () => dialogRef.current.showModal(),
            close : closeDialog,
            getDialogRef : () => dialogRef
        })
    )

    useEffect(() => {
        dispatch(todoRecordsStorageThunks.loadAll())
        dispatch(collectionsRecordsThunks.loadAll())
    }, [])

  return (
    <>
        <dialog ref = {dialogRef} className={style["search__dialog"]}>
            <input className = {style["input"]} placeholder = "Search" type = "text" value = {stringToSearch} onChange = {({target}) => setStringToSearch(target.value)} />
            <div className = {style["separation-bar"]}></div>
            <br />
            <button className = {style["cancel-X-btn"]} value = {"cancel"} onClick={closeDialog}><img src = "/src/assets/icons/close-X-btn.svg"/></button>
            <div className = {style["searched-records"]}>
                {records.map(
                    record => <SearchedRecord title = {record.title} collection = {record.collection} due = {"Jan 12, 2024"} />
                )}
            </div>
        </dialog>

    </>
  )
})
