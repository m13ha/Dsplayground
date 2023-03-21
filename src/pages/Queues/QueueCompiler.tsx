import React, { useState, useContext, useEffect } from "react";
import  { QueueCanvasContext } from "../../context/CanvasContext";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Kanvas from "../Queues/Kanvas";
import { QueueType } from "../../utils/interfaces";
import randomColorGenerator from "../../utils/randomColorGenerator";


const QueueCompiler = () => {
    const { queueCanvasHeight, queueCanvasWidth, queueArray, setQueueArray } = useContext(QueueCanvasContext);
    const [buttonActive, setButtonActive] = useState(false)

    useEffect(() => {
        let newQueueArray = [...queueArray];
        newQueueArray.forEach((object: QueueType) => {
            object.posX = (queueCanvasWidth / 2) - 125;
            object.width = 250;
        });
        setQueueArray(newQueueArray)
    }, [queueCanvasWidth])


    class QueueNode {
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
            this.value = value;

        }
    }

    const createNewQueueObject = () => {
        let posY, posX, height, width, color, value;

        let newQueueArray = [...queueArray];

        newQueueArray.forEach((object: QueueType) => {
            object.posX = object.posX - 65;
        });

        if (queueArray.length > 0) {
            let currentHead = newQueueArray[newQueueArray.length - 1]
            posY = currentHead.posY;
            posX = currentHead.posX + 65;
            height = 250;
            width = currentHead.width;
            color = randomColorGenerator();
            value = color;
        } else {
            posX = queueCanvasWidth - 65;
            posY = (queueCanvasHeight / 2) - 125;
            height = 250;
            width = 60;
            color = randomColorGenerator();
            value = color;
        }

        let newQueueNode = new QueueNode(posX, posY, height, width, color, value);
        return newQueueNode
    }

    const enqueue  = () => {
        if (!buttonActive) {
            setButtonActive(true);
            let array = queueArray;
            let newQueueNode = createNewQueueObject();
            array.push(newQueueNode);
            setQueueArray([...array]);
            resetButton();
        }
    }

    const dequeue = () => {
        if (!buttonActive && queueArray.length > 0) {
            setButtonActive(true);
            let newArray = [...queueArray];
            let array = newArray.slice(1)
            setQueueArray(array);
            resetButton()
        }
    }

    const resetButton = () => {
       setTimeout(() => {
            setButtonActive(false)
        }, 800);
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
                {(!isNaN(queueCanvasWidth)) &&
                    <Stack direction="row" spacing={2}>
                        <Button size="small" variant="outlined" onClick={enqueue}>Enqueue</Button>
                        <Button size="small" variant="outlined" onClick={dequeue}>Dequeue</Button>
                    </Stack>
                }
            </Box>
        </React.Fragment>
    )
 }

 export default QueueCompiler