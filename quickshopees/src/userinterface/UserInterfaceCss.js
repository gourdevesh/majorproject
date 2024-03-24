
import { makeStyles } from "@mui/styles";

export const useStyle=makeStyles({

    header:{
      
        background:'#fff'
    },
    headcontain:{
        width:'100%',
        display:"flex",
        alignItems:'center'
        
    },
    headfont:{
       
        color:'black',
        fontSize:24,
        // background:'red'
        
        
       
    },
    icon:{
        color:'blue',
        marginLeft:'auto',
        display:'flex',
        justifyContent:'space-between'
      

           
    },
    carticon:{
        paddingLeft:4
    },
    searchicon:{
        width:'60%',
        display:"flex", 
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:'15'
    }
    
 

})