import React, { useContext, useMemo, useState, useEffect, useId, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice'

import { store } from '../../../Context/Redux/store'

import {selectedTodosCollectionContext} from "../NewTodoRecord";

import style from "../styles/CollectionSelect.module.scss"

import SelectCollectionDropdown from './SelectCollectionDropdown';
import modalContext from '../../../Context/modalContext';

export default function CollectionSelect({onBlur, invalid, onChange, placeholder}) {
  const {selectedTodosCollectionId} = useContext(selectedTodosCollectionContext)
  const {modalRef} = useContext(modalContext)

  const selectedCollection = useSelector(() => selectCollectionRecordsById(store.getState(), selectedTodosCollectionId))
  const selectedCollectionTextColor = useMemo(() => ((parseInt((selectedCollection?.color || "#000").slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [selectedCollection?.color])
  
  const detailsId = useId();
  const [open, setOpen] = useState(false);
  const labelRef = useRef(null)
  
  const handleDropdownBlur = useCallback((event) => {
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
    document.addEventListener("click", handleDropdownBlur)
    return () => {
      document.removeEventListener("click", handleDropdownBlur)
    }
  }, [])

  return (
    <>
    <label 
        data-invalid = {invalid} 
        ref = {labelRef} 
        htmlFor = {detailsId} 
        className = {style["select-collection"]}>
        <h2>
            Collection
        </h2>
        <details onBlur = {onBlur} id = {detailsId} name="collection_dropdown" onClick = {() => setOpen(v => !v)}>
            <summary
                onClick = {() => setOpen(v => !v)}
                style = {{
                background : selectedCollection?.color || "", 
                color: (selectedCollection)?selectedCollectionTextColor:""
                  }}
            >
                {(!invalid && !!selectedCollection)?(selectedCollection.name):placeholder}
            </summary>
        </details>
        <SelectCollectionDropdown visiable = {open} onChange = {onChange} onBlur = {onBlur}/>
    </label>
    
    </>
  )
}
