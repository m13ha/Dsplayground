import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { StacksArray, StackType } from "../../utils/interfaces";
import Konva from "konva";




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
    const [headTagText, setHeadTagText] = useState<string>()
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const rectRef = React.useRef<Konva.Rect>(null);
    const textRef = React.useRef<Konva.Text>(null)

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
        let newStackArray = stacksArray;
        if (stacksArray.length > stackArrayCount) {
                setLocalStacksArray(newStackArray);
                setPushState(true);
        }
    }, [stacksArray])

    useEffect(() => {
        if (stacksArray.length < stackArrayCount) {
                setStackArrayCount(prevState => (prevState - 1));
                setPopState(true);
        }
    }, [stacksArray])


    useEffect(() => {
        let array = headStack;
        let newArray = stacksArray;
        let rect = array[stackArrayCount];
        animateView();
        headTagHandler();
        if (stackArrayCount < localStacksArray.length) {
            rect?.to({
                x: canvasWidth + 200,
            })
            setTimeout(() => {
                array = array.slice(0, stackArrayCount);
                setHeadStack(array);
                setLocalStacksArray(newArray);
                setPopState(false)
            }, 500);
        }
    }, [popState])

    useEffect(() => {
        let rect = rectRef.current;
        animateView();
        headTagHandler();
        if (localStacksArray.length > stackArrayCount) {
            rect?.to({
                x: canvasWidth / 3,
            })
            setStackArrayCount(prevState => (prevState + 1));
            setPushState(false)
        }
    }, [pushState])


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

    const animateView = () => {
        let newLocalStackArray = localStacksArray;
        let newStackArray = stacksArray;
        let newHeadStack = headStack;
        if (stacksArray.length > 1 && stacksArray[stacksArray.length - 1].posY < 0) {
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

        }else if (localStacksArray.length > 1 && localStacksArray[localStacksArray.length - 1].posY > 409) {
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
    }
    
    const headTagHandler = () => {
        console.log(textRef)
        if (localStacksArray.length > 0 && !isNaN(canvasWidth)){
            let rect = localStacksArray[localStacksArray.length - 1]
            let text = textRef.current;
            text?.to({
                x: (rect.posX + rect.width + 5),
                y: (rect.posY + (rect.height / 3))
            })
        } else {
            setHeadTagText("Stack is empty");
            setHeadTagPosX((canvasWidth / 2) - (140 / 2));
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
                            text={"Head/Top"}
                            fontSize={15}
                            fontStyle="bold"
                            ref={textRef}
                            />
                        {localStacksArray.map((object: StackType, index: number) => {
                            return (
                                <Rect
                                    x={-200}
                                    y={object.posY}
                                    height={object.height}
                                    width={object.width}
                                    stroke="black"
                                    strokeWidth={2}
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
                            text={headTagText}
                            fontSize={20}
                            fontStyle="bold"
                            ref={textRef}
                        />
                    </Layer>}
                </Stage>
            </div>
        </Box>
    );
}

export default Kanvas;