 

///devesh code

import { useState ,useEffect} from "react";
import { useStyle } from "./ProductListCss";
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton, Avatar } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Swal from "sweetalert2";
import { getData, postData } from "../services/FetchNodeService";
import ViewListIcon from '@mui/icons-material/ViewList';
import {  useNavigate } from 'react-router-dom';

export default function ProductListInterface() 
{
     const navigate=useNavigate('')
    const[categoryId,setCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId] =useState('')
    const[Status, setStatus] = useState('')
    const[description,setDescription]=useState('')
    const[rate,setRate] = useState('')
    const[offer,setOffer] = useState('')
    const[weight,setWeight] = useState('')
    const[stock,setstock] = useState('')
    const[type,setType]=useState('')
   const[icon, setIcon] = useState({file:'',bytes:''})
   const[error, setError] = useState('')
    const[categoryList,setCategoryList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[productListName,setProductListName]=useState('')
    const[ProductList,setProductList]=useState([])
    const [productId, setProductId] = useState('')
    
   
    
    //fetch category 
    
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
     const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    } 
    
    ////////////
    // fetch Product
    
    
    const fetchAllProduct=async(scid)=>{
        var result=await postData("product/productlist_by_subcategoryid",{subcategoryid:scid})
        setProductList(result.data)
    }
    const fillProduct=()=>{
        return ProductList.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
            
        })
  }
  
  
  
  
  
  

            //subcategory

const fetchAllSubCategory = async(cid)=> {
    var result = await postData('subcategory/subcategorylist_by_categoryid',{categoryid:cid})
    setSubCategoryList(result.data)
}
 const fillSubCategory=()=>{
    return subCategoryList.map((item)=>{
return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })
}
const handleSubcategoryChange=(event)=>{
    setSubCategoryId(event.target.value)
    fetchAllProduct(event.target.value)
}
 
     //VALIDATION

const handlePicture=(event)=>
{
   setIcon({file:URL.createObjectURL(event.target.files[0]),bytes: event.target.files[0]})
        
}
const handleError=(input,value)=>{
    setError((prev)=>({ ...prev, [input]: value }))
}

const validation=()=>
 {
    var isvalid = true
    if(!categoryId)
    {
        handleError('categoryid',"pls input categoryid")
        isvalid=false
    }
    if(!subCategoryId)
    {
        handleError('subcategoryid','pls input subcategoryid')
        isvalid=false
        
    }

    if (!productId)
    {
        handleError('productId', 'pls input productname')
        isvalid = false
    }

    if(!productListName)
    {
        handleError('productListName','pls input ProductListName')
        isvalid=false
        
    }
    if (!Status) {
        handleError('Status', "pls select Status")
        isvalid = false
    }
    if(!description)
    {
        handleError('description','pls input description')
        isvalid=false
        
    }
    
    if(!rate)
    {
        handleError('rate','pls input rate')
        isvalid=false

    }
    if(!weight)
    {
        handleError('weight','pls input weight')
        isvalid=false

    }
    
    if(!offer)
    {
        handleError('offer','pls input offer')
        isvalid=false
        
    }
    if(!stock)
    {
        handleError('stock','pls input stock')
        isvalid=false
        
    }

    if(!type)
    {
        handleError('type','pls input type')
        isvalid=false
        
    }
    
    if (!icon.bytes)
    {
        handleError('icon',"pls select icon")
        isvalid = false
    }
    return isvalid
}


const handleClick=async()=>
{ 
   
        if(validation())
        {
            var formData=new FormData()
            formData.append("categoryid", categoryId)
            formData.append("subcategoryid", subCategoryId)
            formData.append("productid", productId)
            formData.append("productlistname", productListName)
            formData.append("description", description)
            formData.append("rate", rate)
            formData.append("offer", offer)
            formData.append("weight", weight+" "+type)
            formData.append("stock", stock)
            formData.append("status",Status)
            formData.append("picture", icon.bytes)
            var result=await postData("Productlist/productlistsubmit", formData)
     
          alert(result.message)
        }
}


