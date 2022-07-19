//import React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


interface Props {
}

const Trees = (props: Props) => {
    return (
        <Box>
            <Typography variant="h4" color="primary" mb={2}>
                Trees
            </Typography>
            <Typography component="p" variant="body1" color="initial">
                A tree is a non-linear data structure that is used to store hierarchal data, e.g.a family tree, or a company employee structure. 
                Similar to Linked Lists, a Tree is made up of nodes that store a value and pointers to other related nodes.
                Trees make it fast to retrieve and organize data on a computer.
                <Link href="" underline="none"> Learn More</Link>
            </Typography>
        </Box>
    )
};

export default Trees;