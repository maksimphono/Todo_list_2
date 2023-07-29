import React, { useContext, useMemo, useState, useEffect, useId, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice'

import { store } from '../../../Context/Redux/store'

import {selectedTodosCollectionContext} from "../NewTodoRecord";

import style from "../styles/CollectionSelect.module.scss"

import SelectCollectionDropdown from './SelectCollectionDropdown';
import modalContext from '../../../Context/modalContext';

export default function CollectionSelect() {
  const {selectedTodosCollectionId} = useContext(selectedTodosCollectionContext)
  const {modalRef} = useContext(modalContext)

  const selectedCollection = useSelector(() => selectCollectionRecordsById(store.getState(), selectedTodosCollectionId))
  const selectedCollectionTextColor = useMemo(() => ((parseInt((selectedCollection?.color || "#000").slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [selectedCollection?.color])
  
  const detailsId = useId();
  const [open, setOpen] = useState(false);
  const labelRef = useRef(null)
  
  const handleBlur = useCallback((event) => {
    if ((labelRef?.current?.contains(event.target))) {
      if (event.target.tagName == "SUMMARY") {
        setOpen(v => !v)
      }
    }
    else if (modalRef.current.getDialogRef().current.contains(event.target)) {
      setOpen(true)
    } else {
      setOpen(false)
    } 
  }, [modalRef, labelRef])

  useEffect(() => {
    document.addEventListener("click", handleBlur)
    return () => {
      document.removeEventListener("click", handleBlur)
    }
  }, [])

  return (
    <>
    <label ref = {labelRef} htmlFor = {detailsId} className = {style["select-collection"]}>
        <h2>
            Collection
        </h2>
        <details id = {detailsId} name="collection" onClick = {() => setOpen(v => !v)}>
            <summary 
                onClick = {() => setOpen(v => !v)}
                style = {{
                background : selectedCollection?.color || "#000", 
                color: selectedCollectionTextColor
                  }}
            >
                {selectedCollection?.name || ""}
            </summary>
        </details>
        <SelectCollectionDropdown visiable = {open} />
    </label>
    
    </>
  )
}