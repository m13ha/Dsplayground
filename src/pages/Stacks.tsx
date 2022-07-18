//import React from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import StacksCompiler from "../components/StacksCompiler"


interface Props {
}

const Stacks = (props: Props) => {

  return (
    <Box>
      <Typography variant="h4" color="primary" mb={2}>
        Stacks
      </Typography>
      <Typography component="p" variant="body1" color="initial">
        Stack data structures are similar to stacks in real life.
        The most common analogy used to describe what a stack data structure looks like is a stack of plates.
        In this analogy the plates represent data and the data can be anything; functions, strings, images etc.
        In order to take a plate from the stack we have to take it from the top, and when adding plates to the stack we add it from the top.
        This process of adding and removing from the stack is called push (add to stack) and pop (remove from stack).
        Stacks operate on what is called a LIFO (Last In First Out) approach.
        The Top/Head of the stack is always the newest element.
        <Link href="" underline="none"> Learn More</Link>
      </Typography>
       <StacksCompiler></StacksCompiler>
    </Box>
  );
};

export default Stacks;
