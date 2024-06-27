import './Loader.css';
import { forwardRef } from "react"

const Loader =  forwardRef((props, ref)=>{
    return (
        <div id="loaderContainer" ref={ref}>
            <div className="loader"></div>
        </div>
    )
});
export default Loader;