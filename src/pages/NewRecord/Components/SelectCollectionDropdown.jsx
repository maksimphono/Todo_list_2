import { useRef, useEffect, useContext, useCallback, forwardRef, useImperativeHandle, useId, useMemo } from "react";

import NewCollectionForm from "./NewCollectionForm";

import {selectedTodosCollectionContext} from "../NewTodoRecord.jsx"
import modalContext from "../../../Context/modalContext.js";

// styles
import style from "../styles/SelectCollection.module.scss"//"../styles/SelectCollection.module.scss"
import styled_buttons from "../../../buttons.module.scss";
import { selectAllCollectionRecords, removeOne, selectCollectionRecordsById } from "../../../Context/Redux/todoCollectionsSlice";
import { useDispatch, useSelector } from "react-redux";

import EditCollectionForm from "./EditCollectionForm";
import { store } from "../../../Context/Redux/store";


function CollectionOption({id}) {
    const dispatch = useDispatch();
    const {setSelectedTodosCollectionId} = useContext(selectedTodosCollectionContext);
    const selectedCollection = useSelector(() => selectCollectionRecordsById(store.getState(), id))
    const {modalRef} = useContext(modalContext)

    const editCollectionFormId = useId()
    const radioInput = useRef(null);
    const textColor = useMemo(() => ((parseInt(selectedCollection.color.slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [selectedCollection?.color])
    const borderColor = useMemo(() => ((parseInt(selectedCollection.color.slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [selectedCollection?.color])

    const handleRemoveCollection = useCallback((collectionId) => {
      modalRef.current.close()
      dispatch(removeOne(collectionId))
    }, [modalRef])

    const startEditCollectionRecord = useCallback(event => {
      modalRef.current.setTitle("Edit collection");
      modalRef.current.setBody(<EditCollectionForm id = {editCollectionFormId} CollectionId = {id} closeModal = {modalRef.current.close} />);
      modalRef.current.setFooter([
        <button form = {editCollectionFormId} className = {styled_buttons["warning-btn"]} type = "submit">Edit</button>,
        <button className = {styled_buttons["danger-btn"]} type = "button" onClick = {() => handleRemoveCollection(id)}>Delete</button>
      ]);
      modalRef.current.showModal()
    }, [id, modalRef, editCollectionFormId])

    return (
      <>
        <li>
            <label>
              <span style = {{color : textColor}}>{selectedCollection?.name || ""}</span>
              <input 
                ref = {radioInput} 
                style = {{
                  background : selectedCollection?.color || "#000",
                  borderTop: `1px solid #fff`
                }}
                name = "select-collection-item" 
                type="radio" 
                onClick = {event => setSelectedTodosCollectionId(id)} 
              />
            </label>

            <button className = {style["edit-collection"]} type = "button" onClick={startEditCollectionRecord}>Edit</button>
          </li>
      </>
    )
  }

export default function SelectCollection({visiable}) {
    const {modalRef} = useContext(modalContext)
    const newCollectionFormId = useId();
    const allColection = useSelector(selectAllCollectionRecords)
    
    const showNewCollectionDialog = useCallback(() => {
      modalRef.current.setTitle("New collection");
      modalRef.current.setBody(<NewCollectionForm id = {newCollectionFormId} closeModal = {modalRef.current.close} />);
      modalRef.current.setFooter([<button form = {newCollectionFormId} className = {styled_buttons["success-btn"]} type = "submit">Create</button>]);
      modalRef.current.showModal()
    }, [modalRef, newCollectionFormId])

    return (
      <>
      <ul style = {!visiable && {display : "none"} || {}} className = {style["select-collection-list"]}>
          <li className = {style["add-collection"]}>
            <button 
              type = "button" 
              onClick = {() => {showNewCollectionDialog()}}
            >
              Add
            </button>
          </li>
          {allColection.map((item) => 
            <CollectionOption key = {item.id} id = {item.id} />
          )}
      </ul>
      </>
    )
  }