import React, { useCallback, useContext, useMemo } from 'react'
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'

import { selectAllTodoRecords, selectTodoRecordsById } from '../../../Context/Redux/todoRecordsSlice'
import { todoRecordsStorageThunks } from '../../../Context/Redux/todoRecordsSlice'
import { collectionsRecordsThunks } from '../../../Context/Redux/todoCollectionsSlice'
import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice'

// <styles>
import style from "./styles/SearchWindow.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import useSerializeTodoRecord, { useSerializeTodoRecordbyId } from '../../../hooks/useSerializeTodoRecord'

// </styles>

import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function SearchedRecord(record, closeSearchWindow) {
    const recordAsObject = useSerializeTodoRecord(record)
    //const recordColectionName = useSelector(state => selectCollectionRecordsById(state, collection).name)

    return (
        <NavLink onClick = {() => closeSearchWindow()} className = {style["record"]} to = {`/CheckoutRecord/${record.id}`}>
            <span className = {style["name"]}>{recordAsObject.title}</span><span className = {style["sep-bar"]}></span><span>{recordAsObject.collection.name}</span>
            <span className = {style["date-due"]}>{recordAsObject.dateEnd.slice(4, 15)}</span>
        </NavLink>
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
                    record => <SearchedRecord key = {record.id} {...record} closeSearchWindow = {closeDialog} />
                )}
            </div>
        </dialog>

    </>
  )
})
