import React, { useEffect, useId, useMemo, useReducer, useRef, useState } from 'react'

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
    enableExpand,
    onExpand,
    onShrink
}) {
    const dialogRef = useRef(null);
    const [open, setOpen] = useState(false)

    const handleExpand = (event) => {
        event.preventDefault()
        setOpen(v => {
            if (v) {
                onShrink()
                return !v
            }
            if (!v && enableExpand) {
                onExpand()
                return !v
            }
            return v
        })
    }

    useEffect(() => {
        setOpen(v => (!v && enableExpand)?true:false)
    }, [enableExpand])
    
    return (
        <details ref = {dialogRef} className = {style["tool"]} data-search = {!!data_search} open = {open} onClick = {handleExpand}>
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
                enableExpand = {expandedDropdown != "SortOption"} 
                onExpand = {() => setExpandedDropdown("FiltersOption")}
                onShrink = {() => setExpandedDropdown("")}
            >
                <FiltersOption 
                    
                />
            </DropdownTool>
            <DropdownTool
                summary = "Sort"
                enableExpand = {expandedDropdown != "FiltersOption"}
                onExpand = {() => setExpandedDropdown("SortOption")}
                onShrink = {() => setExpandedDropdown("")}
            >
                <SortOption />
            </DropdownTool>
        </div>
    </>
  )
}
