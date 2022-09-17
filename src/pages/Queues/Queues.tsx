//import React from 'react';

import Typography from '@mui/material/Typography'
import  Box  from "@mui/material/Box";
import Link from '@mui/material/Link';
//import QueueCompiler from './QueueCompiler';


const Queues = () => {
    return (
        <Box>
            <Typography variant="h4" color="primary" mb={2}>
                Queues
            </Typography>
            <Typography component="p" variant="body1" color="initial">
                Queue data structures have a similar structure to stacks but operate differently,
                 just like queues in real life use a FIFO (First In First Out) approach, so do queue data structures. 
                 Unlike stacks where the adding (pushing) and removing (popping) of elements occurs at the top/head of the stack,
                    queues add (enqueue) their elements to the end of the queue and remove (dequeue) from the top/head.
                <Link href="" underline="none"> Learn More</Link>
            </Typography>
            {/* <QueueCompiler></QueueCompiler> */}
        </Box>
    );
};

export default Queues;