import { Grid, TextField,FormControl,InputLabel,Select,MenuItem, IconButton,Avatar, Button } from "@mui/material";
import React, { useState,useEffect } from "react";
import { useStyles } from "./ProductCss";
import { PhotoCamera } from "@mui/icons-material";
import { postData,getData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";



export default function ProductInterface(){
    const classes = useStyles()
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [ProductName,setProductName]=useState('')
    const [description,setDescription]=useState('')
    const [status,setStatus]=useState('')
    const [picture,setPicture]=useState({file:'/assets/shopping-basket.png',bytes:''})
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])

/*fill drop down */

    useEffect(function(){
        fetchAllCategory()
        fetchAllSubCategory()
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

    const fetchAllSubCategory=async(cid)=>{
        var result=await postData('subcategory/subcategorylist_by_categoryid',{categoryid:cid})
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

//////////////////////////////////////////////
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError('picture',null)
    }

    const handleError=(input,value)=>{
    setError((prev)=>({...prev,[input]:value}))
    
    }

    const validation=()=>{
        var isValid=true
        
        if(!categoryId)
        {
            handleError('categoryid','Plss input category name for product....')
            isValid=false
        }

        if(!subCategoryId)
        {
            handleError('subcategoryid','Plss input sub category name for product....')
            isValid=false
        }

        if(!ProductName)
        {
            handleError('productname','Plss input product name....')
            isValid=false
        }

        if(!description)
        {
            handleError('description','Plss input description for product....')
            isValid=false
        }

        if(!status)
        {
            handleError('status','Plss input status for product....')
            isValid=false
        }

        if(!picture.bytes)
        {
            handleError('picture','Plss input picture for product....')
            isValid=false
        }

        return isValid
    }

    const handleSubmit=async()=>{
        if(validation())
        {
            var formData= new FormData()
            formData.append('productname',ProductName)
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('description',description)
            formData.append('status',status)
            formData.append('picture',picture.bytes)
            var result=await postData('product/productsubmit',formData)

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

    return(<div className={classes.container}>
        <div className={classes.box}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <div className={classes.headingStyle}>Add New Product</div>
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={categoryId}
        label="Categories"
        onChange={handleCategoryChange}
        onFocus={()=>handleError('categoryid',null)}
        error={error.categoryid?true:false}
        >
             <MenuItem>Select Category</MenuItem>
            {fillCategory()}
        </Select>
        </FormControl>
        <div className={classes.errorText}>{error.categoryid}</div>  
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={subCategoryId}
        label="SubCategories"
        onChange={(event)=>{setSubCategoryId(event.target.value)}}
        onFocus={()=>handleError('subcategoryid',null)}
        error={error.subcategoryid?true:false}
        >
            <MenuItem>Select Sub Category</MenuItem>
            {fillSubCategory()}
        </Select>
        </FormControl>
        <div className={classes.errorText}>{error.subcategoryid}</div>  
        </Grid>
        <Grid item xs={12}>
        <TextField fullWidth variant="outlined" label="Product Name" error={error.productname?true:false} helperText={error.productname} onFocus={()=>handleError('productname',null)} onChange={(event)=>{setProductName(event.target.value)}}>Product Name</TextField>
        </Grid>
        <Grid item xs={12}>
        <TextField fullWidth variant="outlined" label="Description" error={error.description?true:false} helperText={error.description} onFocus={()=>handleError('description',null)} onChange={(event)=>{setDescription(event.target.value)}}>Description</TextField>
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="status"
        onChange={(event)=>{setStatus(event.target.value)}}
        onFocus={()=>handleError('status',null)}
        error={error.status?true:false}
        >
        <MenuItem value="-Select Status-">-Select Status-</MenuItem>
        <MenuItem value="Continue">Continue</MenuItem>
        <MenuItem value="Discontinue">Discontinue</MenuItem>
        <MenuItem value="Trending">Trending</MenuItem>
        <MenuItem value="Popular">Popular</MenuItem>
        </Select>
        </FormControl>
        <div className={classes.errorText}>{error.status}</div>
        </Grid>
        <Grid item xs={4}>
        <IconButton color="primary" aria-label="upload picture" component="label">
        <input  onChange={handlePicture} hidden accept="image/*" type="file" />
        <PhotoCamera />
        </IconButton> 
        <div className={classes.errorText}>{error.picture}</div>  
        </Grid>
        <Grid item xs={8}>
        <Avatar
        alt="picture"
        src={picture.file}
        sx={{ width: 56, height: 56 }}
        />
        </Grid>
        <Grid item xs={6}>
            <Button onClick={handleSubmit} fullWidth variant="contained" color="success">Submit</Button>
        </Grid>
        <Grid item xs={6}>
            <Button fullWidth variant="contained" color="error">Reset</Button>
        </Grid>
        </Grid>
        </div>
        </div>)
}