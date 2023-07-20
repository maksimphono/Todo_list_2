import React from 'react'
import "./new_todo_record.scss"
import Tooltip from './Components/Tooltip'

export default function NewTodoRecord() {
  return (
    <>
      <div id = "new_todo_record">
            <Tooltip />
            <div style = {{display:"none"}} className = "tooltip">
                <form>
                    <select name="font" id="">
                        <option value="">Monospace</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <select name="size" id="">
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                        <option value="">12</option>
                        <option value="">14</option>
                        <option value="">16</option>
                        <option value="">18</option>
                        <option value="">20</option>
                        <option value="">22</option>
                    </select>
                    <button name="font-size-up"></button>
                    <button name="font-size-dn"></button>
                    <input name="font-bold" type="checkbox" />
                    <input name="font-underline" type="checkbox" />
                    <input type="checkbox" />
                    <input type="checkbox" />
                    <details name="font-color">
                        <summary>

                        </summary>
                        <input type="color" />
                    </details>
                    <details name="mark-color">
                        <summary>

                        </summary>
                        <input type="color" />
                    </details>
                </form>
                <button></button>
                <button></button>
                <button></button>
                
            </div>

            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, culpa natus porro blanditiis rerum quod quasi eaque iusto sequi tempora saepe, neque voluptate. Incidunt quam commodi adipisci voluptate, perferendis distinctio?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim distinctio rem consequuntur, et id modi iste aperiam tempora illo dignissimos culpa, doloribus nobis eaque laboriosam cupiditate illum officiis tenetur laudantium!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore soluta, impedit omnis alias facere hic. Atque reprehenderit nam a impedit, voluptatibus quae nemo ad iure blanditiis voluptatem dolorem, aliquam iste?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, fugiat? Similique asperiores quia repellendus nulla voluptatem eos molestiae fugit, magnam architecto praesentium ipsa sequi dolorum autem consectetur atque eligendi adipisci.
            </p>

            <button className = "success-btn" type = "submit">Craete record</button>
            <button className = "secondary-btn" name = 'cancel'>Cancel</button>
        </div>

    </>
  )
}
