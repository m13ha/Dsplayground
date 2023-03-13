import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { StackCanvasContext } from "../../context/CanvasContext";
import { Stage, Layer, Rect, Text } from 'react-konva';
import { StacksArray, StackType } from "../../utils/interfaces";
import Konva from "konva";
import pop from "../../assets/audio/pop.mp3";
import push from "../../assets/audio/push.mp3";
import useSound from "use-sound";


const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const { stackCanvasHeight, stackCanvasWidth, setStackCanvasHeight, setStackCanvasWidth, stacksArray, setStacksArray } = useContext(StackCanvasContext);
    const [stackArrayCount, setStackArrayCount] = useState<number>(0);
    const [localStacksArray, setLocalStacksArray] = useState<StacksArray>([])
    const [pushState, setPushState] = useState<Boolean>(false);
    const [popState, setPopState] = useState<Boolean>(false);
    const [headStackRef, setHeadStackRef] = useState<any>([])
    const [stackTextRef, setStackTextRef] = useState<any>([])
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const [rectColor, setRectColor] = useState("black")
    const rectRef = React.useRef<Konva.Rect>(null);
    const textRef = React.useRef<Konva.Text>(null);
    const [playPop] = useSound(pop);
    const [playPush] = useSound(push);



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
            animateView();
            setLocalStacksArray(newStackArray);
            setPushState(true);
        } else {
            setPopState(true);
        }
        //animateView();
    }, [stacksArray])


    // animate a rect being popped from the stack
    useEffect(() => {
        if (popState) popAnimation();
    }, [popState])

    // animate a rect being pushed to the stack
    useEffect(() => {
        if (pushState) pushAnimation();
    }, [pushState])

    const pushAnimation = () => {
        let rect = rectRef.current;
        let array = headStackRef;
        if (rect !== null) array.push(rectRef.current);
        setHeadStackRef(array)
        playPush()
        rect?.to({
            scaleY: 1,
            scaleX: 1,
        })
        setStackArrayCount(prevState => (prevState + 1));
        setPushState(false)
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
        playPop();
        rect?.to({
            scaleY: 0,
            scaleX: 0,
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
                    y: rect.attrs.y + 300,
                })
            });
            newStackArray.forEach((rect: StackType) => {
                rect.posY = rect.posY + 300;
            });
            setHeadStackRef(newHeadStackRef);
            setStacksArray(newStackArray);

        }
        if (localStacksArray.length > 1 && localStacksArray[localStacksArray.length - 1].posY > 495) {
            newHeadStackRef.forEach((rect: any) => {
                rect?.to({
                    y: rect.attrs.y - 300,
                })
            });
            newLocalStackArray.forEach((rect: StackType) => {
                rect.posY = rect.posY - 300;
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
                                <React.Fragment>
                                    <Rect
                                        x={object.posX}
                                        y={object.posY}
                                        height={object.height}
                                        width={object.width}
                                        fill={object.color}
                                        cornerRadius={50}
                                        key={object.color}
                                        scaleY={0}
                                        scaleX={0}
                                        ref={rectRef}

                                    />
                                    <Text
                                        x={object.posX + 82}
                                        y={object.posY + 20}
                                        text={object.value}
                                        fontSize={20}
                                        fontStyle="bold"
                                        fill={rectColor}
                                        ref={textRef}
                                    />
                                </React.Fragment>
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