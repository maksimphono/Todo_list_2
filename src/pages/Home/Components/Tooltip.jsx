import React, { useEffect, useId, useMemo, useRef, useState } from 'react'

import DatePicker from 'react-datepicker';
// <styles>
import style from "../styles/Tooltip.module.scss";
import style_filters_option from "../styles/FiltersOption.module.scss"

// </styles>

const isObject = (elem) => !!(typeof(elem) == "object" && !Array.isArray(elem)) 

function FiltersOption() {
    const [selectedEndDateTo, setSelectedEndDateTo] = useState()
    const [selectedEndDateFrom, setSelectedEndDateFrom] = useState();
    const collectionSelectElem = useId();
    const searchFieldRef = useRef(null);

    return (
        <>
            <form className = {style_filters_option["filter_option"]}>
                <label name = "searchbar">
                    Search by title
                    <input ref = {searchFieldRef} type="text" />
                    <button type='button' name = 'clear' onClick = {() => searchFieldRef.current.value = ""}>x</button>
                </label>
                <label name = "selectedCollection">
                    Collections
                    <select>
                        <option value="">asd</option>
                        <option value="">asdf</option>
                        <option value="">sdf</option>
                        <option value="">bgr</option>
                        <option value="">vh</option>
                        <option value="">ftyu</option>
                    </select>
                </label>
                <label name = "datepick">
                    End date from
                    <DatePicker
                        selected = {selectedEndDateFrom}
                        onChange = {setSelectedEndDateFrom}
                        dateFormat = "dd/MM/yyyy"
                        placeholderText='Select a Date'
                    />
                </label>
                <label name = 'datepick'>
                    End date to
                    <DatePicker
                        selected = {selectedEndDateTo}
                        onChange = {setSelectedEndDateTo}
                        dateFormat = "dd/MM/yyyy"
                        placeholderText='Select a Date'
                    />
                </label>
                
            </form>
        </>
    )
}

function DropdownTool({
    summary,
    data_search,
    children
}) {
    
    
    const wrappedChild = useMemo(() => {
        // that method is used when only one child was provided. That child will get className 'options'
        // and then will be rendered
        
        let classList = "";
        let newChild = null;

        console.dir(children)
        if (isObject(children)) {
            classList = style["options"]
            if (children.props?.className)
                if (!children.props.className.split(" ").includes(style["options"]))
                    classList += " " + children.props.className;
            
            newChild = React.Children.map([children], child => (React.cloneElement(child, {className : classList})))[0]
            return newChild;
        }
        
        return <></>;

    }, [])

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
                <ul>
                    <li>Sort 1</li>
                    <li>Option</li>
                    <li>Option</li>
                </ul>
            </DropdownTool>
        </div>
    </>
  )
}
