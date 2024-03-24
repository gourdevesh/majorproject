import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'#6688D1',
      //  width:'100vw',
        height:'88vh'
    },
    box:{
        width:'50vw',
        height:'auto',
        padding:10,
        background:'#f5f6fa',
        borderRadius:10
       
    },
    headingStyle:{
        fontFamily:'poppins',
        fontWeight:600,
        letterSpacing:1,
        fontSize:23,
        padding:10
    },
    errorText:{
        fontSize:13,
        color:'red',
        paddingLeft:12,
        padding:4
    },
    displaycontainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'#dfe6e9',
       // width:'100vw',
        height:'100vh'
    },
    displaybox:{
        width:'60vw',
        height:'auto',
        padding:10,
        background:'#f5f6fa',
        borderRadius:10
       
    }


})