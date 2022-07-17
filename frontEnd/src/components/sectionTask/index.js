import { styled } from '@mui/system';
import { Stack,Box, Button, Container, Grid, Toolbar, useMediaQuery, Paper } from '@mui/material'


export const StylePaper = styled(Paper)((theme)=>({
    margin:'0.7rem',
    boxShadow:'none',
    cursor:'pointer',
    transition: `box-shadow 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    padding:`0.6rem 0.8rem`,
    '&:hover':{
        boxShadow:` 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)`,
        background:'#b5f5e3'
    }
}))

export const StyleStack = styled(Stack)((theme)=>({
    backgroundColor: '#fff',
    borderRight:'1px solid #333',
    justifyContent:'space-between',
    height:"100%",
    padding:'1rem 0',
}));

export const StyleStackTask = styled(Stack)((theme)=>({
    backgroundColor: '#e1e1e1',
    height:"100%",
    padding:'1rem',
}))















// export const SearchB = styled('div')(({ theme }) => ({
//     position: 'relative',
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       position: 'relative',
//       borderRadius: theme.shape.borderRadius,
//       backgroundColor: alpha(theme.palette.common.white, 0.15),
//       border:`1px solid #c4c4c4`,
//       borderRadius:"25px",
//       // overflow:'hidden',
//       '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//       },
//       marginRight: theme.spacing(2),
//       marginLeft: 0,
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(3),
//         width: '100%',
//       },
//     },
  
//     }));