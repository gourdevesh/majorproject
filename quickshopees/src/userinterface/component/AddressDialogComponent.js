import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { TextField,Button,FormControl,InputLabel,Select,Grid,Box,MenuItem } from '@mui/material';
import {postData, serverURL} from "../../assets/services/FetchNodeService"


export default function AdressDialogComponent(props)
{   
    const[title,setTitle]=useState('')
  
    const[name,setName]=useState('')
    const[addressOne,setAddressOne]=useState('')
    const[addressTwo,setAddressTwo]=useState('')
    const[city,setCity]=useState('')
    const[state,setState]=useState('')
    const[email,setEmail]=useState('')
    const[pincode,setPinCode]=useState('')
   const[count,setCount]=useState('')
    const[open,setOpen]=useState(props.status)
    const[disable,setDisable]=useState(false)


    
    const handleSave=async(e)=>
    {
      var body={email:email,mobileno:props.mobileno,addressone:addressOne,addresstwo:addressTwo,city:city,pincode:pincode,name:title+" "+name,deliveryarea:count}
      var result=await postData('userinterface/add_adress',body)
     if(result.status)
      setOpen(true)
      props.setStatuss(false)
     props.setStatus(false)
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
    <div style={{}}>

      <Grid container spacing={2}>

         <Grid item xs={12}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontFamily:'poppins',fontWeight:'bold',display:'flex',justifyContent:'center'}}>
             Enter Complete Address
            </div>
            <div onClick={handleClose}>back</div>
            <div>
            This allow us to find you easily and give you timely delivery experience
            </div>
          </div>
         </Grid>

         <Grid item xs={6}>
          
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">title</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={title}
          label="title"
          onChange={(e)=>setTitle(e.target.value)}
        >
          <MenuItem selected>Select Title</MenuItem>
          <MenuItem value={'Mr'}>Mr</MenuItem>
          <MenuItem value={'Mrs'}>Mrs</MenuItem>
          <MenuItem value={'Miss'}>Miss</MenuItem>
        </Select>
      </FormControl>
  
         </Grid >

         <Grid item xs={6}>
         <TextField fullWidth label='Receiver name' onChange={(e)=>setName(e.target.value)} />
         </Grid>

         <Grid item xs={12}>
          <TextField fullwidth label='Email' onChange={(e)=>setEmail(e.target.value)} />
         </Grid>

         <Grid item xs={12}>
         <TextField fullWidth label='Flat/House/Office No' onChange={(e)=>setAddressOne(e.target.value)} />
         </Grid>

         <Grid item xs={12}>
         <TextField fullWidth label='Flat/House/Office Name' onChange={(e)=>setAddressTwo(e.target.value)} />
         </Grid>

         <Grid item xs={4}>
          <TextField fullwidth label='City' onChange={(e)=>setCity(e.target.value)} />
         </Grid>

         <Grid item xs={4}>
          <TextField fullwidth label='state' onChange={(e)=>setState(e.target.value)} />
         </Grid>

         <Grid item xs={4}>
          <TextField fullwidth label='Pincode' onChange={(e)=>setPinCode(e.target.value)} />
         </Grid>

         <Grid item xs={12}>
          Save address as
         </Grid>

         <Grid item xs={12}>
          <FormControl >
          <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{marginLeft:10}} >
           <Button variant='outlined' value='Home' onClick={(e)=>setCount(e.target.value)} >Home</Button>
           </div>

           <div style={{marginLeft:10}}>
           <Button variant='outlined' value='Work' onClick={(e)=>setCount(e.target.value)}  >Work</Button>
           </div>

           <div style={{marginLeft:10}}>
           <Button variant='outlined' value='Office' onClick={(e)=>setCount(e.target.value)} >Office</Button>
           </div>
           </div>
           </FormControl>
           
         </Grid>

         <Grid item xs={10}style={{marginLeft:30}}>
          <Button variant='contained'fullWidth disabled={disable} onClick={()=>handleSave()} >Save Address</Button>
         </Grid>

        </Grid>
       

    </div>)

    }


    return(<div>
       

      <Dialog fullWidth style={{borderRadius:20}}
        open={open} >    
            
                
            <DialogContent>
                
                {Content()}
            </DialogContent>
           
      </Dialog>


    </div>)
}