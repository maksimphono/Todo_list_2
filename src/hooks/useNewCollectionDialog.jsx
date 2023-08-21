import { lazy, useCallback, useContext, Suspense, useId } from "react"
import modalContext from "../Context/modalContext"

export default function useNewCollectionDialog(styled_buttons) {
    const NewCollectionForm = lazy(() => import("../pages/NewRecord/Components/NewCollectionForm"))

    const {modalRef} = useContext(modalContext)
    const newCollectionFormId = useId()

    return useCallback(() => {
        modalRef.current.setTitle("New collection");
        modalRef.current.setBody(
            <Suspense fallback = {<div>Loading...</div>}>
                <NewCollectionForm id = {newCollectionFormId} closeModal = {modalRef.current.close} />
            </Suspense>
        );
        modalRef.current.setFooter([<button form = {newCollectionFormId} className = {styled_buttons && styled_buttons["success-btn"] || ""} type = "submit">Create</button>]);
        modalRef.current.showModal()
    }, [modalRef, newCollectionFormId, NewCollectionForm])
}
