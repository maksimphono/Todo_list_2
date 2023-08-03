/* Explanation:
    Here I'm using 2 components <FiltersOption>, that gets exported as default and <SelectCollections>, that is used to
    represent list of checkboxes, determining, which collections user want to be in filters.
    Here I'm using Redux 'createSlice' to create slice, that will represent data inside the <form> and actions to
    manipulate that data. That slice will NOT be added to the global store, because I don't want let any other components
    dispatch actions, that can accidentally alter this filters. So I'm creating a local store, that is controlled only
    by components, related to that form and  it's data. I'm using 'useReducer' hook with that slice's reducer to
    manipulate form data. I'm also putting 'state' and 'dispatch', created by 'useReducer' to the React context, so
    every inner component can access and alter that data.
*/

import React, { useEffect, useId, useMemo, useReducer, useRef, useState, createContext, useContext } from 'react'

import DatePicker from 'react-datepicker';
// <styles>
import style from "../styles/FiltersOption.module.scss"
import styled_buttons from "../../../buttons.module.scss"

import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCollectionRecords, selectCollectionRecordsById, selectCollectionRecordsIds } from '../../../Context/Redux/todoCollectionsSlice';
import { store } from '../../../Context/Redux/store';
import { setFilters, resetFilters } from '../../../Context/Redux/filterTodoRecordsSlice';

const formData = {
    __proto__ : null,
    selectedEndDateTo : "",
    selectedEndDateFrom : "",
    selectedCollectionIds : Object.create(null),
    searchFieldValue : ""
}

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

// context so every inner component can get access to that form data
const FormContext = createContext()

function SelectCollections() {
    const collectionsRecords = useSelector(() => selectAllCollectionRecords(store.getState()));
    const [state, dispatch] = useContext(FormContext); // access to the data of the form

    return (
        <label name = "selectedCollection">
            Collections
            <details>
                <summary>{Object.values(state.selectedCollectionIds).filter(v => v).length}</summary>
                <ul>
                    <li>
                        <input
                            className = "selectAll" 
                            type="checkbox"
                            checked = {Object.values(state.selectedCollectionIds).every(v => v)}
                            onChange = {(event) => {
                                dispatch(formSlice.actions.setAllCollectionIds({value : event.target.checked, ids : selectCollectionRecordsIds(store.getState())}))
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
                                checked = {!!state.selectedCollectionIds[record.id]}
                                onChange = {(event) => {
                                    dispatch(formSlice.actions.setCollectionIds(record.id))
                                }}
                            />
                            <span style = {{color : ((parseInt((record?.color || "#000").slice(1, 7), 16) > 0x7fffff)?"#000":"#eee")}}>{record.name}</span>
                        </li>
                    ))}
                </ul>
            </details>
        </label>
    )
}

export default function FiltersOption() {
    const [state, dispatch] = useReducer(formSlice.reducer, formSlice.getInitialState()) // create state and 'dispatch' method
    const gDispatch = useDispatch();
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

    return (
        <FormContext.Provider value = {[state, dispatch]}>
            <form className = {style["filter_option"]} onSubmit = {handleApplyfilters}>
                <label name = "searchbar">
                    Search by title
                    <input ref = {searchFieldRef} type="text" value = {state.searchFieldValue} onChange={event => dispatch(formSlice.actions.setSearchFieldValue(event.target.value))} />
                    <button type='button' name = 'clear' onClick = {() => dispatch({type : "setSearchFieldValue", payload : ""})}>x</button>
                </label>
                <SelectCollections />
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
        </FormContext.Provider>
    )
}
