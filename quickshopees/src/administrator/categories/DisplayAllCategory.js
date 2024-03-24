import {useState,useEffect} from 'react'
import MaterialTable from '@material-table/core'
import {Avatar, IconButton, Grid,TextField,Button,FormControl,InputLabel,Select,MenuItem } from '@mui/material'
import { getData,serverURL } from '../services/FetchNodeServices'
import { useStyles } from './CategoryCss' 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {postData} from "../services/FetchNodeServices"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function DisplayAllCategory(){
  const classes=useStyles()
  const navigate=useNavigate()
   const [categoryList,setCategoryList]=useState([])
   const [open,setOpen]=useState(false)

   const [status,setStatus]=useState('')
   const [icon,setIcon]=useState({file:'/assets/shopping-cart.png',bytes:''})
   const [categoryId,setCategoryId]=useState('')
   const [categoryName,setCategoryName]=useState('')
   const [error,setError]=useState({})
   const [btnStatus,setButtonStatus]=useState(false)
   const [oldIcon,setOldIcon]=useState('')
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

    /*if(!icon.bytes)
    {
      handleError('icon','Pls select icon for category...')
      isValid=false
      
    }*/
    

    return isValid
  }
 const handleEditData=async()=>{
  setOpen(false)
   if(validation())
   { var body={categoryid:categoryId,categoryname:categoryName,status:status}
      var result=await postData('category/category_edit_data',body)
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
   fetchCategoryList()

 }



   
   const fetchCategoryList=async()=>{
    var result=await getData('category/category_list')
    setCategoryList(result.data)
   }

   function showCategory() {
       return (
         <MaterialTable
           title="Category List"
           columns={[
               {title:'Category Id', field:'categoryid'},
               {title:'Category Name', field:'categoryname'},
               {title:'Status', field:'status'},
               {title:'Icon', field:'icon',
                render:rowData=> <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75}} variant='rounded' />}
              ]}
           data={categoryList}        
           actions={[
             {
               icon: 'edit',
               tooltip: 'Edit Category',
               onClick: (event, rowData) =>handleOpen(rowData) 
             },
             {
               icon: 'add',
               tooltip: 'Add Category',
               isFreeAction: true,
               onClick: (event) => navigate("/dashboard/categoryinterface")
             }
           ]}
         />
       )
     }

  const handlePicture=(event)=>{
    
    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    handleError('icon',null)
    setButtonStatus(true)
   }

   const handleCancel=()=>{

   setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:''})
   setButtonStatus(false)
   }

   const handleEditIcon=async()=>{
    setButtonStatus(false)
    setOpen(false)
    
    var formData=new FormData()
    formData.append('categoryid',categoryId)
    formData.append('icon',icon.bytes)
    var result=await postData('category/category_edit_icon',formData)
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


 
   fetchCategoryList()
  

   }

 const handleDelete=async()=>{
  setOpen(false)

   var body={categoryid:categoryId}
      var result=await postData('category/category_delete_data',body)
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


   
   fetchCategoryList()


 }
  const showCategoryForm=()=>{
    return(
      <div className={{ width:'30vw',
      height:'auto',
      padding:15,
      background:'#fff',
      borderRadius:10}}>
      <Grid container spacing={2}>
       <Grid item xs={12}>
        <div className={classes.headingStyle}>
         Add New Category
        </div>
         
       </Grid>
       <Grid item xs={12}>
           <TextField value={categoryName} error={error.categoryName?true:false} helperText={error.categoryName} onFocus={()=>handleError('categoryName',null)} onChange={(event)=>{setCategoryName(event.target.value)}} label="Category Name" variant='outlined' fullWidth/>
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
       
       <Grid item xs={4} >
       <IconButton color="primary" aria-label="upload picture" component="label">
       <input onChange={handlePicture}    hidden accept="image/*" type="file" />
       <PhotoCamera />
       </IconButton>  
       <div className={classes.errorText}>{error.icon}</div>
       </Grid>

       <Grid item xs={4} >
       <Avatar
     alt="Icon"
     src={icon.file}
     style={{ width: 56, height: 56 }}
     variant="rounded"
   />
      </Grid>

      <Grid item xs={4}>
       {btnStatus?<>
       <Button onClick={handleEditIcon} >Save</Button>
       <Button onClick={handleCancel}>Cancel</Button></>:<></>}
      </Grid>
      <Grid item xs={6}>
       <Button onClick={handleEditData} variant='contained' fullWidth>Edit</Button>
      </Grid>
      <Grid item xs={6}>
       <Button onClick={handleDelete} variant='contained' fullWidth>Delete</Button>
      </Grid>
      
      </Grid>
      </div>
     )
   

  }



   useEffect(function(){
   fetchCategoryList()

   },[])

   const handleClose=()=>{

    setOpen(false)
   }

   const handleOpen=(rowData)=>{
    setCategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setStatus(rowData.status)
    setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
    setOldIcon(rowData.icon)
    
    setOpen(true)
   }

   
   const displayCategoryDialog=()=>{
   return(
     <Dialog
       open={open}
       onClose={handleClose}
       >
       
        <DialogContent>
         {showCategoryForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
     </Dialog>

   )

   }

    return(<div className={classes.displaycontainer}>
      <div className={classes.displaybox}>
    {showCategory()}
    </div>
    {displayCategoryDialog()}
    </div>)

}