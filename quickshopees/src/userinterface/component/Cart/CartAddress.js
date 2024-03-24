import { Paper,Button } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneDialogComponent from "../PhoneDialogComponent";
import MakePayment from "../../screen/MakePayment";
export default function CartAddress(props)
{
    const[status,setStatus]=useState(false)
var navigate =useNavigate()
    const handleOpen=()=>
    {  
        if(props.btnTitle=="go")
        //  alert('hjhj')
        setStatus(true)
        else 
navigate('/makepayment')
    props.PageRefresh()
    }
   
    const showAddress=()=>{
        return props.userAdddress.map((item)=>{
            return (<div style={{display:'flex', flexDirection:'column'}}>
<div> UserName   {item.username}</div>
<div> addressone  {item.addressone}</div>
<div> addresstwo   {item.addresstwo}</div>
<div> city   {item.city}</div>
            </div>)
        })
    }
   
    


    return(<div style={{marginTop:20}}>
        <Paper elevation={2} style={{borderRadius:15,height:'auto'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
                   <div style={{display:'flex'}}>
                        <LocationOnIcon style={{color:'#eb4d4b'}} />
                   </div>
                   <div style={{fontFamily:'poppins',fontWeight:'bold',display:'flex',fontSize:14}}>
                    Enter your delivery address
                   </div>
                </div>
                <div style={{width:'70%',marginBottom:35,margin:10}}>
                    
                    {showAddress()}
                
                    <Button fullWidth variant="contained" onClick={handleOpen} style={{backgroundColor:'#eb4d4b',color:'#fff',fontFamily:'poppins',borderRadius:14}}>{props.btnTitle}</Button>
                </div>
            </div>
        </Paper>


      <PhoneDialogComponent status={status} setStatus={setStatus}  setBtnTitle={props.setBtnTitle}  userAddress={props.userAddress} setUserAdddress={props.setUserAdddress}/>
    </div>)
}