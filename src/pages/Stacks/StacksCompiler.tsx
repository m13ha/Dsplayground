import React, { useState, useContext, useEffect } from "react";
import { StackCanvasContext } from "../../context/CanvasContext";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Kanvas from "../Stacks/Kanvas";
import { StackType } from "../../utils/interfaces";
import randomColorGenerator from "../../utils/randomColorGenerator";


const StacksCompiler = () => {
    const { stackCanvasHeight, stackCanvasWidth, stacksArray, setStacksArray } = useContext(StackCanvasContext);
    const [buttonActive, setButtonActive] = useState(false)

    // if there is a change in the screen width change the position of all elements in the stack
    useEffect(() => {
        let newStacksArray = stacksArray;
        newStacksArray.forEach((object: StackType) => {
            object.posX = (stackCanvasWidth / 2) - 125;
            object.width = 250;
        });
        setStacksArray(newStacksArray)
    }, [stackCanvasWidth])

    class StackNode {
        posX: number;
        posY: number;
        height: number;
        width: number;
        color: string;
        value: string;

        constructor(posX: number, posY: number, height: number, width: number, color: string, value: string) {
            this.posX = posX;
            this.posY = posY;
            this.height = height;
            this.width = width;
            this.color = color;
            this.value  = value;

        }
    }

    // CREATE A NEW STACK USING DATA FROM THE CURRENT HEAD OR CREATE A NEW HEAD
    const createNewStackObject = () => {
        let posY, posX, height, width, color, value;

        if (stacksArray.length > 0) {
            let currentHead = stacksArray[stacksArray.length - 1]
             posY = currentHead.posY - 65;
             posX = currentHead.posX;
             height = 60;
             width = currentHead.width;
             color = randomColorGenerator();
             value = color;
        } else {
             posY = stackCanvasHeight - 65;
             posX = (stackCanvasWidth / 2) - 125;
             height = 60;
             width = 250;
             color = randomColorGenerator();
             value = color;
        }

        let newStackNode = new StackNode(posX, posY, height, width, color, value);
        return newStackNode
    }


    // ADD A NEW ELEMENT TO THE STACK
    const pushNewHeadToStack = () => {
        if (!buttonActive) {
            setButtonActive(true);
            let newStackNode = createNewStackObject();
            let newArray = [...stacksArray];
            newArray.push(newStackNode);
            setStacksArray(newArray);
            resetButton()
        }
    }

    // REMOVE AN ELEMENT FROM THE STACK
    const popHeadOfStack = () => {
        if (!buttonActive && stacksArray.length > 0) {
            setButtonActive(true);
            let newArray = [...stacksArray];
            newArray.pop();
            setStacksArray(newArray);
            resetButton()
        }
    }

    // BUTTON DELAY
    const resetButton = () => {
        setTimeout(() => {
            setButtonActive(false)
        }, 1000);
    }

    return (
        <React.Fragment>
            <Kanvas></Kanvas>
            <Box mt={2} mb={2}
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    justifyItems: "center"
                }}>
                {(!isNaN(stackCanvasWidth)) &&
                    <Stack direction="row" spacing={2}>
                        <Button size="small" variant="outlined"  onClick={pushNewHeadToStack}>Push</Button>
                        <Button size="small" variant="outlined" onClick={popHeadOfStack}>Pop</Button>
                    </Stack>
                }
            </Box>
        </React.Fragment>
    )
}

export default StacksCompiler