import { useState } from "react"

export default function Form({handleClose, handleSubmit, name, defaultValue}) {
    const [value, setValue] = useState(defaultValue);

    return (
        <div id="popUp">
            <div className="addBox">
                <header>
                    <h2 id="formHeader">{name} Topic</h2>
                    <button type="button" onClick={()=>handleClose(false)}>X</button>
                </header>
                <main>
                    <ul>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={value} onChange={(e)=>setValue(e.target.value)}/>
                        </li>
                    </ul>
                </main>
                <footer>
                    <button type="button" onClick={()=>setValue('')}>Reset</button>
                    <button type="button" onClick={()=>handleSubmit(value)}>{name} Topic</button>
                </footer>
            </div>
        </div>
    )
};