const classes=useStyle()
return (
    
    <div className={classes.main}>
                <div className={classes.box}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{display:"flex",justifyContent:"space-between"}}>
                                <div className={classes.heading}>
                                   Add new productlist
                                    </div>
                                    <div>
                                    <ViewListIcon onClick={()=>navigate('/dashboard/displayallproductlist')}/>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                     value={categoryId}
                                    label="Categories"
                                    onChange={handleCategoryChange}
                                    onFocus={()=>handleError('categoryid', null)} error={error.categoryid?true:false}
                                >
                                    <MenuItem>Select Category</MenuItem>
                        {fillCategory()}
                                </Select>
                                <div>
                                    {error.categoryid}
                                </div>
                            </FormControl>    
                              </Grid>

                        <Grid item xs={4}>
                        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                     value={subCategoryId}
                                    label="subCategory"
                                    onChange={handleSubcategoryChange}
                                    onFocus={() => handleError('subCategoryId', null)} error={error.subcategoryid?true:false}
                                >
                                    <MenuItem>Select Category</MenuItem>
                                    {fillSubCategory()}
                                </Select>
                                <div className={classes.helptxt}>
                                    {error.subcategoryid}
                                </div>
                            </FormControl>    
                        </Grid>
                        <Grid item xs={4}>   
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">productName</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                     value={productId}
                                    label="productid"
                                    onChange={(event)=>{setProductId(event.target.value)}}
                                    onFocus={() => handleError('productId', null)} error={error.productId?true:false}
                                >
                                    <MenuItem>Select Category</MenuItem>
                                    {fillProduct()}
                                </Select>
                                <div className={classes.helptxt}>
                                    {error.productId}
                                </div>
                            </FormControl>    
                            </Grid>
                            <Grid item xs={6}>
              <TextField id="outlined-basic" label="ProductListName"  onFocus={()=>{handleError('productListName',null)}} error={error.productListName?true:false} helperText={error.productListName} variant="outlined" fullWidth onChange={(event)=>setProductListName(event.target.value) }/>
                    </Grid>
                        <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Description"  onFocus={()=>{handleError('description',null)}} error={error.description?true:false} helperText={error.description} variant="outlined" fullWidth onChange={(event)=>setDescription(event.target.value) }/>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField id="outlined-basic" label=" Rate"  onFocus={()=>{handleError('rate',null)}} error={error.rate?true:false} helperText={error.rate} variant="outlined" fullWidth onChange={(event) =>setRate(event.target.value)}/>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Offer Price"  onFocus={()=>{handleError('offer',null)}} error={error.offer ? true:false} helperText={error.offer} variant="outlined" fullWidth onChange={(event) =>setOffer(event.target.value)}/>
                        </Grid>

                        <Grid item xs={4}>
                        <TextField id="outlined-basic" label="weight"  onFocus={()=>{handleError('weight',null)}} error={error.weight ? true:false} helperText={error.weight} variant="outlined" fullWidth onChange={(event) => { setWeight(event.target.value) }}/>
                        </Grid>

                        <Grid item xs={4}>
                        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                     value={type}
                                    label="Type"
                                    onChange={(event)=>{setType(event.target.value)}}
                                    onFocus={() => handleError('type', null)} error={error.type? true:false}
                                >
                                    <MenuItem>Select Type</MenuItem>
                                    <MenuItem value="kg">Kg</MenuItem>
                                    <MenuItem value="ltr">ltr</MenuItem>
                                    <MenuItem value="ml"> ml</MenuItem>
                                    <MenuItem value="g">g</MenuItem>
                                    <MenuItem value="pcs">Pcs</MenuItem>

                                </Select>
                                <div className={classes.helptxt}>
                                    {error.type}
                                </div>
                            </FormControl>              
                                          </Grid>
                        <Grid item xs={4}>
                        <TextField id="outlined-basic" label="Stock"  onFocus={()=>{handleError('stock',null)}} error={error.stock?true:false} helperText={error.stock} variant="outlined" fullWidth onChange={(event)=>setstock(event.target.value)}/>
                        </Grid>
                    
                            <Grid item xs={12} >   
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                     value={Status}
                                    label="Status"
                                    onChange={(event) => { setStatus(event.target.value) }}
                                    onFocus={() => handleError('Status', null)} error={error.Status ? true : false}
                                >
                                    <MenuItem value="Select Statues">Select Statues</MenuItem>
                                    <MenuItem value="Continue">Continue</MenuItem>
                                    <MenuItem value="Discontinue">Discontinue</MenuItem>
                                    <MenuItem value="Popular">Popular</MenuItem>
                                    <MenuItem value="Trending">Trending</MenuItem>
                                </Select>
                            </FormControl>
                            <div className={classes.controlerror}>
                                {error.Status}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton color="primary" aria-label="upload picture" component="label" >
                                <input hidden accept="image/*" type="file"
                                 onChange={handlePicture} />
                                <PhotoCameraIcon />
                            </IconButton>
                            <div className={classes.helptxt}>
                                {error.icon}
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <Avatar
                                alt="Icon"
                                src={icon.file}
                                sx={{ width: 56, height: 56 }}
                                variant="rounded"
                            />
                        </Grid>

                    <Grid item xs={6}>
            <Button variant="contained" fullWidth onClick={handleClick}>SUBMIT</Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button variant="contained" fullWidth>
                                RESET
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>)
    
}