import MaterialTable from "@material-table/core"
import { useStyle } from "./subCategoryCss"
import { useEffect, useState } from "react"
import { Button,Avatar,TextField,Grid,MenuItem,Select,FormControl,InputLabel,IconButton } from "@mui/material"
import { postData,getData,serverURL } from "../services/FetchNodeService"
import { Dialog,DialogActions,DialogContent } from "@mui/material"
import {PhotoCamera}  from "@mui/icons-material"
import Swal from "sweetalert2"
import {  useNavigate } from 'react-router-dom';


export default function DisplayAllSubCategory()
{ 
  const navigate=useNavigate('')
  const[subCategorylist,setSubCategoryList]=useState([])
  const[open,setOpen]=useState(false)
  const[status,setStatus]=useState('')
  const[icon,setIcon]=useState({file:'',bytes:''})
  const[subcategoryid,setSubCategoryId]=useState('')
  const[categoryid,setCategoryId]=useState('')
  const[subCategoryName,setSubCategoryName]=useState('')
  const[error,setError]=useState('')
  const[categorylist,setCategoryList]=useState([])
  const[btnState,setBtnState]=useState(false)
  const[oldIcon,setOldIcon]=useState('')

  const FetchAllCategory=async()=>
  {
    var result=await getData('category/categorylist')
    setCategoryList(result.data)
  }

  

  const fillCategory=()=>
  {
    return categorylist.map((item)=>{
    return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }
const FetchAllSubCategory=async()=>
{
    var result=await getData('subcategory/subcategorylist')
    setSubCategoryList(result.data)
}
useEffect (function(){
   FetchAllSubCategory()
   FetchAllCategory()
},[])

function ShowCategory() {
    return (
      <MaterialTable style={{margin:50}}
        title="Simple Action Preview"
        columns={[
            {title:'subcategoryid',field:'subcategoryid'},
            {title:'categoryid',field:'categoryname'},
            {title:'subcategoryname',field:'subcategoryname'},
            {title:'status',field:'status'},
            {title:'icon',field:'icon',
                     render:rowData=><Avatar src={`${serverURL}/images/${rowData.icon}`}style={{width:40}} variant="circular" />}
            
        ]}

        data={subCategorylist}  

        actions={[
          {
            icon: 'edit',
            tooltip: 'Save User',
            onClick: (event, rowData) => handleOpen(rowData)
          }, {
            icon: 'add',
            tooltip: 'Add subcategory',
            isFreeAction: true,
            onClick: (event) =>navigate('/dashboard/subcategoryinterface')
          }
        ]}
      />
    )
  }
  const handleOpen=(rowData)=>
  { 
    
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategoryName(rowData.subcategoryname)
    setStatus(rowData.status)
    setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
    setOldIcon(rowData.icon)
     setOpen(true)
  }
  const handleClose=()=>
  {
     setOpen(false)
  }


const CategoryDialog=()=>{
       
  return(<div>    
     <Dialog
  open={open}
  onClose={handleClose}>
   
   <DialogContent>
     
    
   {SubcategoryForm()}

   </DialogContent>

   <DialogActions>
     <Button onClick={handleClose}>close</Button>
   </DialogActions>

 </Dialog>

 </div>)


 }
 
  const handlePicture=(event)=>{
    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnState(true)
    
  }
   
  const handleError=(input,value)=>
  {
    setError((prev)=>({...prev,[input]:value}))
  }
  const validation=()=>
  {
    var isValid=true
    if(!subCategoryName)
    {
      handleError('subCategoryName','pls fill input')
      isValid=false
    }
    if(!status)
    {
      handleError('status','pls input')
      isValid=false
    }
    // if(!icon.bytes)
    // {
    //   handleError('icon','pls choose icon')
    //   isValid=false
    // }
    if(!categoryid)
    {
      handleError('categoryid','pls input id')
      isValid=false
    }
    return isValid
  }
  const handleEdit=async()=>
  {
    
      setOpen(false)
      if(validation())
      {
         var body={subcategoryid:subcategoryid,categoryid:categoryid,subcategoryname:subCategoryName,status:status}
          var result= await postData('subcategory/subcategoryupdate',body)
      }
      if(result.status)
      {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: result.message,
              showConfirmButton: false,
              timer: 1500
            })
           FetchAllSubCategory()
      }
    }
    const handleDelete=async()=>{
      setOpen(false)
      if(validation()){
      var body={
        subcategoryid:subcategoryid
      }
        var result= await postData('subcategory/subcategorydelete',body)
    }
       
          if(result.status)
          {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: result.message,
                  showConfirmButton: false,
                  timer: 1500
                })
                FetchAllSubCategory()
        }
     
    }

    const handleSave=async()=>
     { setBtnState(false)
      setOpen(false)
       var formData=new FormData()
       formData.append('subcategoryid',subcategoryid)
       formData.append('icon',icon.bytes)
       var result =await postData('subcategory/subcategoryicon',formData)
       
       if(result.status)
      {
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: result.message,
              showConfirmButton: false,
              timer: 1500
            })
           FetchAllSubCategory()
      }
      }
      const handleCancel=()=>
      {
        setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:''})
        setBtnState(false)
      }
  
  const SubcategoryForm=()=>
 {
      const classes=useStyle()
  return(
      <div className={classes.formbox}>
      <Grid container spacing={3}>

        <Grid item xs={6}>
          <div style={{fontWeight:600}}>
          Add sub category
          </div>
        </Grid>
        
        <Grid item xs={12}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">categoryid</InputLabel>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={categoryid}
    label="categoryid"
    onChange={(event)=>setCategoryId(event.target.value)}
    onFocus={()=>handleError('categoryid',null)}  error={error.categoryid?true:false} >
      <MenuItem>-select category-</MenuItem>
      {fillCategory()}
    </Select>
    </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="subcategoryname" onFocus={()=>handleError('subCategoryName',null)} error={error.subCategoryName?true:false}  onChange={(event)=>setSubCategoryName(event.target.value)} helperText={error.subCategoryName}  value={subCategoryName}/>
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
    <MenuItem value='Dicontinue'>Discontinue</MenuItem>
  </Select>
</FormControl>
<div>
    {error.status}
</div>

        </Grid>
        <Grid item xs={4}>
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onFocus={()=>handleError('icon',null)} error={error.icon?true:false} onChange={handlePicture} />
          <PhotoCamera />
       </IconButton>
       <div>
    {error.icon}
      </div> 
      </Grid>

      <Grid item xs={4}>
      <Avatar
     alt="Remy Sharp"
     src={icon.file}
     style={{ width: 56, height: 56 }}/>
   </Grid>
   <Grid item xs={4}>
    {btnState?<>
      <Button on onClick={handleSave}>Save</Button>
      <Button onClick={handleCancel}>Cancel</Button></>:<></>}

   </Grid>
     <Grid item xs={6}>
        <Button variant="contained" fullWidth onClick={handleEdit}>Edit</Button>
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" fullWidth onClick={handleDelete}>Delete</Button>
     </Grid>
      </Grid>
      </div>)
 }

    return(<div>
      {ShowCategory()}
      {CategoryDialog()}
    </div>)

}