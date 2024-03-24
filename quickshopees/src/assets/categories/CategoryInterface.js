import React from "react";
import { useState } from "react";
import { useStyle } from "./CategoryCss";
import {Avatar,Button,TextField,Grid,MenuItem,Select,FormControl,InputLabel,IconButton,} from '@mui/material';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { postData } from "../services/FetchNodeService";
import Swal from "sweetalert2";
import ViewListIcon from '@mui/icons-material/ViewList';
import {  useNavigate } from 'react-router-dom';


export default function CategoryInterface()
{    const navigate=useNavigate('')
    const[status,setStatus]=useState('')
    const[categoryName,setCategoryName]=useState('')
    const[error,setError]=useState('')
    const[icon,setIcon]=useState({file:'',bytes:''})
     
    const handlePicture=(event)=>
    {
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const handleError=(input,value)=>
    {
        setError((prev)=>({...prev,[input]:value}))
    }
    const checking=()=>
    {
        var isValid=true
        if(!categoryName)
        {
            handleError('categoryName','pls fill input')
            isValid=false
        }
        if(!status)
        {
            handleError('status','pls fill status')
            isValid=false
        }
        if(!icon.bytes)
        {
            handleError('icon','pls select image')
            isValid=false
        }

        return isValid
    }
    const handleClick=async()=>
    {
        if(checking())
        {
            var formData=new FormData()
            formData.append('categoryname',categoryName)
            formData.append('status',status)
            formData.append('icon',icon.bytes)
            var result= await postData('category/categorysubmit',formData)
            console.log('form',formData)                                                                           
        }
        if(result.status)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your category has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
  
    const classes=useStyle()
    return(
    <div className={classes.main}>
    <div className={classes.box}>
        <Grid container spacing ={3}>
            <Grid item xs={12} style={{display:'flex',justifyContent:'space-between'}}>
                <div className={classes.heading}>
                Add category interface
                 </div>

            <div>
                <ViewListIcon onClick={()=>navigate('/dashboard/displayallcategory')}/>
            </div>

                
            </Grid>
            
            <Grid item xs={12}>
            <TextField onFocus={()=>handleError('categoryName',null)} error={error.categoryName?true:false} helperText={error.categoryName} onChange={(event)=>setCategoryName(event.target.value)}  variant="outlined" label='categoryname' fullWidth />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="Status"
    onChange={(event)=>setStatus(event.target.value)}
    onFocus={()=>handleError('status',null)}  error={error.status?true:false} 
    
  >
    <MenuItem value='select status'>-select Status-</MenuItem>
    <MenuItem value='Popular'>Popular</MenuItem>
    <MenuItem value='Continue'>Continue</MenuItem>
    <MenuItem value='tranding'>Tranding</MenuItem>
    <MenuItem value='Dicontinue'>Discontinue</MenuItem>
  </Select>
</FormControl>
<div>
    {error.status}
</div>
            </Grid>
            <Grid item xs={6}>
            <IconButton color="primary" aria-label="upload picture" component="label">
        <input onFocus={()=>handleError('icon',null)}  onChange={handlePicture} hidden accept="image/*" type="file" />
        <PhotoCamera />
           </IconButton>
           <div>
            {error.icon}
           </div>
         </Grid>
         <Grid item xs={6}>
         <Avatar
            alt="error"
           src={icon.file}
          style={{ width: 56, height: 56 }}
         />
         </Grid>
         <Grid item xs={6}>
            <Button onClick={handleClick} fullWidth variant="contained">Submit</Button>
         </Grid>
         <Grid item xs={6}>
            <Button fullWidth variant="contained">Reset</Button>
         </Grid>

        </Grid>
        </div>
    
    </div>)
   
}