import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { QueueCanvasContext } from "../../context/CanvasContext";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { QueueArray, QueueType } from "../../utils/interfaces";
import Konva from "konva";
import pop from "../../assets/audio/pop.mp3";
import push from "../../assets/audio/push.mp3";
import useSound from "use-sound";



const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { queueCanvasHeight, queueCanvasWidth, setQueueCanvasHeight, setQueueCanvasWidth, queueArray, setQueueArray } = useContext(QueueCanvasContext);
    const [localQueueArray, setLocalQueueArray] = useState<QueueArray>([])
    const [enqueueState, setEnqueueState] = useState<Boolean>(false);
    const [dequeueState, setDequeueState] = useState<Boolean>(false);
    const [headQueue, setHeadQueue] = useState<Array<Konva.Rect>>([])
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const [rectColor, setRectColor] = useState("black")
    const rectRef = React.useRef<Konva.Rect>(null);
    const [playPop] = useSound(pop);
    const [playPush] = useSound(push);


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
            enqueueAnimation()
        };
        //console.log(queueArray[0], queueArray[queueArray.length - 1])
    }, [enqueueState])

    useEffect(() => {
        if (dequeueState) {
            setDequeueState(prevState => !prevState)
            dequeueAnimation()
        };
    }, [dequeueState])

    const enqueueAnimation = () => {
        let array = headQueue;
        if (rectRef.current !== null) array.push(rectRef.current);
        scrollRightOnEnqueue()
        playPush()
        setTimeout(() => {
            rectRef.current?.to({
                scaleX: 1
            })
        }, 200)
        scrollRightOnEnqueue()
        setHeadQueue(array);
    }

    const dequeueAnimation = () => {
        setTimeout(() => {
            rectRef?.to({
                scaleX: 0
            })
        }, 200)
        playPop()
        let newHead = [...headQueue]
        let rectRef = newHead.shift();
        let array = [...queueArray]
        scrollLeftOnDequeue()
        setTimeout(() => {
            setLocalQueueArray(array)
            setHeadQueue(newHead)
        }, 500)
    }

    const scrollLeftOnDequeue = () => {
        let newArray = queueArray;
        let newHeadQueueRectRef = headQueue;
        if (queueArray.length > 1 && queueArray[0].posX < 0) {
            let count = newArray[0].posX - newArray[newArray.length - 1].posX

            newHeadQueueRectRef.forEach((rect: any) => {
                rect?.to({
                    x: rect.attrs.x - count,
                })
            });
            newArray.forEach((rect: QueueType) => {
                rect.posX = rect.posX - count;
            });
            setHeadQueue(newHeadQueueRectRef);
            setQueueArray(newArray);


        } else if (queueArray.length > 1 && queueArray[0].posX > queueCanvasWidth - 45) {
            newHeadQueueRectRef.forEach((rect: any) => {
                rect?.to({
                    x: rect.attrs.x - queueCanvasWidth/2,
                })
            });
            newArray.forEach((rect: QueueType) => {
                rect.posX = rect.posX - queueCanvasWidth/2;
            });
            setHeadQueue(newHeadQueueRectRef);
            setQueueArray(newArray);

        }
    }

    const scrollRightOnEnqueue = () => {
        let newArray = queueArray;
        let newHeadQueueRectRef = headQueue;
        if (queueArray.length > 1 && queueArray[queueArray.length - 1].posX > queueCanvasWidth - 45) {
            newHeadQueueRectRef.forEach((rect: any) => {
                rect?.to({
                    x: rect.attrs.x - queueCanvasWidth/2,
                })
            });
            newArray.forEach((rect: QueueType) => {
                rect.posX = rect.posX - queueCanvasWidth/2;
            });
            setHeadQueue(newHeadQueueRectRef);
            setQueueArray(newArray);

        } else if (queueArray.length > 1 && queueArray[queueArray.length - 1].posX < 45) {
            let count = newArray[0].posX - newArray[newArray.length - 1].posX

            newHeadQueueRectRef.forEach((rect: any) => {
                rect?.to({
                    x: rect.attrs.x - count,
                })
            });
            newArray.forEach((rect: QueueType) => {
                rect.posX = rect.posX - count;
            });
            setHeadQueue(newHeadQueueRectRef);
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
                            x={localQueueArray[0].posX}
                            y={localQueueArray[0].posY - 35}
                            text={"Head"}
                            fontSize={20}
                            fontStyle="bold"
                            fill={localQueueArray[0].color}
                        />
                        {(localQueueArray.length > 1) &&
                            <Text
                                y={localQueueArray[localQueueArray.length - 1].posY - 35}
                                x={localQueueArray[localQueueArray.length - 1].posX}
                                text={"Tail"}
                                fontSize={20}
                                fontStyle="bold"
                                fill={localQueueArray[localQueueArray.length - 1].color}
                            />}
                        {localQueueArray.map((object: QueueType, index: number) => {
                            return (
                                <Rect
                                    x={object.posX}
                                    y={object.posY}
                                    scaleX={0}
                                    height={object.height}
                                    width={object.width}
                                    fill={object.color}
                                    strokeWidth={1}
                                    key={object.color}
                                    cornerRadius={50}
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