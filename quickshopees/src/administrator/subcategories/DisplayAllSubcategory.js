import { getData, serverURL} from "../services/FetchNodeServices";
import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { Avatar,Grid,MenuItem,IconButton,InputLabel,Select,TextField,FormControl, Button } from "@mui/material";
import { useStyles } from "./SubcategoryCss";
import Dialog from '@mui/material/Dialog';
import  PhotoCamera  from "@mui/icons-material/PhotoCamera";
import {postData} from "../services/FetchNodeServices";
import Swal from 'sweetalert2';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";


export default function DisplayAllSubCategory()
{  const navigate=useNavigate()
    const classes = useStyles()
    const [subcategoryList,setSubCategoryList]=useState([])
    const [open,setOpen]=useState(false)

     const [status,setStatus]=useState('')
     const [categoryid,setCategoryId]=useState('')
     const [icon, setIcon]=useState({file:'/assets/shopping-cart1.png',bytes:''})
     const [subcategoryid, setsubcategoryId]=useState('')
     const [subcategoryname, setsubcategoryName]=useState('')
     const [error,setError]=useState({})
     const [oldIcon,setOldIcon]=useState('')
     const [btnStatus, setButtonStatus]=useState(false)
     const [categoryList,setCategoryList]=useState([])
/* fill category */

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



/////////////////////////




     const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))

}

const validation=()=>{
      var isValid=true
      if(!categoryid)
      {  handleError('categoryid','Please select categoryid..')
        isValid=false
      }
      if(!subcategoryname)
      {  handleError('subcategoryName','Please enter subcategory name..')
        isValid=false
      }
      if(!status)
      {  handleError('status','Please enter status..')
        isValid=false
      }
      /*if(!icon.bytes)
      {  handleError('icon','Please select icon...')
        isValid=false
      }*/
     return isValid
}
const handleEditData=async()=>{
  setOpen(false)
   if(validation())
   {
      var body={subcategoryid:subcategoryid,categoryid:categoryid,subcategoryname:subcategoryname,status:status}
      var result=await postData('subcategory/subcategoryEditData',body)
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
   fetchSubCategoryList()

}
    
    
     const fetchSubCategoryList=async()=>{
       var result=await getData('subcategory/subcategorylist')
       setSubCategoryList(result.data)
     }

     function showSubCategory() {
        return (
          <MaterialTable
            title="SubCategory List"
            columns={[
             { title:'SubCategory',field:'subcategoryid'},
             { title:'Category',field:'categoryname'},
             { title:'Name',field:'subcategoryname'},
             { title:'Status',field:'status'},
             { title:'Icon',field:'icon',
             render:rowData=> <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75}} variant='rounded'/>}
            ]}
            data={subcategoryList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'edit subcategory',
                onClick: (event, rowData) => handelOpen(rowData)
              },
              {
                icon: 'add',
                isFreeAction:true,
                tooltip: 'Add Subcategory',
                onClick: () => navigate("/dashboard/subcategoryinterface")
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

  const handleEditIcon=async()=>{
    setButtonStatus(false)
    setOpen(false)
    var formData= new FormData()
    formData.append('subcategoryid',subcategoryid)
    formData.append('icon',icon.bytes)
     var result= await postData('subcategory/subcategoryediticon',formData)
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
   
   fetchSubCategoryList()

  }

  const handleDelete=async()=>{
    setOpen(false)


  var body={subcategoryid:subcategoryid}
  var result=await postData('subcategory/subcategory_deletedata',body)
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

fetchSubCategoryList()
    
}

  const handleCancel=()=>{
    setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:''})
    setButtonStatus(false)

}

       const  showsubcategoryForm=()=>{

        return(
          <div className={{
            width:'50vw',
              height:'auto',
              padding:10,
              background:'#f5f6fa',
              borderRadius:15
          }}>
              
               <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <div className={classes.headingStyle}>
                        Edit/Delete In SubCategory
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
                      <TextField value={subcategoryname} error={error.subcategoryname?true:false} helperText={error.subcategoryname} onFocus={()=>handleError('subcategoryName',null)} onChange={(event)=>{setsubcategoryName(event.target.value)}} label="SubcategoryName" variant='outlined' fullWidth/>
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
              <Grid item xs={4}>
              <IconButton  color="primary" aria-label="upload picture" component="label">
             <input onChange={handlePicture} hidden accept="image/*" type="file" />
               <PhotoCamera />
               </IconButton>
               <div className={classes.errorText}>{error.icon}</div>
              </Grid>
              <Grid item xs={4}>
              <Avatar
               alt="Icon"
               src={icon.file}
               style={{ width: 58, height: 58 }}
               variant="rounded"
                  />
              </Grid>
              <Grid item xs={4}>
               {btnStatus?<>
                <Button onClick={handleEditIcon}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button></>:<></>}
            </Grid>
              <Grid item xs={6}>
                  <Button onClick={handleEditData} variant="contained" fullWidth>Edit</Button>
              </Grid>
              <Grid item xs={6}>
                  <Button onClick={handleDelete} variant="contained" fullWidth>Delete</Button>
              </Grid>
               </Grid>
              </div>
       )
       } 
      

     useEffect(function(){
      fetchSubCategoryList()

     },[])

     const handelClose=()=>{
      
      setOpen(false)
      
     }
     const handelOpen=(rowData)=>{
      setsubcategoryId(rowData.subcategoryid)
      setCategoryId(rowData.categoryid)
      setsubcategoryName(rowData.subcategoryname)
      setStatus(rowData.status)
      setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
      setOldIcon(rowData.icon)
      setOpen(true)
      
     }


     const displaySubCategoryDialog=()=>{
      return(
        <Dialog
           open={open}
           onClose={handelClose}
        >
          
          <DialogContent>
           {showsubcategoryForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handelClose}>Close</Button>
          </DialogActions>

        </Dialog>
      )
      }
     
    return(
      <div className={classes.displaycontainer}>
      <div className={classes.displaybox}>
         
         {showSubCategory()}
         </div>
         {displaySubCategoryDialog()}
    </div>
 )
}