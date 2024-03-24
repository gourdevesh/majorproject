import { useState ,React} from "react";
import { Paper,button,Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';             
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Tune } from "@mui/icons-material";
export default function DeliveryPartner(){
const [open,setOpen]= useState(false)

        const handleClose = () => {
            setOpen(false)
          }
const handleOpen=()=>{
    setOpen(true)
}
const delivery=()=>{
return(
    <div style={{display:'flex',flexDirection:'column',height:400,width:400}}>
      <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',justifyContent:'center'}}> 
      <img src={`${serverURL}/images/d1.png`}width='32%'/>
      </div>
      <div style={{display:'flex',justifyContent:'center',fontWeight:'bold',marginTop:10,fontSize:21}}>
      Here's How We Do It
      </div>
      <div style={{display:'flex',justifyContent:'center',fontSize:12,marginTop:18}}>
      At Zepto, Rider's safety is our responsibility      </div>
      <div>
      </div>
      </div > 
      <div style={{display:'flex',fontSize:13,marginTop:20,backgroundColor:'#D5D6EA',borderRadius:10,padding:10}}>
      <div style={{display:'flex',width:30}}><OfflineBoltIcon/></div>
      Delivery partners ride safely at an average speed of 15kmph per delivery   
      </div>
      <div style={{display:'flex',fontSize:13,marginTop:10,backgroundColor:'#D5D6EA',borderRadius:10,padding:10}}>
    <div style={{display:'flex',width:30}}><DirectionsBikeIcon/>  </div>
    No penalties for late deliveries & no incentives for on-time deliveries
     </div>
      <div style={{display:'flex',fontSize:13,marginTop:10,backgroundColor:'#D5D6EA',borderRadius:10,padding:10}}>
      <div style={{display:'flex',width:30}}><CampaignIcon/></div>
      Delivery partners are not informed about promised delivery time      </div>
    <div style={{display:'flex',justifyContent:'center'}}><button onClick={handleClose} style={{display:'flex',justifyContent:'center',marginTop:20, backgroundColor:'red',width:400,height:40,paddingTop:10,color:'white', borderRadius:11}} > Close </button></div>
    </div>

)
}

    const DisplaySubCategoryDialog = () => {
        return (
          <Dialog
            open={open}
             onclose={handleClose}
          >
            <DialogTitle>
                        </DialogTitle>
            <DialogContent>
{delivery()}
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleClose}>Close</Button> */}
            </DialogActions>
          </Dialog>
        )
      }
   
    return(
<div style={{display:'flex',flexDirection:'column',width:'40%',marginLeft:40,marginTop:25}}>             
<Paper style={{borderRadius:15,height:75}}> 
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center' ,marginTop:15,justifyContent:'space-evenly' }} >
        <div style={{display:'flex',width:60,height:40,justifyContent:'center'}}>
        <img src={`${serverURL}/images/d1.png`}width='100%'/>
        </div>
    <div style={{display:'flex',flexDirection:'column',fontSize:13,fontWeight:'bold'}} >  
       See how we ensure our delivery partner’s safety  <a onClick={handleOpen} style={{color:'red'}}>Learn more</a>
 </div> 
  </div>
    </Paper>
    {DisplaySubCategoryDialog()}
    </div>
    )

}