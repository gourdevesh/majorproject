import { makeStyles } from "@mui/material";
export const useStyle=makeStyles({
    main:{
        width:'80vw',
        height:'100vh',
        background:'#ecf0f1',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
    },
    box:{
        width:'60%',
        height:'auto',
        background:'white',
        borderRadius:20,
        padding:20
    },
    heading:
    {
        fontSize:20,
        fontWeight:600,
        fontStyle:'Sans-serif'
    },
    formbox:{
        width:'100%',
        height:'auto',
      
    },
    helptxt:
    {
        fontSize:11,
        color:'red',
        fontStyle:'oblique'
    }
})