import { useState, useEffect } from "react";
import { useStyle } from "./ProductlistCss";
import { Avatar, Grid, TextField, Button, IconButton } from "@mui/material";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { getData, postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function ProductListInterface() {
  const classes = useStyle()
  const [status, setStatus] = useState("")
  const [productListName, setproductListName]=useState("")
  const [rate, setRate]=useState("")
  const [offer, setOffer]=useState("")
  const [weight, setWeight]=useState("")
  const [stock, setStock]=useState("")
  const [categoryId, setCategoryId]=useState("")
  const [SubCategoryId, setsubcategoryId] = useState("")
  const [picture, setpicture] = useState({ file: "Assets/purchase.gif", bytes: "" })
  const [productId, setproductId] = useState("")
  const [categoryList, setCategoryList]=useState([])
  const [Description, setdescription] = useState("")
  const [error, setError]=useState({})
  const [type, setType]=useState('')
  const[SubcategoryList, setSubcategoryList]=useState([])
  const[ProductList, setProductList]=useState([])

  useEffect(function(){
    fetchAllCategory()
  },[])
  const fetchAllCategory=async()=>{
    var result=await getData("category/category_list")
    setCategoryList(result.data)
  }
  const fetchAllSubcategory=async(cid)=>{
    var result=await postData("subcategory/subcategorylist_by_categoryid",{categoryid:cid})
    setSubcategoryList(result.data)
  }
  const handleCategoryChange=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubcategory(event.target.value)
  }
  
  const fetchAllProduct=async(subid)=>{
    var result=await postData("product/product_list_by_subcategoryid",{subcategoryid:subid})
    setProductList(result.data)
  }
  const handleSubcategoryChange=(event)=>{
    setsubcategoryId(event.target.value)
    fetchAllProduct(event.target.value)
  }
  const fillCategory=()=>{
    return categoryList.map((item)=>{
    return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }
  const fillSubcategory=()=>{
    return SubcategoryList.map((item)=>{
    return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    
    })
  }
  const fillProduct=()=>{
    return ProductList.map((item)=>{
    return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    
    })
  }
  const handlePicture = (event) => {
    setpicture({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    handleError("picture",null)
  }
  const handleError=(input,value)=>{
    setError(prev=>({...prev,[input]:value}))
  }
  const validation=()=>{
    var isValid=true
    if(!productListName)
    {
      handleError("productname","Plz Input Product List Name")
      isValid=false
    }
    if(!Description)
    {
      handleError("description","Plz Input Description")
      isValid=false
    }
    if(!rate)
    {
      handleError("rate","Plz Input Rate")
      isValid=false
    }
    if(!offer)
    {
      handleError("offer","Plz Input Offer")
      isValid=false
    }
    if(!weight)
    {
      handleError("weight","Plz Input Weight")
      isValid=false
    }
    if(!stock)
    {
      handleError("stock","Plz Input Stock")
      isValid=false
    }
    if(!status)
    {
      handleError("status","Plz Input Status")
      isValid=false
    }
    if(!picture.bytes)
    {
      handleError("picture","Plz Select picture for Product List")
      isValid=false
    }
    return(isValid)
  }
  const handleClick=async()=>{
    if(validation())
    {
       var formData=new FormData()
       formData.append("categoryid", categoryId)
       formData.append("subcategoryid", SubCategoryId)
       formData.append("productid", productId)
       formData.append("productlistname", productListName)
       formData.append("description", Description)
       formData.append("rate", rate)
       formData.append("offer", offer)
       formData.append("weight", weight+" "+type)
       formData.append("stock", stock)
       formData.append("status",status)
       formData.append("picture", picture.bytes)
       var result=await postData("ProductList/productlistsubmit", formData)
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
         showConfirmButton: true,
         })
     }
  }
  }
  return (<div className={classes.container}>
    <div className={classes.box}>
      
      <Grid container spacing={3}>
      <Grid item xs={12}>
       <div  className={classes.headingStyle}>
        Add New Product List
       </div>
      </Grid>
      <Grid item xs={4}>
      <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId}
              label="Categories"
              onChange={handleCategoryChange}
              onFocus={()=>handleError("categoryid", null)}
              error={error.categoryId?true:false}
            >
              <MenuItem>Select Category</MenuItem>
              {fillCategory()}
              </Select>
              </FormControl>
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sub-Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={SubCategoryId}
              label="Sub-Categories"
              
              onChange={handleSubcategoryChange}
              onFocus={()=>handleError("subcategoryid", null)}
              error={error.SubCategoryId?true:false}
            >
              <MenuItem>Select Sub-Category</MenuItem>
              {fillSubcategory()}
              </Select>
              </FormControl>
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productId}
              label="Products"
              
              onChange={(event)=>{setproductId(event.target.value)}}
              onFocus={()=>handleError("productid", null)}
              error={error.productId?true:false}
            >
              <MenuItem>Select Product</MenuItem>
              {fillProduct()}
              </Select>
              </FormControl> 
        </Grid>
        <Grid item xs={6}>
          <TextField error={error.productlistname?true:false} helperText={error.productlistname} onFocus={()=>handleError("productlistname", null)} onChange={(event) => { setproductListName(event.target.value) }} label="Product List Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField error={error.description?true:false} helperText={error.description} onFocus={()=>handleError("description", null)} onChange={(event) => { setdescription(event.target.value) }} label="Description" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField error={error.rate?true:false} helperText={error.rate} onFocus={()=>handleError("rate", null)} onChange={(event) => { setRate(event.target.value) }} label="Enter Rate" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField error={error.offer?true:false} helperText={error.offer} onFocus={()=>handleError("offer", null)} onChange={(event) => { setOffer(event.target.value) }} label="Enter Offer Price" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField error={error.weight?true:false} helperText={error.weight} onFocus={()=>handleError("weight", null)} onChange={(event) => { setWeight(event.target.value) }} label="Enter Weight" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={4}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={(e)=>setType(e.target.value)}
            >
              
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="ltr">ltr</MenuItem>
              <MenuItem value="ml">ml</MenuItem>
              <MenuItem value="g">g</MenuItem>
              <MenuItem value="Pcs">Pcs</MenuItem>

         
              </Select>
              </FormControl>
      
      
         </Grid>
        
        <Grid item xs={4}>
          <TextField error={error.stock?true:false} helperText={error.stock} onFocus={()=>handleError("stock", null)} onChange={(event) => { setStock(event.target.value) }} label="Enter Stock" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={(event) => setStatus(event.target.value)}
              onFocus={()=>handleError("status", null)}
              error={error.status?true:false}
            >
              <MenuItem value={"-Select Status-"}>-Select Status-</MenuItem>
              <MenuItem value={"Continue"}>Continue</MenuItem>
              <MenuItem value={"Discontinue"}>Discontinue</MenuItem>
              <MenuItem value={"Trending"}>Trending</MenuItem>
              <MenuItem value={"Popular"}>Popular</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.errorText}>{error.status}</div>
        </Grid>

        <Grid item xs={6}>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input onChange={handlePicture} hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
          <div className={classes.errorText}>{error.picture}</div>
        </Grid >
        <Grid item xs={6}>
          <Avatar
            alt="Icon"
            src={picture.file}
            style={{ width: 56, height: 56 }}
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
  </div>)
}