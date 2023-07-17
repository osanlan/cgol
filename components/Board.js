'use client'

import React, { useState, useEffect } from 'react'




function Board() {
    let gridSize = 50;
    let initialArray = Array(gridSize).fill(Array(gridSize).fill(false));

    let [stateArray, setStateArray] = useState(initialArray);

    function changeState(i,j,stateArray, setStateArray) {
        const newState = stateArray.map((row, r_index) => {
            if (r_index === i) {
                return row.map((block, c_index) => {
                    if (c_index === j) {
                        return !stateArray[i][j]
                    } 
                    return block
                })
            }
            return row
        })
        setStateArray(newState)
    }

    function handleProgress(stateArray, setStateArray) {
        console.log("progressing")
        const newState = stateArray.map((row, r_index) => {
            return row.map((block, c_index) => {
                let count = countNeighbors(stateArray, r_index, c_index);
                if(count == 2 || count == 3) {
                    return true
                } else {
                    return false
                }
            })
        })
        setStateArray(newState)
    }

    function countNeighbors(stateArray, r_index, c_index) {
        let count = 0;
        let top = [r_index - 1, c_index];
        let topRight = [r_index - 1, c_index + 1];
        let right = [r_index, c_index + 1];
        let bottomRight = [r_index + 1, c_index + 1];
        let bottom = [r_index + 1, c_index];    
        let bottomLeft = [r_index + 1, c_index - 1];
        let left = [r_index, c_index - 1];
        let topLeft = [r_index - 1, c_index - 1];
        let neighbors = [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft];
        neighbors.forEach((neighbor) => {
            if (neighbor[0] < 0 || neighbor[1] < 0) return;
            if (neighbor[0] > gridSize - 1 || neighbor[1] > gridSize - 1) return;
            if (stateArray[neighbor[0]][neighbor[1]]) {
                count++;
            }
             
        })
        // console.log(count)
        return count;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handleProgress(stateArray, setStateArray)
        }, 1000);
        return () => clearInterval(interval);
    }, [stateArray]);

    return (
        <>
        {Array.from(Array(gridSize).keys()).map((i) => (
        <div className="flex flex-row" key={"row"+i}>
            {Array.from(Array(gridSize).keys()).map((j) => (
            <div className={`flex flex-col w-3 h-3 ${stateArray[i][j] ? "bg-green-800" : "bg-red-800"}`} onClick={() => changeState(i,j,stateArray, setStateArray)} key={i + " " + j}>
                {/* {stateArray[i][j] ? "TRUE" : "f"} */}
            </div>
            ))}
        </div>
        ))}
        <button onClick={() => handleProgress(stateArray, setStateArray)}>Progress</button>
        </>
    )
}

export default Board