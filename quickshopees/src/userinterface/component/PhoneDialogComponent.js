import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { TextField,Button,FormControl,OutlinedInput,InputAdornment } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import OtpDialogComponent from './OtpDialogComponent';

export default function PhoneDialogComponent(props)
{
    const[open,setOpen]=useState(props.status)
    const[status,setStatus]=useState(false) 
    const[mobileno,setMobileno]=useState('')
     const[disable,setDisable]=useState(false)
     const[otpGen,setOtpGen]=useState('')
     const[error,setError]=useState(false)
     const handleClose = () => {
    props.setStatus(false)
  }

 
  const checking=()=>
  {
    return mobileno.length==10
  }
  const GenerateOtp=()=>
  {
    var otp=parseInt(Math.random()*8999)+1000
    setOtpGen(otp)
    alert(otp)
  }

  const handleNext=()=>
  { 
    GenerateOtp()
    setStatus(true)
  }

  useEffect(() => {
    const valid = checking();
    setDisable(valid);
  }, [mobileno]);
  
  useEffect(function(){
      setOpen(props.status)
      
    },[props])

    
    
    const Content=()=>
    {
        return(
            <div style={{marginTop:40,marginBottom:30}}>
         <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontWeight:'600',fontFamily:'poppins'}}>
         
            <div>
             Enter your phone number to
          </div> 

          <div style={{display:'flex',justifyContent:'center'}}>
            Login/signUp
          </div>
            </div>
            
            <div style={{width:450,marginTop:20,marginLeft:50,display:'flex',flexDirection:'column'}}>
            <FormControl fullWidth >

            <OutlinedInput inputProps={{ maxLength: 10 }} value={mobileno}
            onChange={(e)=>
              {setMobileno(e.target.value)
           
            }}
            startAdornment={<InputAdornment    position="start" ><PhoneIphoneIcon/> +91</InputAdornment>}
            
          />  
         
            </FormControl>
            {/* <div>
                {error.mobileno}
            </div> */}
         
         <div style={{marginTop:20}}>
            <Button fullWidth variant='contained' disabled={!disable} onClick={handleNext} >Next</Button>
         </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:10}}>
            <div>
                By continuing, you agree to our
            </div>
            <div style={{display:'flex',flexDirection:"row",justifyContent:'space-between',width:210,fontSize:12,fontFamily:'poppins'}}>
                <div>
                    <a href='xx' >Terms and Services</a>
                </div>
                <div>
                <a href='xx' >Privacy policy</a>
                </div>
            </div>
        </div>
            
        </div>
      )
    }
    
    
    return(<div>
        <Dialog fullWidth style={{borderRadius:20}}
        open={open}
        onClose={handleClose}
        >
                   
            <DialogTitle style={{fontFamily:'poppins',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div onClick={handleClose} style={{fontFamily:'poppins',fontSize:16,fontWeight:'bold',marginRight:100}}>back</div>   
            <div style={{display:'flex',fontFamily:'poppins',marginRight:100}}>  
                Phone Number Verification
                </div>
            </DialogTitle>
                
            <DialogContent>
                {Content()}
            </DialogContent>
            
           
      </Dialog>

      <OtpDialogComponent otp={otpGen} mobile={mobileno} status={status} setStatus={props.setStatus} setBtnTitle={props.setBtnTitle} setStatuss={setStatus} userAddress={props.userAdddress} setUserAdddress={props.setUserAdddress} />
      </div>)
    

   
}