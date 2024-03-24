import { useState,useEffect } from "react";
import { useStyle } from "../productlist/ProductListCss";
import { Grid,FormControl,InputLabel,Button,MenuItem,Select, } from "@mui/material";
import { DropzoneArea } from "mui-file-dropzone";
import { postData,getData,serverURL } from "../services/FetchNodeService";



export default function ProductPictureInterface()
{ 
    const[categoryid,setCategoryId]=useState('')
    const[categoryList,setCategoryList]=useState([])
    const[subcategoryList,setSubCategoryList]=useState([])
    const[productlist,setProductList]=useState([])
    const[productlistid,setProductListId]=useState('')
    const[getproductlist,setGetProductList]=useState([])
    const[subcategoryid,setSubCategoryId]=useState('')
    const[productId,setProductId]=useState('')
    const[error,setError]=useState('')
    const[Icon,setIcon]=useState('')
    




    useEffect (function(){
        FetchAllCategory()
      },[])
      
      const handleCategorychange=(event)=>
      {
        setCategoryId(event.target.value)
        FetchAllSubCategory(event.target.value)
      }
      
      const handlesubcategorychange=(event)=>
      {
        setSubCategoryId(event.target.value)
        FetchAllProduct(event.target.value)
      }
      const handleproductchange=(event)=>
      {
        setProductId(event.target.value)
        FetchAllProductList(event.target.value)
      }
      
      
      
      
      const FetchAllCategory=async()=>{
        var result = await getData('category/categorylist')
        setCategoryList(result.data)
      }
      const FetchAllSubCategory=async(cid)=>
      {
         var result= await postData('subcategory/subcategorylist_by_categoryid',{categoryid:cid})
          setSubCategoryList(result.data)
      }
      const FetchAllProduct=async(scid)=>
      {
        var result = await postData('product/productlist_by_subcategoryid',{subcategoryid:scid})
        setProductList(result.data)
      }
      const FetchAllProductList=async(pl)=>
      {
        var result = await postData('productlist/getproductlist_by_productid',{productid:pl})
        setGetProductList(result.data)
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
        const fillProduct=()=>
        {
          return productlist.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
          })
        }
        const fillProductlist=()=>
        {
          return getproductlist.map((item)=>{
            return <MenuItem value={item.productlistid}>{item.productlistname}  {item.weight}</MenuItem>
          })
        }
      

    
    const handleError=(input,value)=>{
        setError((prev)=>({...prev,[input]:value}))
    }
    const validation=()=>
    {
      var isValid=true
      if(!categoryid)
      {
        handleError('categoryid','pls fill input fill')
        isValid=false
      }
      if(!subcategoryid)
      {
        handleError('subcategoryid','pls fill input fill')
        isValid=false
      }
      if(!productId)
      {
        handleError('productId','pls fill input fill')
        isValid=false
      }
      return isValid
    }

    const handleSubmit=async()=>
    {
        var formdata = new FormData()
        formdata.append('categoryid',categoryid)
        formdata.append('subcategoryid',subcategoryid)
        formdata.append('productid',productId)
        formdata.append('productlistid',productlistid)

        Icon.map((item,index)=>{
            formdata.append('picture'+index,item)
        })
        var result=await postData('productpicture/productpicture_submit',formdata)
        alert(result.message)
    }
    const classes=useStyle()
 return(<div className={classes.main}>
    <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
         <div className={classes.heading}>
           Add new product pictures
         </div>
            </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">category</InputLabel>
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
    <div className={classes.helptxt}>
      {error.categoryid}
    </div>
            </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">subCategory</InputLabel>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={subcategoryid}
    label="subcategoryid"
    onChange={handlesubcategorychange}
    onFocus={()=>handleError('subcategoryid',null)}  error={error.subcategoryid?true:false} >
      <MenuItem>-select subcategory-</MenuItem>
    {fillSubCategory()}
    </Select>
    </FormControl>
    <div className={classes.helptxt}>
      {error.subcategoryid}
    </div>
            </Grid>

             <Grid item xs={6}>
             <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">product</InputLabel>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={productId}
    label="productid"
    onChange={handleproductchange}
    onFocus={()=>handleError('productId',null)}  error={error.productId?true:false} >
      <MenuItem>-select product-</MenuItem>
    {fillProduct()}
    </Select>
    </FormControl>
    <div className={classes.helptxt}>
      {error.productId}
    </div>
             </Grid>

             <Grid item xs={6}>
             <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">productlist</InputLabel>
        <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={productlistid}
    label="productlistid"
    onChange={(event)=>setProductListId(event.target.value)}
    onFocus={()=>handleError('productlistid',null)}  error={error.productlistid?true:false} >
      <MenuItem value="select productlist">-select productlist-</MenuItem>
    {fillProductlist()}
    </Select>
    </FormControl>
    <div className={classes.helptxt}>
      {error.productlistid}
    </div>
             </Grid>
             <Grid item xs={12}>
             <DropzoneArea
           acceptedFiles={['image/*']}
          filesLimit={6}
          dropzoneText={"Drag and drop an image here or click"}
         onChange={(files) => setIcon(files)}
         />
             </Grid>
             <Grid item xs={6}>
              <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
             </Grid>
             <Grid item xs={6}>
              <Button fullWidth variant="contained">Reset</Button>
             </Grid>
        </Grid>

    </div>
 </div>)
}