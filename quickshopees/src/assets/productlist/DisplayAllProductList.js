import { useState,useEffect } from "react";
import { Grid,Button,Avatar,Select,FormControl,InputLabel,MenuItem,TextField ,IconButton } from "@mui/material";
import { postData,serverURL,getData } from "../services/FetchNodeService";
import { PhotoCamera } from "@mui/icons-material";
import MaterialTable from "@material-table/core";
import {Dialog,DialogActions,DialogContent} from "@mui/material";
import { useStyle } from "./ProductListCss";
import Swal from "sweetalert2";
import {  useNavigate } from 'react-router-dom';

export default function DisplayAllProductList()
{   
  const navigate=useNavigate('')
    const[categoryid,setCategoryId]=useState('')
const[categoryList,setCategoryList]=useState([])
const[subcategoryList,setSubCategoryList]=useState([])
const[productlist,setProductList]=useState([])
const[subcategoryid,setSubCategoryId]=useState('')
const[productId,setProductId]=useState('')
const[productListName,setProductListName]=useState('')
const[rate,setRate]=useState('')
const[weight,setWeight]=useState('')
const[offer,setOffer]=useState('')
const[description,setDescription]=useState('')
const[stock,setStock]=useState('')
const[status,setStatus]=useState('')
const[error,setError]=useState('')
const[icon,setIcon]=useState({file:'',bytes:''})
const[type,setType]=useState('')
const[productlistid,setProductListId]=useState('')
const[getProductList,setGetProductList]=useState([])
const[open,setOpen]=useState(false)
const[btnState,setBtnStatus]=useState(false)
const[oldIcon,setOldIcon]=useState({file:'',bytes:''})



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
        var result = await postData('product//productlist_by_subcategoryid',{subcategoryid:scid})
        setProductList(result.data)
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
       
        const handlePicture=(event)=>{
          setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
          setBtnStatus(true)
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
        if(!productListName)
        {
          handleError('productListName','pls fill input fill')
          isValid=false
        }
        if(!description)
        {
          handleError('description','pls fill input fill')
          isValid=false
        }  
        if(!rate)
        {
          handleError('rate','pls fill input fill')
          isValid=false
        }
        if(!offer)
        {
          handleError('offer','pls fill input fill')
          isValid=false
        }
        if(!weight)
        {
          handleError('weight','pls fill input fill')
          isValid=false
        }
        if(!stock)
        {
          handleError('stock','pls fill input fill')
          isValid=false
        }
        if(!status)
        {
          handleError('status','pls fill input fill')
          isValid=false
        }
        // if(!icon.bytes)
        // {
        //   handleError('icon','pls fill input fill')
        //   isValid=false
        // }
        // return isValid
      }

  useEffect (function(){
    FetchAllProductList()
  },[])

    const FetchAllProductList=async()=>
    {
        var result=await getData('productlist/getproductlist')
        setGetProductList(result.data)
    }

    function showProductList() {
        return (
          <MaterialTable style={{margin:40}}
            title="product list"
            columns={[
                {title:'productlistid',field:'productlistid'},
                {title:'categoryname/subcateoryname',field:'categoryname',
               render:rowData=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>
              },
                
                {title:'productname/productlistname',field:'productname',
                render:rowData=><div><div>{rowData.productname}</div><div>{rowData.productlistname}</div></div>
              },
               
                {title:'Description',field:'description'},
                {title:'rate/offer',field:'rate',
                render:rowData=><div><div><s>{rowData.rate}</s></div><div>{rowData.offer}</div></div>
              },
                
                {title:'weight',field:'weight'},
                {title:'stock',field:'stock'},
                {title:'status',field:'status'},
                {title:'picture',field:'picture',
                         render:rowData=><Avatar src={`${serverURL}/images/${rowData.picture}`}style={{width:40}} variant="circular" />}
                
            ]}
          data={getProductList}
              
    
            actions={[
              {
                icon: 'edit',
                tooltip: 'Save User',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add productlist',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/productlistinterface')
              }
            ]}
          />
        )
      } 
      

      const handleOpen=(rowData)=>
      {
        // alert(JSON.stringify(rowData))
        FetchAllProduct(rowData.subcategoryid)
        FetchAllSubCategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductListId(rowData.productlistid)
        setProductId(rowData.productid)
        setProductListName(rowData.productlistname)
        setDescription(rowData.description)
        setRate(rowData.rate)
        setOffer(rowData.offer)
        setWeight(rowData.weight)
        setType(rowData.type)
        setStock(rowData.stock)
        setStatus(rowData.status)
        setIcon({file:`${serverURL}/images/${rowData.picture}`})
        setOldIcon(rowData.picture)
        setOpen(true)

      }
      const handleEdit=async()=>
      {  setOpen(false)
        var body={
          productlistid:productlistid,categoryid:categoryid,subcategoryid:subcategoryid,productid:productId,productlistname:productListName,offer:offer,weight:weight,stock:stock,rate:rate,status:status,description:description

        }
        var result= await postData('productlist/productlistupdate',body)
        alert(result.message)
        FetchAllProductList()
      }

      const handleDelete=async()=>
      {
        setOpen(false)
        
          var body={
            productlistid:productlistid
          }
            var result= await postData('productlist/productlist_delete',body)
        
           
              if(result.status)
              {
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: result.message,
                      showConfirmButton: false,
                      timer: 1500
                    })
                    FetchAllProductList()
      }
    }

      const handleClose=()=>
      {
        setOpen(false)
      }
      const handleCancel=()=>
      {
        setIcon({file:`${serverURL}/images/${oldIcon}`})
        setBtnStatus(false)
      }
      const handleSave=async()=>
      { setBtnStatus(false)
        setOpen(false)
        var formData=new FormData()
        formData.append('productlistid',productlistid)
        formData.append('picture',icon.bytes)
        var result= await postData('productlist/productlist_picture_update',formData)
       alert(result.message)
       FetchAllProductList()
       }
      
      const ProductListDialog=()=>{
       
        return(<div>    
           <Dialog
        open={open}
        onClose={handleClose}>
         
         <DialogContent>
         {EditProductList()}
         </DialogContent>
      
         <DialogActions>
           <Button onClick={handleClose}>close</Button>
         </DialogActions>
      
       </Dialog>
      
       </div>)
       }
       const classes=useStyle()
       const EditProductList=()=>{
       return(
         <div className={classes.formbox}>
           <Grid container spacing={2}>
           <Grid item xs={12}>
               <div className={classes.heading}>
            Add new productlist
            </div>
           </Grid>
           <Grid item xs={4}>
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
   
           <Grid item xs={4}>
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
           <Grid item xs={4}>
           <FormControl fullWidth>
     <InputLabel id="demo-simple-select-label">product</InputLabel>
           <Select
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       value={productId}
       label="productid"
       onChange={(event)=>setProductId(event.target.value)}
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
          <TextField fullWidth variant="outlined" label="ProductListName"   onChange={(event)=>setProductListName(event.target.value)} onFocus={()=>handleError('productListName',null)} helperText={error.productListName} error={error.productListName?true:false} value={productListName} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Description" onChange={(event)=>setDescription(event.target.value)} onFocus={()=>handleError('description',null)} helperText={error.dscription}  error={error.description?true:false} value={description} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Rate" onChange={(event)=>setRate(event.target.value)} helperText={error.rate} onFocus={()=>handleError('rate',null)} error={error.rate?true:false} value={rate}/>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth variant="outlined" label="Offer price" onChange={(event)=>setOffer(event.target.value)} helperText={error.offer} onFocus={()=>handleError('offer',null)} error={error.offer?true:false} value={offer}/>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Weight" onChange={(event)=>setWeight(event.target.value)} helperText={error.weight} onFocus={()=>handleError('weight',null)} error={error.weight?true:false} value={weight} />
        </Grid>
   
        <Grid item xs={4}>
        <FormControl fullWidth>
     <InputLabel id="demo-simple-select-label">type</InputLabel>
           <Select
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       value={type}
       label="type"
       onChange={(event)=>setType(event.target.value)}
       onFocus={()=>handleError('type',null)}  error={error.type?true:false} >
         <MenuItem value='kg' >kg</MenuItem>
         <MenuItem value='g' >g</MenuItem>
         <MenuItem value='ml' >ml</MenuItem>
       </Select>
       </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth variant="outlined" label="Stock" onChange={(event)=>setStock(event.target.value)} helperText={error.stock} onFocus={()=>handleError('stock',null)} error={error.stock?true:false} value={stock}/>
        </Grid>
        <Grid item xs={12}>
        <FormControl fullWidth>
     <InputLabel id="demo-simple-select-label">Status</InputLabel>
           <Select
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       value={status}
       label="status"
       onChange={(event)=>setStatus(event.target.value)}
       onFocus={()=>handleError('status',null)}  error={error.status?true:false} >
         <MenuItem selected>-select status-</MenuItem>
         <MenuItem value="trading">Trading</MenuItem>
         <MenuItem value="popular">Popular</MenuItem>
         <MenuItem value="Continue">Continue</MenuItem>
       </Select>
       </FormControl>
       <div className={classes.helptxt}>
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
         <Button onClick={handleSave}>Save</Button>
         <Button onClick={handleCancel}>Cancel</Button></>:<></>}
      </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={handleEdit}>Edit</Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained"onClick={handleDelete}>Delete</Button>
        </Grid>
           </Grid>
     
       </div>)
}
    return(<div>
    {showProductList()}
    {ProductListDialog()}
    </div>)

    
}