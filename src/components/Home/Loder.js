import React from 'react'
import gif from "../Images/spinner.gif"
function Loder() {
    let style =({
        width:"300px",
        marginTop:"40px",
        
    })
    return (
        <div className="container text-center">
            <img style={style} src={gif} alt="load" />
        </div>
    )
}
export default Loder