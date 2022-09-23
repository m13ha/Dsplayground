import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { StackCanvasContext } from "../../context/CanvasContext";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { StacksArray, StackType } from "../../utils/interfaces";
import Konva from "konva";
import "./stacks.css"


const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const {stackCanvasHeight, stackCanvasWidth, setStackCanvasHeight, setStackCanvasWidth, stacksArray, setStacksArray } = useContext(StackCanvasContext);
    const [stackArrayCount, setStackArrayCount] = useState<number>(0);
    const [localStacksArray, setLocalStacksArray] = useState<StacksArray>([])
    const [pushState, setPushState] = useState<Boolean>(false);
    const [popState, setPopState] = useState<Boolean>(false);
    const [headStackRef, setHeadStackRef] = useState<any>([])
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const [rectColor, setRectColor]  = useState("black")
    const rectRef = React.useRef<Konva.Rect>(null);

    

    useEffect(() => {
        updateCanvasDimension()
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateCanvasDimension)
    })

    const updateCanvasDimension = () => {
        if (canvasRef.current !== null) {
            const newWidth = canvasRef.current.clientWidth;
            setStackCanvasWidth(newWidth);
            const newHeight = canvasRef.current.clientHeight;
            setStackCanvasHeight(newHeight);
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
            setPushState(true);
        } else {
            setPopState(true);
            
        }
    }, [stacksArray])


    // animate a rect being popped from the stack
    useEffect(() => {
        if (popState) popAnimation();
    }, [popState])

    // animate a rect being pushed to the stack
    useEffect(() => {
        if(pushState) pushAnimation();
    }, [pushState])

    const pushAnimation = () => {
        let rect = rectRef.current;
        let array = headStackRef;
        if(rect !== null) array.push(rectRef.current);
        setHeadStackRef(array)
        rect?.to({
            x: (stackCanvasWidth / 2) - 125,
        })
        setStackArrayCount(prevState => (prevState + 1));
        setPushState(false)
        animateView();
    }

    const popAnimation = () => {
        let newHeadStackRef = headStackRef
        let newArray = stacksArray;
        let rect = newHeadStackRef.pop();
        setTimeout(() => {
            setStackArrayCount(prevState => (prevState - 1));
            setHeadStackRef(newHeadStackRef);
            setLocalStacksArray(newArray)
            setPopState(false);
        }, 500);
        rect?.to({
            x: stackCanvasWidth + 200,
            onFinish: () => {
                animateView();
            }
        })
    }


    // CAMERA POSITION ANIMATOR, MOVE CAMERA UP OR DOWN DENPENDING ON POSITION OF CURRENT HEAD.
    const animateView = () => {
        let newLocalStackArray = localStacksArray;
        let newStackArray = stacksArray;
        let newHeadStackRef = headStackRef;
        if (stacksArray.length > 1 && stacksArray[stacksArray.length - 1].posY < 45) {
            newHeadStackRef.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y + 220,
                })
            });
            newStackArray.forEach((rect: StackType) => {
                rect.posY = rect.posY + 220;
            });
            setHeadStackRef(newHeadStackRef);
            setStacksArray(newStackArray);

        } else if (localStacksArray.length > 1 && localStacksArray[localStacksArray.length - 1].posY > 409) {
            newHeadStackRef.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y - 220,
                })
            });
            newLocalStackArray.forEach((rect: StackType) => {
                rect.posY = rect.posY - 220;
            });
            setHeadStackRef(newHeadStackRef);
            setLocalStacksArray(newStackArray);
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
                            x={(stackCanvasWidth / 2) - (30)}
                            y={localStacksArray[localStacksArray.length - 1].posY - 25}
                            text={"Head"}
                            fontSize={20}
                            fontStyle="bold"
                            fill={localStacksArray[localStacksArray.length - 1].color}
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
                                    key={object.color}
                                    ref={rectRef}
                                />
                            )
                        })}
                    </Layer>}
                    {(localStacksArray.length === 0) && (!isNaN(stackCanvasWidth)) && <Layer>
                        <Text
                            x={(stackCanvasWidth / 2) - (53)}
                            y={(stackCanvasHeight / 2)}
                            text={"Empty Stack"}
                            fontSize={15}
                            fontStyle="bold"
                            fill={rectColor}
                        />
                    </Layer>}
                </Stage>
            </div>
        </Box>
    );
}

export default Kanvas;