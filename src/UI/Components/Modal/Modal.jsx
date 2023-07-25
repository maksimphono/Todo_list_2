import React, {forwardRef, useImperativeHandle} from 'react'

export default forwardRef(function Modal(props, ref) {
    useImperativeHandle(ref, () => {
        return {
            alert : console.log
        }
    })
  
    return (
    <>
        <dialog id = {"modal-dialog"} className = "modal">
            <h2 className = "title"></h2>
            <p className = "content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa quidem assumenda quam voluptatibus mollitia. Fugit ea harum illo, culpa nemo sapiente temporibus ipsa eos doloremque itaque a eum debitis quidem?</p>
            <ul className = "buttons">
                <li><button className = "warning-btn">Cancel</button></li>
                <li><button className = "success-btn">Submit</button></li>
            </ul>
            <button className = "cancel-X-btn">x</button>
            
        </dialog>
    </>
  )
})
