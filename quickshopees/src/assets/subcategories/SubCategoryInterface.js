import { useEffect, useState } from "react";
import { Grid, TextField,Avatar,IconButton, Button, FormControl,MenuItem,Select,InputLabel} from "@mui/material";
import { useStyle } from "./subCategoryCss";
import { PhotoCamera } from "@mui/icons-material";
import { getData, postData } from "../services/FetchNodeService";
import ViewListIcon from '@mui/icons-material/ViewList';
import {  useNavigate } from 'react-router-dom';


export default function SubCategoryInterface()
{ 
  const navigate = useNavigate('')
  const[subCategoryName,setSubCategoryName]=useState('')
  const[categoryid,setCategoryId]=useState('')
  const[status,setStatus]=useState('')
  const[icon,setIcon]=useState({file:'',bytes:''})
  const[error,setError]=useState('')
  const[categoryList,setCategoryList]=useState([])


  useEffect (function(){
     FetchAllCategory()
  },[])

  const FetchAllCategory=async()=>{
    var result= await getData('category/categorylist')
    setCategoryList(result.data)
  }
  const fillCategory=()=>{
    return categoryList.map((item)=>{
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
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
    if(!icon.bytes)
    {
      handleError('icon','pls choose icon')
      isValid=false
    }
    if(!categoryid)
    {
      handleError('categoryid','pls input id')
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
      formData.append('subcategoryname',subCategoryName)
      formData.append('status',status)
      formData.append('icon',icon.bytes)
      var result=await postData('subcategory/subcategorysubmit',formData)
      alert(result.status)
    }
  }
    const classes=useStyle()

    return(<div className={classes.main}>
      <div className={classes.box}>
      <Grid container spacing={3}>

        <Grid item xs={12} style={{display:"flex",justifyContent:"space-between"}}>
          <div style={{fontWeight:600}}>
          Add sub category
          </div>
          <div>
            <ViewListIcon onClick={()=>navigate('/dashboard/displayallsubcategory')}/>
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
          <TextField fullWidth variant="outlined" label="subcategoryname" onFocus={()=>handleError('subCategoryName',null)} error={error.subCategoryName?true:false}  onChange={(event)=>setSubCategoryName(event.target.value)} helperText={error.subCategoryName}/>
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