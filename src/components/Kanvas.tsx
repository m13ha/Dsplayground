import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import React, { useEffect, useState, useContext, useRef } from "react";
import { CanvasContext } from "../context/CanvasContext";
import { Stage, Layer, Rect} from 'react-konva';
import "../components/kanvas.css"
import { StacksArray } from "../utils/interfaces";
import Konva from "konva";



const Kanvas = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLDivElement>(null);
    const {  canvasWidth, setCanvasHeight, setCanvasWidth, stacksArray } = useContext(CanvasContext);
    const [stackArrayData, setStackArrayData] = useState<StacksArray>([]);
    const [canvasTheme, setCanvasTheme] = useState("cv-white");
    const rectRef = React.useRef<Konva.Rect>(null);
    useEffect(() => {
        if (theme.palette.mode === "dark") {
            setCanvasTheme("cv-white")
        } else {
            setCanvasTheme("cv-black")
        }
    }, [theme])

    useEffect(() => {
        let rect = rectRef.current;

        rect?.to({
            x: canvasWidth / 3,
        })


    }, [stacksArray])

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
                    {(stacksArray.length > 0) && <Layer>
                        {stacksArray.map((object: StackType, index: number) => {
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