import React, { useCallback, useEffect, useId, useMemo, useReducer, useRef, useState } from 'react'

import SortOption from "./SortOption"
import FiltersOption from "./FiltersOption";
// <styles>
import style from "../styles/Tooltip.module.scss";

// </styles>

function DropdownTool({
    summary,
    children,
    forceShrink,
    onExpand,
    onShrink
}) {
    const dialogRef = useRef(null);

    const handleExpand = useCallback((event) => {
        if (dialogRef.current.open)
            onShrink()
        else
            onExpand()
    }, [onExpand, onShrink])

    useEffect(() => {
        if (forceShrink) {
            dialogRef.current.open = false
        }
    }, [forceShrink])

    return (
        <details ref = {dialogRef} className = {style["tool"]} onClick = {handleExpand}>
            <summary>
                {summary}
            </summary>
            <div className = {style["options"]}>
                {children}
            </div>
            
        </details>
    )
}

export default function Tooltip() {
    const [expandedDropdown, setExpandedDropdown] = useState("")
  
    return (
    <>
      <div className = {style.tooltip}>
            <DropdownTool
                summary = "Callendar"
                data_search = {true}
            >
                <input type="text" />
                <button type="submit">Search</button>                   
            </DropdownTool>
            <DropdownTool
                summary = "Filter"
                forceShrink = {expandedDropdown == "SortOption"} 
                onExpand = {() => setExpandedDropdown("FiltersOption")}
                onShrink = {() => setExpandedDropdown("")}
            >
                <FiltersOption />
            </DropdownTool>
            <DropdownTool
                summary = "Sort"
                forceShrink = {expandedDropdown == "FiltersOption"}
                onExpand = {() => setExpandedDropdown("SortOption")}
                onShrink = {() => setExpandedDropdown("")}
            >
                <SortOption />
            </DropdownTool>
        </div>
    </>
  )
}
