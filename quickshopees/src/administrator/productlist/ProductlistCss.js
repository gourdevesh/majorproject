import { makeStyles } from "@mui/styles";
export const useStyle = makeStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: '#dfe6e9',
      width: "100vw",
      height: "100vh"
    },
    box: {
      width: "55vw",
      height: "auto",
      padding: 10,
      background: "#fff",
      borderRadius: 10
    },
    headingStyle:{
      fontFamily:"Poppins",
      fontWeight:800,
      letterSpacing:1,
      fontSize:18
    },
    errorText:{
      fontSize:12.5,
      color:"#d50000",
      paddingTop:4,
      paddingLeft:12,
      
    },
    displaycontainer:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      background:'#dfe6e9',
      width:'100vw',
      height:'100vh'
  
      },
    displaybox:{
      width:'60vw',
      height:'auto',
      padding:15,
      background:'#fff',
      borderRadius:10
      
    },
})
  