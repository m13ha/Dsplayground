import Box from "@mui/material/Box";
import { Stage, Layer } from 'react-konva';

const Kanvas = () => {

    return (
        <Box mt={5}
        sx={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            justifyItems: "center"
        }}
        className="canvas"
        >
            <Stage>
                <Layer></Layer>
            </Stage>
        </Box>
    );
}

export default Kanvas;