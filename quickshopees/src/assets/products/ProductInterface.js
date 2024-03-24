import { useEffect, useState } from "react";
import { Grid, TextField,Avatar,IconButton, Button, FormControl,MenuItem,Select,InputLabel} from "@mui/material";
import { useStyle } from "./ProductCss";
import {  PhotoCamera } from "@mui/icons-material";
import { getData, postData } from "../services/FetchNodeService";
import ViewListIcon from '@mui/icons-material/ViewList';
import {  useNavigate } from 'react-router-dom';



export default function ProductInterface()
{ 
  const navigate=useNavigate('')
  const[ProductName,setProductName]=useState('')
  const[categoryid,setCategoryId]=useState('')
  const[subcategoryid,setSubCategoryId]=useState('')
  const[status,setStatus]=useState('')
  const[icon,setIcon]=useState({file:'',bytes:''})
  const[error,setError]=useState('')
  const[Description,setDescription]=useState('')
  const[categoryList,setCategoryList]=useState([])
  const[subcategoryList,setSubCategoryList]=useState([])

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
    if(!Description)
    {
      handleError('Description','pls give description')
      isValid=false
    }
    if(!icon.bytes)
    {
      handleError('icon','pls choose icon')
      isValid=false
    }
    return isValid
  }
  const handleSubmit=async()=>
  {
    if(validation())
    {
      var formData=new FormData()
      formData.append('categoryid',categoryid)
      formData.append('subcategoryid',subcategoryid)
      formData.append('productname',ProductName)
      formData.append('description',Description)
      formData.append('status',status)
      formData.append('picture',icon.bytes)
      var result=await postData('product/productsubmit',formData)
      alert(result.message)
    }
  }
    const classes=useStyle()

    return(<div className={classes.main}>
      <div className={classes.box}>
      <Grid container spacing={3}>

        <Grid item xs={12} style={{display:"flex",justifyContent:"space-between"}}>
          <div style={{fontWeight:600}}>
          Add new product
          </div>
          <div>
            <ViewListIcon onClick={()=>navigate('/dashboard/displayallproduct')}/>
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
            <TextField fullWidth variant="outlined" label="productname" onChange={(event)=>setProductName(event.target.value)} onFocus={()=>handleError('ProductName',null)} error={error.ProductName?true:false}  />

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
            <TextField fullWidth variant="outlined" label="description" onChange={(event)=>setDescription(event.target.value)} onFocus={()=>handleError('description',null)} error={error.Description?true:false}  />

          </Grid>

        <Grid item xs={6}>
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onFocus={()=>handleError('icon',null)} error={error.icon?true:false} onChange={handlePicture} />
          <PhotoCamera />
       </IconButton>
       <div>
    {error.icon}
      </div> 
      </Grid>

      <Grid item xs={6}>
      <Avatar
     alt="Remy Sharp"
     src={icon.file}
     style={{ width: 56, height: 56 }}/>
   </Grid>
     <Grid item xs={6}>
        <Button variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" fullWidth>Reset</Button>
     </Grid>
      </Grid>
      </div>
    </div>)
      
  

}