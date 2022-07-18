import React, { useState, useContext, useEffect } from "react";
import { CanvasContext } from "../context/CanvasContext";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from "@mui/material/Box";
import Kanvas from "./Kanvas";
import { StackType } from "../utils/interfaces";


const StacksCompiler = () => {
    const [scale, setScale] = useState<number>(1)
    const { canvasHeight, canvasWidth, stacksArray, setStacksArray } = useContext(CanvasContext);

    useEffect(() => {
        let newStacksArray = stacksArray;
        newStacksArray.forEach((object: StackType) => {
            object.posX  = canvasWidth / 3;
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
            let newArray = [...stacksArray]
            newArray.push(newStackNode);
            setStacksArray(newArray);
        } else {
            let posY = canvasHeight - 35;
            let posX = canvasWidth / 3;
            let height = 30 * scale;
            let width = canvasWidth / 3;
            let newStackNode = new StackNode(posX, posY, height, width);
            let newArray = [...stacksArray];
            newArray.push(newStackNode);
            setStacksArray(newArray);

        }
    }

    return (
        <React.Fragment>
            <Kanvas></Kanvas>
            <Box mt={4}
                sx={{
                    width: "100%",
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    justifyItems: "center"
                }}>
                < ButtonGroup variant="contained" aria-label="outlined primary button group" >
                    {(!isNaN(canvasWidth)) &&
                        <Button onClick={createNewStackObject}>Push to Stack</Button>
                    }
                </ButtonGroup >
            </Box>
        </React.Fragment>
    )
}

export default StacksCompiler