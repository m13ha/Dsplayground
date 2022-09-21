import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import  QueueCanvasContext  from "../../context/QueueContext";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { QueueArray, QueueType } from "../../utils/interfaces";
import Konva from "konva";
import "./queue.css"




const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { queueCanvasHeight, queueCanvasWidth, setQueueCanvasHeight, setQueueCanvasWidth, queueArray } = useContext(QueueCanvasContext);
    const [queueArrayCount, setQueueArrayCount] = useState<number>(0);
    const [localQueueArray, setLocalQueueArray] = useState<QueueArray>([])
    const [enqueueState, setEnqueueState] = useState<Boolean>(false);
    const [dequeueState, setDequeueState] = useState<Boolean>(false);
    const [headQueue, setHeadQueue] = useState<Array<Konva.Rect>>([])
    const [headTagPosX, setHeadTagPosX] = useState<number>(0)
    const [headTagPosY, setHeadTagPosY] = useState<number>(0)
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const [rectColor, setRectColor] = useState("black")
    const rectRef = React.useRef<Konva.Rect>(null);
    const textRef = React.useRef<Konva.Text>(null);


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
        if (queueArray.length > queueArrayCount) {
            setLocalQueueArray(newQueueArray)
            setEnqueueState(true)
        } else if (queueArrayCount > queueArray.length) {
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
        setHeadQueue(array);
        rectRef.current?.to({
            x: rect.posX
        })
        setQueueArrayCount(prevState => (prevState + 1));
    }

    const animateOldBlock = () => {
        let newHead = [...headQueue]
        let rectRef = newHead.shift();
        let array = [...queueArray]
        rectRef?.to({
            x: (queueCanvasWidth + 200)
        })
        setTimeout(() => {
            setQueueArrayCount(prevState => (prevState - 1));
            setLocalQueueArray(array)
            setHeadQueue(newHead)
        }, 500)
    }


    let headTagHandler = (rect?: QueueType) => {
        if (localQueueArray.length > 0 && !isNaN(queueCanvasWidth)) {
            let rec = rect ? rect : localQueueArray[0]
            textRef.current?.fill(rec.color)
            textRef.current?.to({
                y: (rec.posY - 25)
            })
            console.log(rec)
        } else {
            setHeadTagPosX((queueCanvasWidth / 2) - (30));
            setHeadTagPosY(450 / 2)
        }
    }

    useEffect(() => {
        headTagHandler();
    }, [headQueue, localQueueArray, queueArray])




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
                            x={headTagPosX}
                            y={headTagPosY}
                            text={"Head"}
                            fontSize={20}
                            fontStyle="bold"
                            fill={rectColor}
                            ref={textRef}
                        />
                        {localQueueArray.map((object: QueueType, index: number) => {
                            return (
                                <Rect
                                    x={-200}
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
                            y={headTagPosY}
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