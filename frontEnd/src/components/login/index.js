import { styled } from '@mui/system';
import { Stack,Box, Button, Container, Grid, Toolbar, useMediaQuery } from '@mui/material'


export const StyleBox = styled(Box)((theme)=>({
    // backgroundColor: '#fff',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
}))

export const StyleStack = styled(Stack)((theme)=>({
    backgroundColor: '#fff',
}))