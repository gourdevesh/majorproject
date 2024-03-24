import { Paper,Button } from "@mui/material"
import { serverURL } from "../../../assets/services/FetchNodeService"


export default function CartPartner()
{
    var content=[
        {id:1,name:'Delivery Partner Tip',description:'delivery partner tip are',rupees:20}
        
    ]
    return(<div>
        <Paper elevation={2} style={{borderRadius:15,height:100,marginTop:'3%'}} >
          <div style={{display:'flex',flexDirection:'column',marginLeft:20}}>
            <div style={{fontFamily:'poppins',fontWeight:'bold' ,fontSize:14,marginTop:10}}>
             Delivery Partner Tip
            </div>
            <div style={{fontFamily:'poppins',fontWeight:300,color:'darkslategray',fontSize:13}}>
                The entire amount will be sent to your delivery partner
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
                <Button variant="outlined" style={{borderRadius:13,margin:7,height:30,color:'black',borderColor:'Grey',width:85}} >&#8377;20</Button>
                <Button variant="outlined"  style={{borderRadius:13,margin:7,height:30,color:'black',borderColor:'Grey',width:85}} >&#8377;30</Button>
                <Button variant="outlined"  style={{borderRadius:13,margin:7,height:30,color:'black',borderColor:'Grey',width:85}}  >&#8377;50</Button>
                <Button variant="outlined"  style={{borderRadius:13,margin:7,height:30,color:'black',borderColor:'Grey',width:85}} >&#8377;70</Button>

          </div>
          </div>
        </Paper>


          
       

    </div>)
}