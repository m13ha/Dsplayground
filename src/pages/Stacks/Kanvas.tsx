import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { StacksArray, StackType } from "../../utils/interfaces";
import Konva from "konva";
import "./stacks.css"




const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { canvasWidth, canvasHeight, setCanvasHeight, setCanvasWidth, stacksArray, setStacksArray } = useContext(CanvasContext);
    const [stackArrayCount, setStackArrayCount] = useState<number>(0);
    const [localStacksArray, setLocalStacksArray] = useState<StacksArray>([])
    const [pushState, setPushState] = useState<Boolean>(false);
    const [popState, setPopState] = useState<Boolean>(false);
    const [headStack, setHeadStack] = useState<any>([])
    const [headTagPosX, setHeadTagPosX] = useState<number>(0)
    const [headTagPosY, setHeadTagPosY] = useState<number>(0)
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const [rectColor, setRectColor]  = useState("black")
    const rectRef = React.useRef<Konva.Rect>(null);
    const textRef = React.useRef<Konva.Text>(null);


    useEffect(() => {
        updateCanvasDimension()
    }, [])

    useEffect(() => {
        headTagHandler();
    }, [canvasWidth, canvasHeight])

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

    // canvas theme colorr
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
    useEffect(() => {
        let newStackArray = stacksArray;
        if (stacksArray.length > stackArrayCount) {
            setLocalStacksArray(newStackArray);
            animateView();
            setPushState(true);
        } else {
            setStackArrayCount(prevState => (prevState - 1));
            setPopState(true);
        }

    }, [stacksArray])


    // animate a rect being popped from the stack
    useEffect(() => {
        let newHeadStack = headStack
        let newArray = stacksArray;
        let rect = newHeadStack.pop();
        headTagHandler();
        animateView();
        if (stackArrayCount < localStacksArray.length) {
            rect?.to({
                x: canvasWidth + 200,
            })
            setTimeout(() => {
                setHeadStack(newHeadStack);
                setLocalStacksArray(newArray)
                setPopState(false);
            }, 500);
        }
    }, [popState])

    // animate a rect being pushed to the stack
    useEffect(() => {
        let rect = rectRef.current;
        let array = [...headStack];
        array.push(rectRef.current);
        setHeadStack(array)
        headTagHandler();
        if (localStacksArray.length > stackArrayCount) {
            rect?.to({
                x: (canvasWidth / 2) - 125,
            })
            setStackArrayCount(prevState => (prevState + 1));
            setPushState(false)
        }
    }, [pushState])


    useEffect(() => {
        headTagHandler();
    }, [textRef.current, headStack])


    // CAMERA POSITION ANIMATOR, MOVE CAMERA UP OR DOWN DENPENDING ON POSITION OF CURRENT HEAD.
    const animateView = () => {
        let newLocalStackArray = localStacksArray;
        let newStackArray = stacksArray;
        let newHeadStack = headStack;
        if (stacksArray.length > 1 && stacksArray[stacksArray.length - 1].posY < 45) {
            newHeadStack.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y + 220,
                })
            });
            newStackArray.forEach((rect: StackType) => {
                rect.posY = rect.posY + 220;
            });
            setHeadStack(newHeadStack);
            setStacksArray(newStackArray);

        } else if (localStacksArray.length > 1 && localStacksArray[localStacksArray.length - 1].posY > 409) {
            newHeadStack.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y - 220,
                })
            });
            newLocalStackArray.forEach((rect: StackType) => {
                rect.posY = rect.posY - 220;
            });
            setHeadStack(newHeadStack);
            setLocalStacksArray(newStackArray);
        }
        headTagHandler();
    }

    // ANIMATE POSITION OF HEAD TEXT 
    const headTagHandler = () => {
        if (localStacksArray.length > 0 && !isNaN(canvasWidth)) {
            let rect = localStacksArray[localStacksArray.length - 1]
            let text = textRef.current;
            text?.fill(rect.color)
            text?.to({
                y: (rect.posY - 25)
            })
        } else {
            setHeadTagPosX((canvasWidth / 2) - (35));
            setHeadTagPosY(450 / 2)
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
                        <Text
                            x={headTagPosX}
                            y={headTagPosY}
                            text={"Head"}
                            fontSize={20}
                            fontStyle="bold"
                            fill={rectColor}
                            ref={textRef}
                        />
                        {localStacksArray.map((object: StackType, index: number) => {
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
                    {(localStacksArray.length === 0) && (!isNaN(canvasWidth)) && <Layer>
                        <Text
                            x={headTagPosX}
                            y={headTagPosY}
                            text={"Empty Stack"}
                            fontSize={15}
                            fontStyle="bold"
                            fill={rectColor}
                            ref={textRef}
                        />
                    </Layer>}
                </Stage>
            </div>
        </Box>
    );
}

export default Kanvas;