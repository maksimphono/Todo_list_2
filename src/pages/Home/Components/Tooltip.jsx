import React, { useEffect, useId, useMemo, useReducer, useRef, useState } from 'react'

import DatePicker from 'react-datepicker';
// <styles>
import style from "../styles/Tooltip.module.scss";
import style_filters_option from "../styles/FiltersOption.module.scss"
import styled_buttons from "../../../buttons.module.scss"

// </styles>

const isObject = (elem) => !!(typeof(elem) == "object" && !Array.isArray(elem)) 

const count_1_MounthBefore = (date) => {
    const copyDate = date
    copyDate.setDate(copyDate.getDate() - 30)
    return copyDate
}

const count_1_MounthAfter = (date) => {
    const copyDate = date
    copyDate.setDate(copyDate.getDate() + 30)
    return copyDate
}

const formData = {
    __proto__ : null,
    selectedEndDateTo : "",
    selectedEndDateFrom : "",
    selectedCollectionIds : Object.create(null),
    searchFieldValue : ""
}

import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCollectionRecords, selectCollectionRecordsById, selectCollectionRecordsIds } from '../../../Context/Redux/todoCollectionsSlice';
import { store } from '../../../Context/Redux/store';

const formSlice = createSlice({
    name : "formSlice",
    initialState : formData,
    reducers : {
        setSearchFieldValue : (state, action) => {
            return {...state, searchFieldValue : action.payload}
        },
        setEndDateTo : (state, action) => {
            return {...state, selectedEndDateTo : action.payload}
        },
        setEndDateFrom : (state, action) => {
            return {...state, selectedEndDateFrom : action.payload}
        },
        setCollectionIds : (state, action) => {
            const selectedCollectionIds = {...(state.selectedCollectionIds)}
            if (selectedCollectionIds[action.payload]) {
                selectedCollectionIds[action.payload] = false
            } else {
                selectedCollectionIds[action.payload] = true
            }
            return {...state, selectedCollectionIds};
        },
        setAllCollectionIds : (state, action) => {
            const selectedCollectionIds = {...(state.selectedCollectionIds)}
            for (let id of action.payload.ids) {
                selectedCollectionIds[id] = !!action.payload.value;
            }
            return {...state, selectedCollectionIds}
        },
        resetData : (state, action) => {
            return {...formData}
        }
    }
})

import { setFilters, resetFilters } from '../../../Context/Redux/filterTodoRecordsSlice';
import $ from "jquery"

function FiltersOption() {
    const [state, dispatch] = useReducer(formSlice.reducer, formData)
    const gDispatch = useDispatch();
    const collectionsRecords = useSelector(() => selectAllCollectionRecords(store.getState()));
    const selectedCollectionsNames = useSelector(storeState => selectAllCollectionRecords(storeState).filter(record => state.selectedCollectionIds[record.id]).map(record => record.name))
    //const selectedCollectionTextColor = useMemo(() => ((parseInt((selectedCollection?.color || "#000").slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [collectionsRecords[state.selectedCollectionIds].color])
    const collectionSelectElem = useId();
    const searchFieldRef = useRef(null);

    const handleApplyfilters = event => {
        event.preventDefault()
        gDispatch(setFilters(JSON.parse(JSON.stringify(state))))
    }

    const handleFiltersReset = () => {
        gDispatch(resetFilters())
        dispatch(formSlice.actions.resetData())
        dispatch(
            formSlice.actions
                .setAllCollectionIds({
                    value : true,
                    ids : selectCollectionRecordsIds(store.getState())
                }
            )
        )
        $("input.setCollectionIds").prop("checked", true)
    }

    useEffect(() => {
        dispatch(
            formSlice.actions
                .setAllCollectionIds({
                    value : true,
                    ids : selectCollectionRecordsIds(store.getState())
                }
            )
        )
    }, [])

    useEffect(() => {
        if (Object.values(state.selectedCollectionIds).every(v => v)) {
            $("input.selectAll").prop("checked", true)
        } else {
            $("input.selectAll").prop("checked", false)
        }
    }, [state.selectedCollectionIds])

    return (
        <>
            <form className = {style_filters_option["filter_option"]} onSubmit = {handleApplyfilters}>
                <label name = "searchbar">
                    Search by title
                    <input ref = {searchFieldRef} type="text" value = {state.searchFieldValue} onChange={event => dispatch(formSlice.actions.setSearchFieldValue(event.target.value))} />
                    <button type='button' name = 'clear' onClick = {() => dispatch({type : "setSearchFieldValue", payload : ""})}>x</button>
                </label>
                <label name = "selectedCollection">
                    Collections
                    <details>
                        <summary>{Object.values(state.selectedCollectionIds).filter(v => v).length}</summary>
                        <ul>
                            <li>
                                <input
                                    className = "selectAll" 
                                    type="checkbox"
                                    onClick = {(event) => {
                                        dispatch(formSlice.actions.setAllCollectionIds({value : event.target.checked, ids : selectCollectionRecordsIds(store.getState())}))
                                        $("input.setCollectionIds").prop("checked", event.target.checked)
                                    }}
                                />
                                <span style = {{color : "#000"}}>All</span>
                            </li>
                            {collectionsRecords.map(record => (
                                <li key = {record.id}
                                    style = {{
                                        background : record.color,
                                    }}
                                >
                                    <input
                                        className = "setCollectionIds" 
                                        type="checkbox"
                                        defaultChecked = {true}
                                        onClick = {(event) => {
                                            dispatch(formSlice.actions.setCollectionIds(record.id))
                                            //if (event)
                                        }}
                                    />
                                    <span style = {{color : ((parseInt((record?.color || "#000").slice(1, 7), 16) > 0x7fffff)?"#000":"#eee")}}>{record.name}</span>
                                </li>
                            ))}
                        </ul>
                    </details>
                </label>
                <label name = "datepick">
                    End date from
                    <DatePicker
                        selected = {state.selectedEndDateFrom}
                        onChange = {(date) => dispatch(formSlice.actions.setEndDateFrom(date))}
                        dateFormat = "dd/MM/yyyy"
                        placeholderText='Select a Date'
                    />
                </label>
                <label name = 'datepick'>
                    End date to
                    <DatePicker
                        selected = {state.selectedEndDateTo}
                        onChange = {(date) => dispatch(formSlice.actions.setEndDateTo(date))}
                        dateFormat = "dd/MM/yyyy"
                        placeholderText='Select a Date'
                    />
                </label>
                <button className = {styled_buttons["success-btn"]} type='submit'>Apply filters</button>
                <button className = {styled_buttons["secondary-btn"]} onClick = {handleFiltersReset} type = "button">Reset</button>

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
