import React, { useCallback, useEffect, useId, useMemo, useReducer, useRef, useState } from 'react'

import SortOption from "./SortOption"
import FiltersOption from "./FiltersOption";
import $ from "jquery"
// <styles>
import style from "../styles/Tooltip.module.scss";

// </styles>

function DropdownTool({
    summary,
    data_search,
    children,
    forceShrink,
    onExpand,
    onShrink
}) {
    const dialogRef = useRef(null);
    const [open, setOpen] = useState(false)

    const handleExpand = useCallback((event) => {
        setOpen(v => {
            if (v)
                onShrink()
            else
                onExpand()
            console.log(!v)
            return !v
        })
    }, [onExpand, onShrink])

    useEffect(() => {
        if (forceShrink) {
            setOpen(false)
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
                summary = "Search"
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
