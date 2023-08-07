import {useCallback, useContext, useEffect} from "react"

import modalContext from "../../../Context/modalContext.js";


import {addOneCollection, updateNameAndColor} from "../../../Context/Redux/todoCollectionsSlice.js"
import { store } from "../../../Context/Redux/store.js";



// styles
import style_NewCollectionForm from "../styles/NewCollectionForm.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { selectCollectionRecordsById, selectAllCollectionRecords } from "../../../Context/Redux/todoCollectionsSlice.js";

import { updateOneCollection } from "../../../Context/Redux/utilities.js";

export default function EditCollectionForm({id, closeModal, CollectionId}) {
    const dispatch = useDispatch()
    const collectionRecord = useSelector(() => selectCollectionRecordsById(store.getState(), CollectionId))
    
    const handleSubmit = useCallback(async event => {
      event.preventDefault()
      const formDate = new FormData(event.target)
      console.log(formDate.get("name"), formDate.get("color"))

      try {
        await updateOneCollection({dispatch, entry : {
          id : CollectionId,
          name : formDate.get("name"), 
          color : formDate.get("color")
        }})
        notificationRef.current.pop({variant : "info", text : "Collection altered"})
        event.target.reset()
        closeModal();
      } catch (error) {
        notificationRef.current.pop({variant : "warning", text : error.toString()})
      }
      
    })
    
    return (
      <form 
        id = {id}
        className = {style_NewCollectionForm["new_collection_modal_form"]} 
        onSubmit = {handleSubmit}
      >
        <label>
          <h3>Collection name</h3>
          <input name = "name" type="text" defaultValue={collectionRecord?.name || ""} />
        </label>
        <label className = {style_NewCollectionForm["color-picker"]}>
          <h3>Collection color</h3>
          <input name = "color" type="color" defaultValue={collectionRecord?.color || "#000"} />
        </label>
      </form>
    )
  }