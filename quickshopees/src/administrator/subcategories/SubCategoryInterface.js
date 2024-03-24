import {useState,useEffect} from "react";
import {Avatar, Grid, TextField, MenuItem, Select, FormControl, InputLabel, IconButton, Button} from "@mui/material";
import  PhotoCamera  from "@mui/icons-material/PhotoCamera";
import { useStyles } from "./SubcategoryCss";
import { postData,getData} from "../services/FetchNodeServices";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

import ViewListIcon from '@mui/icons-material/ViewList'; 
export default function SubCategoryInterface()
{   const navigate=useNavigate()
    const classes=useStyles()
     const [status,setStatus]=useState('')
     const [categoryid,setCategoryId]=useState('')
     const [icon, setIcon]=useState({file:'/assets/shopping-cart1.png',bytes:''})
     const [subcategoryName, setsubcategoryName]=useState('')
     const [error,setError]=useState({})
     const [categoryList,setCategoryList]=useState([])
     useEffect(function(){
        
       fetchAllCategory()
     },[])

     const fetchAllCategory=async()=>{
     var result=await getData('category/category_list') 
      setCategoryList(result.data)
     }

     const fillCategory=()=>{
      return categoryList.map((item)=>{
        
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      })

     }

     const handlePicture=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError('icon',null)
      }

  const handleError=(input,value)=>{
        setError((prev)=>({...prev,[input]:value}))

  }

  const validation=()=>{
        var isValid=true
        if(!categoryid)
        {  handleError('categoryid','Please enter categoryid..')
          isValid=false
        }
        if(!subcategoryName)
        {  handleError('subcategoryName','Please enter subcategory name..')
          isValid=false
        }
        if(!status)
        {  handleError('status','Please enter status..')
          isValid=false
        }
        if(!icon.bytes)
        {  handleError('icon','Please select icon...')
          isValid=false
        }
       return isValid
  }

   
  const handleClick=async()=>{
     if(validation())
     {
        var formData = new FormData()
        formData.append('categoryid',categoryid)
        formData.append('subcategoryname',subcategoryName)
        formData.append('status',status)
        formData.append('icon',icon.bytes)
        var result=await postData('subcategory/subcategorysubmit',formData)
       if(result.status)
       {
         Swal.fire({
           
           icon: 'success',
           title: result.message,
           showConfirmButton: false,
           timer: 2000
         })
       }
       else{
         Swal.fire({
           
           icon: 'error',
           title: result.message,
           showConfirmButton: false,
           timer: 2000
         })
       }
     }
    
  }


     return(
        <div className={classes.container}>
            <div className={classes.box}>
             <Grid container spacing={3} >
                <Grid item xs={12} style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                    <div className={classes.headingStyle}>
                      Add New SubCategory
                    </div>
                    <div>
      <ViewListIcon  onClick={()=>navigate("/dashboard/displayallsubcategory")}/>
     </div>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-lable">Categories</InputLabel>
                <Select
                  lableId="demo-simple-select-lable"
                  id="demo-simple-select"
                  value={categoryid}
                  label="Categories"
                  onChange={(event)=>{setCategoryId(event.target.value)}}
                  onFocus={()=>handleError('categoryid',null)}
                  error={error.categoryid?true:false} helperText={error.categoryid}
                  >
                    <MenuItem>Select Category</MenuItem>
                    {fillCategory()}
                 </Select>
                 </FormControl>   
                </Grid>
                <Grid item xs={12}>
                    <TextField error={error.subcategoryName?true:false} helperText={error.subcategoryName} onFocus={()=>handleError('subcategoryName',null)} onChange={(event)=>{setsubcategoryName(event.target.value)}} label="Subcategory Name" variant='outlined' fullWidth/>
                </Grid>
                <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-lable">Status</InputLabel>
                <Select
                  lableId="demo-simple-select-lable"
                  id="demo-simple-select"
                  value={status}
                  label="status"
                  onChange={(event)=>{setStatus(event.target.value)}}
                  onFocus={()=>handleError('status',null)}
                  error={error.status?true:false} helperText={error.status}
                  >
                    <MenuItem value="-select status-">-select status-</MenuItem>
                    <MenuItem value="Continue">Continue</MenuItem>
                    <MenuItem value="Discount">Discount</MenuItem>
                    <MenuItem value="Popular">Popular</MenuItem>
                    <MenuItem value="Trending">Trending</MenuItem>
                  </Select>
            </FormControl>
            <div className={classes.errorText}>{error.status}</div>
            </Grid>
            <Grid item xs={6}>
            <IconButton  color="primary" aria-label="upload picture" component="label">
           <input onChange={handlePicture} hidden accept="image/*" type="file" />
             <PhotoCamera />
             </IconButton>
             <div className={classes.errorText}>{error.icon}</div>
            </Grid>
            <Grid item xs={6}>
            <Avatar
             alt="Icon"
             src={icon.file}
             style={{ width: 58, height: 58 }}
             variant="rounded"
                />
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleClick} variant="contained" fullWidth>Submit</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" fullWidth>Reset</Button>
            </Grid>
             </Grid>
            </div>
      </div>
     )
}