import React, { useState, useContext, useEffect } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Kanvas from "../Stacks/Kanvas";
import { StackType } from "../../utils/interfaces";


const StacksCompiler = () => {
    const [scale, setScale] = useState<number>(1)
    const { canvasHeight, canvasWidth, stacksArray, setStacksArray } = useContext(CanvasContext);
    const [buttonActive, setButtonActive] = useState(false)

    useEffect(() => {
        let newStacksArray = stacksArray;
        newStacksArray.forEach((object: StackType) => {
            object.posX = canvasWidth / 3;
            object.width = canvasWidth / 3;
        });
        setStacksArray(newStacksArray)
    }, [canvasHeight, canvasWidth])

    class StackNode {
        posX: number;
        posY: number;
        height: number;
        width: number;

        constructor(posX: number, posY: number, height: number, width: number) {
            this.posX = posX;
            this.posY = posY;
            this.height = height;
            this.width = width
        }
    }

    const createNewStackObject = () => {
        if (stacksArray.length > 0) {
            let currentHead = stacksArray[stacksArray.length - 1]
            let posY = currentHead.posY - 35;
            let posX = currentHead.posX;
            let height = 30 * scale;
            let width = canvasWidth / 3;
            let newStackNode = new StackNode(posX, posY, height, width);
            return newStackNode
        } else {
            let posY = canvasHeight - 35;
            let posX = canvasWidth / 3;
            let height = 30 * scale;
            let width = canvasWidth / 3;
            let newStackNode = new StackNode(posX, posY, height, width);
            return newStackNode
        }
    }


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

    const popHeadOfStack = () => {
        if (!buttonActive && stacksArray.length > 0) {
            setButtonActive(true);
            let newArray = [...stacksArray];
            newArray.pop();
            setStacksArray(newArray);
            resetButton()
        }
    }

    const resetButton = () => {
        setTimeout(() => {
            setButtonActive(false)
        }, 100);
    }

    return (
        <React.Fragment>
            <Kanvas></Kanvas>
            <Box mt={5}
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    justifyItems: "center"
                }}>
                {(!isNaN(canvasWidth)) &&
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="success" onClick={pushNewHeadToStack}>Push</Button>
                        <Button variant="contained" color="error" onClick={popHeadOfStack}>Pop</Button>
                    </Stack>
                }
            </Box>
        </React.Fragment>
    )
}

export default StacksCompiler