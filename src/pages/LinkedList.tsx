//import React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';

interface Props {
}

const LinkedList = (props: Props) => {
    return (
        <Box>
            <Typography variant="h4" color="primary" mb={2}>
                Linked Lists
            </Typography>
            <Typography component="p" variant="body1" color="initial">
                A linked list is a linear data structure whose nodes/elements are stored randomly in memory,
                unlike an array whose elements are stored in a contiguous (side-by-side) manner in memory.
                Each node in a linked list has a pointer to the next node in the list;
                This makes it possible to find the nodes even though they are not contiguous in memory.
                This manner of randomly storing data in memory makes inserting and deleting data much faster than in other linear data structures like arrays.
                <Link href="" underline="none"> Learn More</Link>
            </Typography>

        </Box>
    );
};

export default LinkedList;