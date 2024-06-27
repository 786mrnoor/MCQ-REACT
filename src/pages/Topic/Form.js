import { useState } from "react"

export default function Form({ handleClose, handleSubmit, name, defaultValue }) {
    const [value, setValue] = useState(defaultValue.name);
    const [options, setOptions] = useState(defaultValue.options);
    const [answer, setAnswer] = useState(defaultValue.answer);

    function handleChange(e){
        let {name, value} = e.target;
        let newOpt = [...options];
        newOpt[name] = value;
        setOptions(newOpt);
    }
    function removeOption(i){
        setOptions(options.filter((o,index)=>index !== i));
    }
    function resetForm(){
        setValue('');
        setOptions([]);
        setAnswer(0);
    }
    return (
        <div id="popUp">
            <div className="addBox">
                <header>
                    <h2>{name} Question</h2>
                    <button type="button" onClick={() => handleClose(false)}>X</button>
                </header>
                <main>
                    <textarea rows="2" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Enter Question" spellCheck="false"></textarea>
                    <ul id="options">
                        {options.map((option, i) =>
                            <li key={i}>
                                <span></span>
                                <input type="text" className="option" name={i} onChange={handleChange} value={option} spellCheck="false" placeholder="Type" />
                                <input type="radio" onChange={(e)=>setAnswer(i)} checked={i === answer}  className="correct" name="correct" />
                                <button disabled={options.length < 2} onClick={()=>removeOption(i)}>X</button>
                            </li>
                        )}
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <button onClick={()=>setOptions([...options, ''])}>Add New Option</button>
                    </div>
                </main>
                <footer>
                    <button type="button" onClick={resetForm}>Reset</button>
                    <button type="button" onClick={() => handleSubmit({name: value, options, answer})}>{name} Question</button>
                </footer>
            </div>
        </div>
    )
};
