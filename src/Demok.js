import React from 'react'

function Demok() {

    const callme = () => {
        console.log("Hello World")
    }
    return (
        <div style={{ backgroundColor: "red" }}>
            <h1> CALL ME DIV</h1>
            { callme()}
        </div>
    )
}

export default Demok
