import React, { useContext, useMemo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectCollectionRecordsById } from '../../../Context/Redux/todoCollectionsSlice'

import { store } from '../../../Context/Redux/store'

import {selectedTodosCollectionContext} from "../NewTodoRecord";

import style from "../styles/NewTodoRecord.module.scss"

import SelectCollectionDropdown from './SelectCollectionDropdown';

export default function CollectionSelect() {
  const {selectedTodosCollectionId} = useContext(selectedTodosCollectionContext)
  const selectedCollection = useSelector(() => selectCollectionRecordsById(store.getState(), selectedTodosCollectionId))
  const selectedCollectionTextColor = useMemo(() => ((parseInt((selectedCollection?.color || "#000").slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [selectedCollection?.color])
  
  return (
    <>
    <label className = {style["select-collection"]}>
        <h2>
            Collection
        </h2>
        <details name="collection">
            <summary 
                style = {{
                background : selectedCollection?.color || "#000", 
                color: selectedCollectionTextColor
                  }}
            >
                {selectedCollection?.name || ""}
            </summary>
            <SelectCollectionDropdown />
        </details>
    </label>
    </>
  )
}
