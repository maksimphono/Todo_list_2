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

import { viewModeCalendar, viewModeList } from '../homePageViewModeSlice';

export default function Tooltip({switchViewMode, viewMode}) {
    const [expandedDropdown, setExpandedDropdown] = useState("")
  
    return (
    <>
      <div className = {style.tooltip}>
            <button 
                className={style["switch_view"]} 
                onClick = {switchViewMode}
            >
                {(viewMode === viewModeList)?
                    <><span className="material-symbols-outlined">calendar_month</span>Calendar</>
                :
                <><span className="material-symbols-outlined">format_list_bulleted</span>List</>
                }
                
            </button>

            <DropdownTool
                summary = {<><span className="material-symbols-outlined">filter</span>Filter</>}
                forceShrink = {expandedDropdown == "SortOption"} 
                onExpand = {() => setExpandedDropdown("FiltersOption")}
                onShrink = {() => setExpandedDropdown("")}
            >
                <FiltersOption />
            </DropdownTool>
            <DropdownTool
                summary = {<><span className="material-symbols-outlined">sort</span>Sort</>}
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
