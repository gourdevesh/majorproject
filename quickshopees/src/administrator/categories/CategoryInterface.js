import {useState} from 'react'
import { useStyles } from './CategoryCss';
import {Avatar, IconButton, Grid,TextField,Button,FormControl,InputLabel,Select,MenuItem } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {postData} from "../services/FetchNodeServices"
import Swal from 'sweetalert2'
import ViewListIcon from '@mui/icons-material/ViewList'; 
import { useNavigate } from 'react-router-dom';

export default function CategoryInterface()
{ 
  const navigate=useNavigate()
  const classes=useStyles()
  const [status,setStatus]=useState('')
  const [icon,setIcon]=useState({file:'/assets/shopping-cart.png',bytes:''})
  const [categoryName,setCategoryName]=useState('')
  const [error,setError]=useState({})
  
  const handlePicture=(event)=>{
    
   setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
   handleError('icon',null)
  }
  const handleError=(input,value)=>{
    setError((prev)=>({...prev,[input]:value}))
    
  }
 const validation=()=>{
    var isValid=true
    if(!categoryName)
    {  handleError('categoryName','Pls input category name...')
      isValid=false
    }
    if(!status)
    {  handleError('status','Pls input category status...')
      isValid=false
    }
    if(!icon.bytes)
    {
      handleError('icon','Pls select icon for category...')
      isValid=false
      
    }
    

    return isValid
  }
 const handleClick=async()=>{
   if(validation())
   { var formData=new FormData()
      formData.append('categoryname',categoryName)
      formData.append('status',status)
      formData.append('icon',icon.bytes)
      var result=await postData('category/categorysubmit',formData)
      if(result.status)
      {
        Swal.fire({
        
          icon: 'success',
          title: result.message,
          showConfirmButton: true,
          
        })
      }
    else
    {
      Swal.fire({
        
        icon: 'error',
        title: result.message,
        showConfirmButton: false,
        timer: 1500
      })

    }


   }
   
 }

  return(<div className={classes.container}>
   <div className={classes.box}>
   <Grid container spacing={2}>
    <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
     <div className={classes.headingStyle}>
      Add New Category
     </div>
     <div>
      <ViewListIcon  onClick={()=>navigate("/dashboard/displayallcategory")}/>
     </div>
      
    </Grid>
    <Grid item xs={12}>
        <TextField error={error.categoryName?true:false} helperText={error.categoryName} onFocus={()=>handleError('categoryName',null)} onChange={(event)=>{setCategoryName(event.target.value)}} label="Category Name" variant='outlined' fullWidth/>
    </Grid>
    <Grid item xs={12}>
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="Status"
    onChange={(event)=>{setStatus(event.target.value)}}
    onFocus={()=>handleError('status',null)}
    error={error.status?true:false} 
  >
    <MenuItem value="-Select Status-">-Select Status-</MenuItem>
    <MenuItem value='Continue'>Continue</MenuItem>
    <MenuItem value='Discontinue'>Discontinue</MenuItem>
    <MenuItem value='Popular'>Popular</MenuItem>
    <MenuItem value='Trending'>Trending</MenuItem>
  </Select>
</FormControl>
<div className={classes.errorText}>{error.status}</div>
    </Grid>
    <Grid item xs={6} >
    <IconButton color="primary" aria-label="upload picture" component="label">
    <input  onChange={handlePicture}  hidden accept="image/*" type="file" />
    <PhotoCamera />
    </IconButton>  
    <div className={classes.errorText}>{error.icon}</div>
 
    </Grid>
    <Grid item xs={6} >
    <Avatar
  alt="Icon"
  src={icon.file}
  style={{ width: 56, height: 56 }}
  variant="rounded"
/>
   </Grid>
   <Grid item xs={6}>
    <Button onClick={handleClick} variant='contained' fullWidth>Submit</Button>
   </Grid>
   <Grid item xs={6}>
    <Button variant='contained' fullWidth>Reset</Button>
   </Grid>
   
   </Grid>
   </div>
  </div>)

}