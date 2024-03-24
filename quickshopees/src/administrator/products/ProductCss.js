import { makeStyles} from '@mui/styles'
const useStyles = makeStyles({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'#95a5a6',
        width:'100vw',
        height:'100vh'
    },
    box:{
        width:'50vw',
        height:'auto',
        padding:15,
        background:'#fff',
        borderRadius:10
    },
    headingStyle:{
        fontFamily:'Poppins',
        fontWeight:600,
        letterSpacing:1,
        fontSize:18
    },
    errorText:{
        fontSize:13,
        color:'red',
        paddingLeft:13,
        paddingTop:4
    },
    displayContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'linear-gradient(120deg, #2980b9, #8e44ad)',
        width:'100vw',
        height:'100vh'
    },
    displayBox:{
        width:'70vw',
        height:'auto',
        padding:15,
        background:'#fff'
    }
})

export{useStyles}