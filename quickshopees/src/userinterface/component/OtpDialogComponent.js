import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'; 
import { TextField,Button,FormControl,OutlinedInput,InputAdornment } from '@mui/material';
import  ArrowBackIosNewIcon  from "@mui/icons-material/ArrowBackIosNew";
import AdressDialogComponent from './AddressDialogComponent';
import { useDispatch } from 'react-redux';
import { postData } from '../../assets/services/FetchNodeService';

export default function OtpDialogComponent(props)
{  
  var dispatch=useDispatch()
    const[open,setOpen]=useState(props.status)
    const[otpInput,setOtpInput]=useState('')
   const[status,setStatus]=useState(false)
   const[disable,setDisable]=useState(false)


    const handleNext=async()=>
    {
      if(parseInt(props.otp)==parseInt(otpInput))
      {
        var mobile=await postData('userinterface/check_mobileno',{mobileno:props.mobile})
        if(mobile.status)
        {
          var adress=await postData('userinterface/check_address_by_mobileno',{mobileno:props.mobile})
        if(adress.status)
        {      
          props.setStatuss(false)   
          props.setStatus(false)
          props.setBtnTitle('proceed For payment')
          props.setUserAdddress(adress.data)
          dispatch({type:'Add_USER',payload:[adress.data[0]]})
        }
      

             
      else
      {  
        setStatus(true)}
      
      }

else
{
setStatus(true)
}
}
else
alert('Invalid Otp')  
}



    const checking=()=>
    {
      return otpInput.length==4
    }

    useEffect(() => {
      const valid = checking();
      setDisable(valid);
    }, [otpInput]);

    

    const CheckOtp=(event,value)=>
    { 
      var inputotp=""
      
      if(document.getElementById('first').value.length==1)
      { 
        document.getElementById('second').focus()
        inputotp+=document.getElementById('first').value
      }
     
      if(document.getElementById('second').value.length==1)
      {
        document.getElementById('third').focus()
        inputotp+=document.getElementById('second').value
      }
     
        if(document.getElementById('third').value.length==1)
      {
        document.getElementById('forth').focus()
        inputotp+=document.getElementById('third').value
      }
      if(document.getElementById('forth').value.length==1)
      {
        inputotp+=document.getElementById('forth').value
        setOtpInput(inputotp)
      }
    

      
      
      
     
    }
    
    



    const handleClose=()=>
    {
     props.setStatus(false)

    }

   
   
    useEffect(function(){
        setOpen(props.status)
        
      },[props])
      
    const Content=()=>
    {
        return(
            <div style={{marginTop:40,marginBottom:30}}>
         <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontWeight:'600',fontFamily:'poppins',fontSize:18}}>
            <div>
             Enter 4  digit code sent to your phone
          </div> 

          <div style={{display:'flex',justifyContent:'center'}}>
            +91-xxxxxx{props.mobile.substring(6)}
          </div>
            </div>
            
            <div style={{width:400,marginTop:20,marginLeft:50,display:'flex',flexDirection:'column'}}>
           <div style={{display:'flex',flexDirection:'row',justifyContent:'center',marginLeft:10}}>
              <TextField id='first' style={{width:'15%',marginLeft:10}} onChange={(event=>CheckOtp(event))}  />
              <TextField id='second' style={{width:'15%',marginLeft:10}} onChange={(i,event)=>CheckOtp(event,i)} />
              <TextField id='third' style={{width:'15%',marginLeft:10}} onChange={(event)=>CheckOtp(event)} />
              <TextField id='forth' inputProps={{ maxLength: 1 }} style={{width:'15%',marginLeft:10}}   onChange={(event)=>CheckOtp(event)} />
            </div>
         
         <div style={{display:'flex',justifyContent:'center',marginTop:20,marginLeft:10}}>
          <Button variant='contained' fullWidth onClick={handleNext} 
          disabled={!disable}
          >Next</Button>
         </div>

         <div style={{display:'flex',justifyContent:'center',marginTop:10,fontFamily:'poppins'}}>
          Resend Code</div>
           
        </div>

      
        </div>
      )
    }
    

    return(<div>
         <Dialog fullWidth style={{borderRadius:20}}
        open={open}
        onClose={handleClose}
        >
                
            <DialogTitle >
                <div style={{marginLeft:2,fontSize:16,fontFamily:'poppins',}}>
                 <ArrowBackIosNewIcon style={{fontSize:12}}/><div  onClick={handleClose}>Back</div> 
                </div>
                <div style={{fontFamily:'poppins',display:'flex',justifyContent:'center',}}>
                Phone Number Verification
                </div>
            </DialogTitle>
                
            <DialogContent>
                {Content()}
            </DialogContent>
           
      </Dialog>

   <AdressDialogComponent mobileno={props.mobile} status={status} setStatus={props.setStatus} setStatuss={setStatus}  />
    </div>)
}