import React, { useEffect, useMemo } from 'react'

// <styles>
import style from "../styles/Tooltip.module.scss";

// </styles>

const isObject = (elem) => !!(typeof(elem) == "object" && !Array.isArray(elem)) 

function DropdownTool({
    summary,
    data_search,
    children
}) {
    
    
    const newChildren = useMemo(() => {
        let classList = "";
        let newChild = null;

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
            {
            (Array.isArray(children))?
                (<div className = {style["options"]}>
                    {children}
                </div>
                )
            :
                newChildren
            }
            
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
                <ul>
                    <li>Option</li>
                    <li>Option</li>
                    <li>Option</li>
                </ul>
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
