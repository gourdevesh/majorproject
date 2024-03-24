import MaterialTable from "@material-table/core"
import {postData, getData,serverURL } from "../services/FetchNodeService"
import {Grid, TextField,Avatar,IconButton, Button, FormControl,MenuItem,Select,InputLabel } from "@mui/material"
import { useStyle } from "./ProductCss"
import { useEffect, useState } from "react"
import { Dialog,DialogActions,DialogContent } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import Swal from "sweetalert2"
import {  useNavigate } from 'react-router-dom';

export default function DisplayAllProduct()
{   const navigate=useNavigate('')
    const[productId ,setProductId]=useState('')
    const[productlist,setProductList]=useState([])
    const[ProductName,setProductName]=useState('')
  const[categoryid,setCategoryId]=useState('')
  const[subcategoryid,setSubCategoryId]=useState('')
  const[status,setStatus]=useState('')
  const[icon,setIcon]=useState({file:'',bytes:''})
  const[error,setError]=useState('')
  const[description,setDescription]=useState('')
  const[categoryList,setCategoryList]=useState([])
  const[subcategoryList,setSubCategoryList]=useState([])
  const[btnStatus,setBtnStatus]=useState(false)
  const[oldIcon,setOldIcon]=useState({file:'',bytes:''})
    const[open,setOpen]=useState(false)
    
    function showProduct() {
        return (
          <MaterialTable style={{margin:50}}
            title="product"
            columns={[
                {title:'productid',field:'productid'},
                {title:'categoryname',field:'categoryname'},
                {title:'subcategoryname',field:'subcategoryname'},
                {title:'productname',field:'productname'},
                {title:'status',field:'status'},
                {title:'Description',field:'description'},
                {title:'picture',field:'picture',
                         render:rowData=><Avatar src={`${serverURL}/images/${rowData.picture}`}style={{width:40}} variant="circular" />}
                
            ]}
          data={productlist}
              
    
            actions={[
              {
                icon: 'edit',
                tooltip: 'Save User',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) =>navigate('/dashboard/productinterface')
              }
            ]}
          />
        )
      }
      const handleOpen=(rowData)=>
      { 
        // alert(JSON.stringify(rowData))
        FetchAllSubCategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
       setProductId(rowData.productid)
       setStatus(rowData.status)
       setProductName(rowData.productname)
       setDescription(rowData.description)
       setIcon({file:`${serverURL}/images/${rowData.picture}`,bytes:''}) 
       setOldIcon(rowData.picture)
         setOpen(true)
      }
      const handleClose=()=>
      {
        setOpen(false)
      }
      const handleSave=async()=>{
        setOpen(false)
        var formData=new FormData()
         formData.append('productid',productId)
         formData.append('picture',icon.bytes)
         var result=await postData('product/product_picture_update',formData)   
         
         if(result.status)
         {
          Swal.fire({
            position: 'center',
              icon: 'success',
              title: result.message,
              showConfirmButton: false,
              timer: 1500
          })
         }
         else{
          Swal.fire({
            position: 'center',
              icon: 'error',
              title: result.message,
              showConfirmButton: false,
              timer: 1500
          })
         }
          FetchAllProduct()
      }
      const ProductDialog=()=>{
       
        return(<div>    
           <Dialog
        open={open}
        onClose={handleClose}>
         
         <DialogContent>
          {ProductEditForm()}
         </DialogContent>
      
         <DialogActions>
           <Button onClick={handleClose}>close</Button>
         </DialogActions>
      
       </Dialog>
      
       </div>)
       }

     

  useEffect (function(){
     FetchAllCategory()
  },[])
  const FetchAllSubCategory=async(cid)=>
  {
    var result= await postData('subcategory/subcategorylist_by_categoryid',{categoryid:cid})
    setSubCategoryList(result.data)
  }

  const handleCategorychange=(event)=>
  {
    setCategoryId(event.target.value)
    FetchAllSubCategory(event.target.value)
  }
 
  const FetchAllCategory=async()=>{
    var result= await getData('category/categorylist')
    setCategoryList(result.data)
  }
  const fillCategory=()=>
  {
    return categoryList.map((item)=>{
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }
  const fillSubCategory=()=>
  {
    return subcategoryList.map((item)=>{
      return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })
  }

  const handlePicture=(event)=>{
    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnStatus(true)
  }
  const handleCancel=()=>{
    setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:''})
    setBtnStatus(false)
   
  }
 
   
  const handleError=(input,value)=>
  {
    setError((prev)=>({...prev,[input]:value}))
  }
  const validation=()=>
  {
    var isValid=true
    if(!categoryid)
    {
      handleError('categoryid','pls input id')
      isValid=false
    }
    if(!subcategoryid)
    {
      handleError('subcategoryid','pls fill input')
      isValid=false
    }
    if(!ProductName)
    {
      handleError('ProductName','pls fill input')
      isValid=false
    }
    if(!status)
    {
      handleError('status','pls input')
      isValid=false
    }
    if(!description)
    {
      handleError('description','pls give description')
      isValid=false
    }
    // if(!icon.bytes)
    // {
    //   handleError('icon','pls choose icon')
    //   isValid=false
    // }
    return isValid
  }
      
      const FetchAllProduct=async()=>
      {
        var result=await getData('product/productlist')
        setProductList(result.data) 
      }
      useEffect (function(){
          FetchAllProduct()
      },[])


      const classes=useStyle()
      const ProductEditForm=()=>{
    return(
      <div className={classes.formbox}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <div style={{fontWeight:600,fontFamily:'poppins'}}>
          Add new product
          </div>
        </Grid>
        
        <Grid item xs={6}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">categoryid</InputLabel>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={categoryid}
    label="categoryid"
    onChange={handleCategorychange}
    onFocus={()=>handleError('categoryid',null)}  error={error.categoryid?true:false} >
      <MenuItem>-select category-</MenuItem>
      {fillCategory()}
    </Select>
    </FormControl>
        </Grid>

        <Grid item xs={6}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">subcategoryid</InputLabel>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={subcategoryid}
    label="subcategoryid"
    onChange={(event)=>setSubCategoryId(event.target.value)}
    onFocus={()=>handleError('subcategoryid',null)}  error={error.subcategoryid?true:false} >
    
      {fillSubCategory()}
    </Select>
    </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="productname" onChange={(event)=>setProductName(event.target.value)} onFocus={()=>handleError('ProductName',null)} error={error.ProductName?true:false} value={ProductName} />

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

        <Grid item xs={12}>
            <TextField fullWidth variant="outlined" label="description" onChange={(event)=>setDescription(event.target.value)} helperText={error.description} onFocus={()=>handleError('description',null)} value={description} error={error.description?true:false}  />

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
    {btnStatus?<>
     <Button onClick={handleSave}>Save</Button>
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
      const handleEdit=async()=>
      {
        if(validation())
        {
          var body={
            productid:productId,productname:ProductName,categoryid:categoryid,subcategoryid:subcategoryid,status:status,description:description
          }
          var result = await postData('product/productupdate',body)
        }
        alert(result.message)
         FetchAllProduct()
      }
      const handleDelete=async()=>{
        setOpen(false)
      if(validation()){
      var body={
        productid:productId
      }
        var result= await postData('product/product_delete',body)
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
                FetchAllProduct()
        }
     
      }

      return(<div>
        {showProduct()}
        {ProductDialog()}
      </div>)
}