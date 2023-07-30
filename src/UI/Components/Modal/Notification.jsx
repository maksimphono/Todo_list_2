import React, {createContext, forwardRef, useImperativeHandle} from 'react'

const NotificationContext = createContext()

export default function Notification() {
  return (
    <div style = "display: none;" class = "notification danger">
        <p>Success</p>
        <button class = "cancel-X-btn">x</button>
    </div>
  )
}
