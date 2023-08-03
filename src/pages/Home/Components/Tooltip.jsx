import React, { useEffect, useId, useMemo, useReducer, useRef, useState } from 'react'

import SortOption from "./SortOption"
import FiltersOption from "./FiltersOption";
// <styles>
import style from "../styles/Tooltip.module.scss";

// </styles>

function DropdownTool({
    summary,
    data_search,
    children
}) {

    return (
        <details className = {style["tool"]} data-search = {!!data_search}>
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
            >
                <FiltersOption />
            </DropdownTool>
            <DropdownTool
                summary = "Sort"
            >
                <SortOption />
            </DropdownTool>
        </div>
    </>
  )
}
