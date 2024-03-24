import { useState,useEffect } from "react";
import { useStyles } from "./ProductPictureCss";
import { Grid,FormControl,InputLabel,Select,MenuItem, Button } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { postData,getData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function ProductPictures(){
const classes=useStyles()
const [categoryId,setCategoryId]=useState('')
const [subCategoryId,setSubCategoryId]=useState('')
const [productId,setProductId]=useState('')
const [productListId,setProductListId]=useState('')
const [pictures,setPictures]=useState('')
const [categoryList,setCategoryList]=useState([])
const [subCategoryList,setSubCategoryList]=useState([])
const [productList,setProductList]=useState([])
const [productsList,setProductsList]=useState([])


useEffect(function(){
fetchAllCategory()
},[])

/*Category */
const fetchAllCategory=async()=>{
    var result=await getData('category/category_list')
    setCategoryList(result.data)
}

const fillCategory=()=>{
return categoryList.map((item)=>{
    return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
})
}
/*SubCategory */
const fetchAllSubCategory=async(categoryId)=>{
var result=await postData('subcategory/subcategorylist_by_categoryid',{categoryid:categoryId})
setSubCategoryList(result.data)
}

const handleCategoryChange=(event)=>{
setCategoryId(event.target.value)
fetchAllSubCategory(event.target.value)
}
const fillSubCategory=()=>{
return subCategoryList.map((item)=>{
    return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
})
}
/*Products */
const fetchAllProducts=async(subCategoryId)=>{
    var result=await postData('product/product_list_by_subcategoryid',{subcategoryid:subCategoryId})
    setProductList(result.data)
}
const handleSubCategoryChange=(event)=>{
setSubCategoryId(event.target.value)
fetchAllProducts(event.target.value)
}
const fillProuducts=()=>{
    return productList.map((item)=>{
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    })
}

/*Product Lists */
const fetchAllProductList=async(productId)=>{
    var result=await postData('productpictures/productlist_by_productid',{productid:productId})
    setProductsList(result.data)
}
const handleProductsChange=(event)=>{
setProductId(event.target.value)
fetchAllProductList(event.target.value)
}
const fillProductList=()=>{
    return productsList.map((item)=>{
        return <MenuItem value={item.productlistid}>{item.productlistname} {item.weight}</MenuItem>
    })
}


const handleSubmit=async()=>{
    var formData=new FormData()
    formData.append('categoryid',categoryId)
    formData.append('subcategoryid',subCategoryId)
    formData.append('productid',productId)
    formData.append('productlistid',productListId)
    pictures.map((item,i)=>{
        formData.append('picture'+i,item)
    })
    var result=await postData('productpictures/submit_product_pictures',formData)
    if(result.status)
            {
                Swal.fire({
                    icon: 'success',
                    title: result.message,
                    showConfirmButton: true,
                  })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                    showConfirmButton: true,
                  })
            }
            
}
    return(<div className={classes.container}>
        <div className={classes.box}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <div className={classes.headingStyle}>Add Product Pictures</div>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={categoryId}
        label="Categories"
        onChange={handleCategoryChange}
        >
            {fillCategory()}
        </Select>
        </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sub Category Name</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={subCategoryId}
        label="Sub Categories"
        onChange={handleSubCategoryChange}
        >
            {fillSubCategory()}
        </Select>
        </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Name</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={productId}
        label="Products"
        onChange={handleProductsChange}
        >
            {fillProuducts()}
        </Select>
        </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Lists Name</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={productListId}
        label="Product Lists"
        onChange={(event)=>setProductListId(event.target.value)}
        >
            {fillProductList()}
        </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <DropzoneArea
        acceptedFiles={['image/*']}
        filesLimit={6}
        dropzoneText={"Drag and drop an image here or click"}
        onChange={(files) => setPictures(files)}
        />
        </Grid>
        <Grid item xs={6}>
            <Button onClick={handleSubmit} fullWidth variant="contained" color="success" >SUBMIT</Button>
        </Grid>
        <Grid item xs={6}>
            <Button fullWidth variant="contained" color="error">RESET</Button>
        </Grid>
        </Grid>
        </div>
    </div>)
}