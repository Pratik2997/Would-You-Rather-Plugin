import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import "./frontend.css"
import "./WyrRoute.js"
import "./WyrGetRoute.js"
import _uniqueId from 'lodash/uniqueId';

const divsToUpdate = document.querySelectorAll(".would-you-rather-update-me")

divsToUpdate.forEach(function (div) {
    const data = JSON.parse(div.querySelector("pre").innerHTML)
    ReactDOM.render(<Quiz {...data} />, div)
})

function Quiz(props) {
    const [isClicked, setIsClicked] = useState(false)
    const [resultsScreen, setResultsScreen] = useState(false)

    useEffect(() => {
        if (isClicked == true) {
            setResultsScreen(true)
        }
    }, [isClicked])

    return (
        <div className="wyr-frontend mt-5" id={props.id}>
            <h3>{props.question}</h3>
            <div className="d-flex align-items-center">
                    <div className={("flex-fill text-center align-middle firstAns") + (resultsScreen === true ? " no-click" : "")} onClick={() => { setIsClicked(true) }}>{(resultsScreen === true) ? "" : (props.answer1)}</div>
                    <div className={("flex-fill text-center align-middle secondAns") + (resultsScreen === true ? " no-click" : "")} onClick={() => { setIsClicked(true) }}>{(resultsScreen === true) ? "" : (props.answer2)}</div>               
            </div>
        </div>
    )
}

