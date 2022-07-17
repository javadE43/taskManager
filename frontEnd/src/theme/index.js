import {createTheme} from '@mui/material';

export const colors={
    primary:'#4fcaa7',
    secondary:'#4fcaa7',
    white:'#fff'
}


const theme=createTheme({

    overrides: {
        MuiCssBaseline: {
          '@global': {
            '*': {
              scrollbarWidth: 'thin',
              scrollbarColor: '#B7B7B7 transparent',
              '&::-webkit-scrollbar': {
                width: 6,
                height: 6,
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 6,
                backgroundColor: '#B7B7B7',
                minHeight: 24,
                minWidth: 24,
              },
              '&::-webkit-scrollbar-thumb:focus': {
                backgroundColor: '#adadad',
              },
              '&::-webkit-scrollbar-thumb:active': {
                backgroundColor: '#adadad',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#adadad',
              },
              '&::-webkit-scrollbar-corner': {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },

    palette:{
        primary:{
            main:colors.primary,
            secondary:colors.secondary
        },

        secondary:{
            main:colors.secondary,
        },
        white:{
            main:colors.white
        }
    },

    components:{
        MuiButton:{
            defaultProps:{
                disableRipple:true,
                disableElevation:true
            }
        }
    }

})




export default theme;