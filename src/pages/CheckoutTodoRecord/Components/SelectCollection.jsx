import { useRef, useEffect, useContext } from "react";

import {selectedTodosCollectionContext} from "../CheckoutTodoRecord.jsx"

// styles
import style from "../styles/SelectCollection.module.scss"//"../styles/SelectCollection.module.scss"

function CollectionOption({title}) {
    const context = useContext(selectedTodosCollectionContext);
    const radioInput = useRef(null);
    return (
      <>
        <li>
            <label>
              {title}
              <input ref = {radioInput} name = "select-collection-item" type="radio" onClick = {event => context.setSelectedTodosCollection(title)} />
            </label>
                        
            <button className = {style["edit-collection"]} type = "button">Edit</button>
          </li>
      </>
    )
  }
  
export default function SelectCollection() {
    return (
      <>
      <ul className = {style["select-collection-list"]}>
          <li className = {style["add-collection"]}>
            <button type = "button">Add</button>
          </li>
          <CollectionOption title = "qert"/>
          <CollectionOption title = "asdfg"/>
          <CollectionOption title = "lkmn "/>
      </ul>
      </>
    )
  }