import { makeStyles } from "@mui/styles"

export const  useStyles=makeStyles({

    position:{
        position:'relative'
    },

    imageStyle:{
        width:'90%',
        margin:10,
        cursor:'pointer',
        "&:hover":{
            transform:'Scale(1.1)',
            cursor:'pointer',
         },
    },

    leftarrow:{
        background:'#fff',
        width:30,
        height:30,
        borderRadius:17,
        display:'flex',
        justifyContent:'center',
        alignItems:'center', 
        position:'absolute',
        left:'-1%',
        top:'45%',
        zIndex:1,
        opacity:0.9,
        cursor:'pointer'
    },

    rightarrow:{
        background:'#fff',
        width:30,
        height:30,
        borderRadius:17,
        display:'flex',
        justifyContent:'center',
        alignItems:'center', 
        position:'absolute',
        right:'.5%',
        top:'45%',
        zIndex:1,
        opacity:0.9,
        cursor:'pointer'

    },

    arrowSize:{
        fontSize:30
    },
})