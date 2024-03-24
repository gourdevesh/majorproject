import { makeStyles } from "@mui/styles";
const useStyles=makeStyles({
    container:{
        height:'100vh',
        weight:'100vw',
        background:'linear-gradient(120deg, #2980b9, #8e44ad)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
box:{
    height:'auto',
    width:'60vw',
    background:'#fff',
    padding:15,
    borderRadius:10
},
headingStyle:{
    fontFamily:'Poppins',
    fontWeight:'bold',
    letterSpacing:1,
    fontSize:18
},
errorText:{
    fontSize:13,
    color:'red',
    paddingLeft:13,
    paddingTop:4
}
})
export{useStyles}