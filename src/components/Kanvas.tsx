import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { CanvasContext } from "../context/CanvasContext";
import { Stage, Layer, Rect } from 'react-konva';
import "../components/kanvas.css"
import { StacksArray, StackType } from "../utils/interfaces";
import Konva from "konva";
import { arrayBuffer } from "node:stream/consumers";



const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { canvasWidth, setCanvasHeight, setCanvasWidth, stacksArray } = useContext(CanvasContext);
    const [stackArrayCount, setStackArrayCount] = useState<number>(0);
    const [localStacksArray, setLocalStacksArray] = useState<StacksArray>([])
    const [pushState, setPushState] = useState<Boolean>(false);
    const [popState, setPopState] = useState<Boolean>(false);
    const [headStack, setHeadStack] = useState<any>([])

    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const rectRef = React.useRef<Konva.Rect>(null);

    useEffect(() => {
        if (rectRef.current !== null) {
            let array = [...headStack];
            array.push(rectRef.current);
            setHeadStack(array)
        }
    }, [rectRef.current, popState])

    useEffect(() => {
        console.log(headStack)
    }, [headStack, popState])

    useEffect(() => {
        if (theme.palette.mode === "dark") {
            setCanvasTheme("cv-white")
        } else {
            setCanvasTheme("cv-black")
        }
    }, [theme])

    useEffect(() => {
        if (stacksArray.length > stackArrayCount) {
            let newArray = stacksArray;
            setLocalStacksArray(newArray);
            setPushState(true);
        }
        //console.log(stacksArray)
    }, [stacksArray])

    useEffect(() => {
        if (stacksArray.length < stackArrayCount) {
            setStackArrayCount(prevState => (prevState - 1));
            setPopState(true);
        }
        //console.log(stacksArray)
    }, [stacksArray])


    useEffect(() => {
        let array = headStack;
        let newArray = stacksArray;
        let rect = array[stackArrayCount];
        //console.log(headStack);
        if (stackArrayCount < localStacksArray.length) {
            rect?.to({
                x: canvasWidth + 200,
            })
            setTimeout(() => {
                array = array.slice(0, stackArrayCount);
                setHeadStack(array);
                setLocalStacksArray(newArray);
                setPopState(false)
            }, 300);
        }
        //console.log(localStacksArray)
    }, [popState])

    useEffect(() => {
        let rect = rectRef.current;
        if (localStacksArray.length > stackArrayCount) {
            rect?.to({
                x: canvasWidth / 3,
            })
            setStackArrayCount(prevState => (prevState + 1));
            setPushState(false)
        }
        //console.log(localStacksArray)
    }, [pushState])

    useEffect(() => {
        updateCanvasDimension()
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateCanvasDimension)
    })

    const updateCanvasDimension = () => {
        if (canvasRef.current !== null) {
            const newWidth = canvasRef.current.clientWidth;
            setCanvasWidth(newWidth);
            const newHeight = canvasRef.current.clientHeight;
            setCanvasHeight(newHeight);
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
                    {(localStacksArray.length > 0) && <Layer>
                        {localStacksArray.map((object: StackType, index: number) => {
                            return (
                                <Rect
                                    x={-200}
                                    y={object.posY}
                                    height={object.height}
                                    width={object.width}
                                    stroke="black"
                                    strokeWidth={3}
                                    key={index}
                                    ref={rectRef}
                                />
                            )
                        })}
                    </Layer>}
                </Stage>
            </div>
        </Box>
    );
}

export default Kanvas;