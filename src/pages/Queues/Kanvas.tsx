import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { QueueCanvasContext } from "../../context/CanvasContext";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { QueueArray, QueueType } from "../../utils/interfaces";
import Konva from "konva";



const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const {queueCanvasHeight, queueCanvasWidth, setQueueCanvasHeight, setQueueCanvasWidth, queueArray, setQueueArray } = useContext(QueueCanvasContext);
    const [localQueueArray, setLocalQueueArray] = useState<QueueArray>([])
    const [enqueueState, setEnqueueState] = useState<Boolean>(false);
    const [dequeueState, setDequeueState] = useState<Boolean>(false);
    const [headQueue, setHeadQueue] = useState<Array<Konva.Rect>>([])
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const [rectColor, setRectColor] = useState("black")
    const rectRef = React.useRef<Konva.Rect>(null);

    useEffect(() => {
        updateCanvasDimension()
    }, [queueCanvasWidth, queueCanvasWidth])


    useEffect(() => {
        window.addEventListener("resize", updateCanvasDimension)
    })

    const updateCanvasDimension = () => {
        if (canvasRef.current !== null) {
            const newWidth = canvasRef.current.clientWidth;
            setQueueCanvasWidth(newWidth);
            const newHeight = canvasRef.current.clientHeight;
            setQueueCanvasHeight(newHeight);
        }
    }

    useEffect(() => {
        if (theme.palette.mode === "dark") {
            setCanvasTheme("cv-white")
            setRectColor("white")
        } else {
            setCanvasTheme("cv-black")
            setRectColor("black")
        }
    }, [theme])


    useEffect(() => {
        let newQueueArray = [...queueArray];
        if (queueArray.length > localQueueArray.length) {
            setLocalQueueArray(newQueueArray)
            setEnqueueState(true)
        } else if (localQueueArray.length > queueArray.length) {
            setDequeueState(true)
        }
    }, [queueArray])

    useEffect(() => {
        if (enqueueState) {
            setEnqueueState(prevState => !prevState)
            animateNewBlock()
        };
    }, [enqueueState])

    useEffect(() => {
        if (dequeueState) {
            setDequeueState(prevState => !prevState)
            animateOldBlock()
        };
    }, [dequeueState])

    const animateNewBlock = () => {
        let rect = localQueueArray[localQueueArray.length - 1];
        let array = headQueue;
        if (rectRef.current !== null) array.push(rectRef.current);
        scrollDownOnEnqueue()
        setTimeout(() => {
            rectRef.current?.to({
                x: rect.posX
            })
        }, 250)
        setHeadQueue(array);
    }

    const animateOldBlock = () => {
        let newHead = [...headQueue]
        let rectRef = newHead.shift();
        let array = [...queueArray]
        scrollUpOnDequeue()
        setTimeout(() => {
            rectRef?.to({
                x: (queueCanvasWidth + 300)
            })
        }, 250)
        setTimeout(() => {
            setLocalQueueArray(array)
            setHeadQueue(newHead)
        }, 500)
    }

    const scrollUpOnDequeue = () => {
        let newArray = queueArray;
        let newHeadQueue = headQueue;
        if (queueArray.length > 1 && queueArray[0].posY < 0) {
            newHeadQueue.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y + 400,
                })
            });
            newArray.forEach((rect: QueueType) => {
                rect.posY = rect.posY + 400;
            });
            setHeadQueue(newHeadQueue);
            setQueueArray(newArray);

        } else if (queueArray.length > 1 && queueArray[0].posY > 409) {
            newHeadQueue.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y - 400,
                })
            });
            newArray.forEach((rect: QueueType) => {
                rect.posY = rect.posY - 400;
            });
            setHeadQueue(newHeadQueue);
            setQueueArray(newArray);
        }
    }

    const scrollDownOnEnqueue = () => {
        let newArray = queueArray;
        let newHeadQueue = headQueue;
        if (queueArray.length > 1 && queueArray[queueArray.length - 1].posY > 450) {
            newHeadQueue.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y - 400,
                })
            });
            newArray.forEach((rect: QueueType) => {
                rect.posY = rect.posY - 400;
            });
            setHeadQueue(newHeadQueue);
            setQueueArray(newArray);
        } else if (queueArray.length > 1 && queueArray[queueArray.length - 1].posY < 0) {
            newHeadQueue.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y + 400,
                })
            });
            newArray.forEach((rect: QueueType) => {
                rect.posY = rect.posY + 400;
            });
            setHeadQueue(newHeadQueue);
            setQueueArray(newArray);
        }
    }




    return (
        <Box mt={3}
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                justifyItems: "center"
            }}
            className="canvas"
        >
            <div className={`canvas-container ${canvasTheme}`} ref={canvasRef}>
                <Stage width={canvasRef.current?.clientWidth} height={canvasRef.current?.clientHeight}>
                    {(localQueueArray.length > 0) && <Layer>
                        <Text
                            x={(queueCanvasWidth / 2) - (30)}
                            y={localQueueArray[0].posY - 25}
                            text={"Head"}
                            fontSize={20}
                            fontStyle="bold"
                            fill={localQueueArray[0].color}
                        />
                        <Text
                            x={(queueCanvasWidth / 2) - (22)}
                            y={localQueueArray[localQueueArray.length - 1].posY + 35}
                            text={"Tail"}
                            fontSize={20}
                            fontStyle="bold"
                            fill={localQueueArray[localQueueArray.length - 1].color}
                        />
                        {localQueueArray.map((object: QueueType, index: number) => {
                            return (
                                <Rect
                                    x={-300}
                                    y={object.posY}
                                    height={object.height}
                                    width={object.width}
                                    fill={object.color}
                                    strokeWidth={1}
                                    key={object.color}
                                    ref={rectRef}
                                />
                            )
                        })}
                    </Layer>}
                    {(localQueueArray.length === 0) && (!isNaN(queueCanvasWidth)) && <Layer>
                        <Text
                            x={(queueCanvasWidth / 2) - (53)}
                            y={(queueCanvasHeight / 2)}
                            text={"Empty Queue"}
                            fontSize={15}
                            fontStyle="bold"
                            fill={rectColor}
                        />
                    </Layer>}
                </Stage>
            </div>
        </Box>
    )
}



export default Kanvas;