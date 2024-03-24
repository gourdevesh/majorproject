import { makeStyles } from "@mui/styles";
 export const useStyle=makeStyles({
    main:{
        width:'80vw',
        height:'96vh',
        background:'#ecf0f1',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'2.9%'

        
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