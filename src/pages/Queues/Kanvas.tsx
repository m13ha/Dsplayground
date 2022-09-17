import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { QueueCanvasContext } from "../../context/CanvasContext";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { QueueArray, QueueType } from "../../utils/interfaces";
import Konva from "konva";
import "./queues.css"




 const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { queueCanvasHeight, queueCanvasWidth, setQueueCanvasHeight, setQueueCanvasWidth, queueArray, setQueueArray } = useContext(QueueCanvasContext);
    const [queueArrayCount, setQueueArrayCount] = useState<number>(0);
    const [localQueueArray, setLocalQueueArray] = useState<QueueArray>([])
    const [enqueueState, setEnqueueState] = useState<Boolean>(false);
    const [dequeue, setDequeueState] = useState<Boolean>(false);
    const [headQueue, setHeadQueue] = useState<any>([])
    const [headTagPosX, setHeadTagPosX] = useState<number>(0)
    const [headTagPosY, setHeadTagPosY] = useState<number>(0)
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const [rectColor, setRectColor] = useState("black")
    const rectRef = React.useRef<Konva.Rect>(null);
    const textRef = React.useRef<Konva.Text>(null);


    useEffect(() => {
        updateCanvasDimension()
    }, [])

    useEffect(() => {
       // headTagHandler();
    }, [queueCanvasWidth, queueCanvasHeight])

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


     // check for changes in the stack
    //  useEffect(() => {
    //      let newQueueArray = [...queueArray];
    //      if (queueArray.length > queueArrayCount) {
    //          setLocalQueueArray(newQueueArray);
    //          setEnqueueState(true);
    //      } else {
    //          setStackArrayCount(prevState => (prevState - 1));
    //          setPopState(true);
    //      }

    //  }, [queueArray])






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
                                    key={index}
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
                            ref={textRef}
                        />
                    </Layer>}
                </Stage>
            </div>
        </Box>
    )
}



export default Kanvas;