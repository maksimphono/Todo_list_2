import React from 'react'

import style from "../styles/CollectionSelect.module.scss"

export default function CollectionSelect() {
  return (
    <>
    <label className = {style["select-collection"]} onBlur = {event => setOpenedSelectCollectionDropdown(v => !v)}>
        <h2>
            Collection
        </h2>
        <details name="collection" open = {openedSelectCollectionDropdown}>
            <selectedTodosCollectionContext.Provider value = {{setSelectedTodosCollectionId}}>
            <summary 
                style = {{
                background : selectedCollection?.color || "#000", 
                color: selectedCollectionTextColor
                  }}
            >
                {selectedCollection?.name || ""}
            </summary>
            <SelectCollectionDropdown />
            </selectedTodosCollectionContext.Provider>
        </details>
    </label>
    </>
  )
}
