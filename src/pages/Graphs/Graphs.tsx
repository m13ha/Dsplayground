//import React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';


interface Props {
}

const Graphs = (props: Props) => {
    return (
        <Box>
            <Typography variant="h4" color="primary" mb={2}>
                Graphs
            </Typography>
            <Typography component="p" variant="body1" color="initial">
                A graph is a non-linear data structure made of nodes (vertices) and edges that connect these nodes to simulate a network. 
                Graphs are used to show the relationship between sets of data.
                <Link href="" underline="none"> Learn More</Link>
            </Typography>
        </Box>
    );
};

export default Graphs;