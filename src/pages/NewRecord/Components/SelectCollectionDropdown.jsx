import { useRef, useEffect, useContext, useCallback, forwardRef, useImperativeHandle, useId, useMemo } from "react";

import NewCollectionForm from "./NewCollectionForm";
import EditCollectionForm from "./EditCollectionForm";

import {selectedTodosCollectionContext} from "../SingleTodoRecord.jsx"
import modalContext from "../../../Context/modalContext.js";

import { selectAllCollectionRecords, selectCollectionRecordsById } from "../../../Context/Redux/todoCollectionsSlice";
import { useDispatch, useSelector } from "react-redux";

import useReduxStoreState from "../../../hooks/useReduxStoreState"

// styles
import style from "../styles/SelectCollection.module.scss"//"../styles/SelectCollection.module.scss"
import styled_buttons from "../../../buttons.module.scss";

const COLLECTION_DELETION_WARNING = "Warning! After deleting a collection, all todo records, belonging to that collection will be deleted as well!\nProceed?"
const COLLECTION_DELETION_SUCCESS = "Collection deleted"
const ACTION_CANCELED = "Action canceled"

function CollectionOption({id, onChange, onBlur}) {
    const storeState = useReduxStoreState()
    const dispatch = useDispatch();
    const {setSelectedTodosCollectionId, inputName} = useContext(selectedTodosCollectionContext);
    const selectedCollection = useSelector(() => selectCollectionRecordsById(storeState, id))
    const {modalRef} = useContext(modalContext)

    const editCollectionFormId = useId()
    const radioInput = useRef(null);
    const textColor = useMemo(() => ((parseInt(selectedCollection.color.slice(1, 7), 16) > 0x7fffff)?"#000":"#eee"), [selectedCollection?.color])

    const handleRemoveCollection = useCallback(async (collectionId) => {      
      try {
        await confirmationRef.current.show(COLLECTION_DELETION_WARNING)
        await removeOneCollectionRecord({dispatch, id : collectionId, state : storeState})
        notificationRef.current.pop({variant : "info", text : COLLECTION_DELETION_SUCCESS})
        modalRef.current.close()
      } catch (error) {
        modalRef.current.close()
        if (error === Refused) {
          notificationRef.current.pop({variant : "info", text : ACTION_CANCELED})
        }
        else
          notificationRef.current.pop({variant : "warning", text : error.toString()})
      }
      
    }, [modalRef, storeState])

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
                  background : selectedCollection?.color || "",
                  borderTop: `1px solid #fff`
                }}
                name = {inputName}
                onBlur = {onBlur}
                type="radio"
                value = {id}
                onChange = {(event) => {setSelectedTodosCollectionId(id); onChange(event)}}
              />
            </label>

            <button className = {style["edit-collection"]} type = "button" onClick={startEditCollectionRecord}>Edit</button>
          </li>
      </>
    )
  }

export default function SelectCollection({visiable, onChange, onBlur}) {
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
      <ul style = {(!visiable)?{display : "none"}:{}} className = {style["select-collection-list"]}>
          <li className = {style["add-collection"]}>
            <button 
              type = "button" 
              onClick = {showNewCollectionDialog}
            >
              Add
            </button>
          </li>
          {allColection.map((item) => 
            <CollectionOption key = {item.id} id = {item.id} onChange = {onChange} onBlur = {onBlur}/>
          )}
      </ul>
      </>
    )
  }