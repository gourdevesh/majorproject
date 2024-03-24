import {useState,useEffect} from "react";
import MaterialTable from "@material-table/core";
import { useStyle } from "./ProductlistCss";
import { getData, postData, serverURL} from "../services/FetchNodeServices";
import {Avatar, Grid, TextField, Button, IconButton,FormControl, Select, InputLabel, MenuItem} from "@mui/material";
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
export default function DisplayAllProductList(){
  const classes = useStyle()
  const [productListName, setproductListName]=useState("")
  const [productListId, setproductListId]=useState("")
  const [Description, setDescription]=useState("")
  const [productId, setproductId]=useState("")
  const [SubCategoryId, setsubcategoryId] = useState("")
  const [categoryId, setcategoryid] = useState("")
  const [rate, setRate]=useState("")
  const [offer, setOffer]=useState("")
  const [weight, setWeight]=useState("")
  const [stock, setStock]=useState("")
  const [categoryList, setCategoryList]=useState([])
  const [productList, setproductList]=useState([])
  const [listproductList, setlistproductList]=useState([])
  const [status, setStatus] = useState("") 
  const [picture, setPicture] = useState({ file: "Assets/purchase.gif", bytes: "" })
  const [error, setError]=useState({})
  const[oldIcon,setOldIcon]=useState('')
  const [SubcategoryList, setsubcategoryList]=useState([])
  const [open,setOpen]=useState(false)
  const [btnStatus,setbtnStatus]=useState(false)
    
   /* Fill category */ 
   useEffect(function(){
    fetchAllCategory()
  },[])
  const fetchAllCategory=async()=>{
    var result=await getData("category/category_list")
    setCategoryList(result.data)
  }

  const fetchAllSubcategory=async(cid)=>{
    var result=await postData("subcategory/subcategorylist_by_categoryid",{categoryid:cid})
    setsubcategoryList(result.data)
  }
  const handleCategoryChange=(event)=>{
    setcategoryid(event.target.value)
    fetchAllSubcategory(event.target.value)
  }
  
  const fetchAllProduct=async(subid)=>{
    var result=await postData("product/product_list_by_subcategoryid",{subcategoryid:subid})
    setproductList(result.data)
  }
  const handleSubcategoryChange=(event)=>{
    setsubcategoryId(event.target.value)
    fetchAllProduct(event.target.value)
  }
  const handleProductChange=(event)=>{
    setproductId(event.target.value)
    fetchListProductList(event.target.value)
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
    return productList.map((item)=>{
    return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    
    })
  }
   ////////////////////////
    const handlePicture = (event) => {
      setPicture({ file: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
      handleError("picture",null)
      setbtnStatus(true)
    }
    const handleCancle=()=>{
      setPicture({file:`${serverURL}/images/${oldIcon}`, bytes:""})
      }
    const handleError=(input,value)=>{
      setError(prev=>({...prev,[input]:value}))
      setbtnStatus(false)
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
      /*if(!picture.bytes)
      {
        handleError("picture","Plz Select picture for Product List")
        isValid=false
      }*/
      return(isValid)
    }
    const handleEditData=async()=>{
      setOpen(false)
      if(validation())
      {
         var body={productlistid:productListId, productlistname:productListName, productid:productId, categoryid:categoryId, subcategoryid:SubCategoryId, description:Description, rate:rate, offer:offer, weight:weight, stock:stock, status:status}
         var result=await postData("ProductList/productlist_edit_data", body)
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
   
    fetchListProductList()
    } 
    const fetchListProductList=async()=>{
      var result=await getData("productList/list_product_list")
      setlistproductList(result.data)
    }

    function ShowProductList() {
        return (
          <MaterialTable
          title="List of Product List"
          columns={[ 
              {title:"Category", field:"categoryname",
              render:rowData=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>
            },
          
          {title:"Product", field:"productname",
          render:rowData=><div><div>{rowData.productname}</div><div>{rowData.productlistname}</div></div>
        },
          
          {title:"Description", field:"description"},
          {title:"rate", field:"Rate/Offer",
          render:rowData=><div><div><s>{rowData.rate}</s></div><div>{rowData.offer}</div></div> },
          
          {title:"Weight", field:"weight"},
          {title:"Stock/Status", field:"stock",
          render:rowData=><div><div>{rowData.stock}</div><div>{rowData.status}</div></div> }
        
          ,{title:"Picture", field:"picture", 
          render:rowData=><Avatar src={`${serverURL}/images/${rowData.picture}`} style={{width:75}} variant="rounded"/>}
          ]}
          data={listproductList}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Product',
              onClick: (event, rowData) => handleOpen(rowData)
            }
          ]}
        />
      )
    }
    const handleEditIcon=async()=>{
      setbtnStatus(false)
      setOpen(false)
      var formData=new FormData()
      formData.append("productid", productId)
      formData.append("categoryid", categoryId)
      formData.append("subcategoryid",SubCategoryId)
      formData.append("productlistid",productListId)
      formData.append("picture",picture.bytes)
    var result=await postData("ProductList/productlist_edit_picture", formData)
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
    
     fetchListProductList()  
  }
  const handleDelete=async()=>{
    setOpen(false)
    if(validation())
    {
       var body={productlistid:productListId}
       var result=await postData("ProductList/productlist_delete", body)
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
  fetchListProductList()
  }
const showListProductListForm=()=>{
return<div className={{width: "55vw",
height: "auto",
padding: 10,
background: "#fff59d",
borderRadius: 10}}>
     <Grid container spacing={3}>
    <Grid item xs={12}>
    <Grid marginLeft={65}>  
    <IconButton onClick={handleClose}><CloseIcon color="error"/></IconButton></Grid>
     <div className={classes.headingStyle}>
      Edit/Delete Product List
     </div>
    </Grid>
    <Grid item xs={6}>
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
        <Grid item xs={6}>
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
        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productId}
              label="Products"
              
              onChange={handleProductChange}
              onFocus={()=>handleError("productid", null)}
              error={error.productId?true:false}
            >
              <MenuItem>Select Product</MenuItem>
              {fillProduct()}
              </Select>
              </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField value={productListName} error={error.productlistname?true:false} helperText={error.productlistname} onFocus={()=>handleError("productlistname", null)} onChange={(event) => { setproductListName(event.target.value) }} label="Product List Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField value={Description} error={error.description?true:false} helperText={error.description} onFocus={()=>handleError("description", null)} onChange={(event) => { setDescription(event.target.value) }} label="Description" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField value={rate} error={error.rate?true:false} helperText={error.rate} onFocus={()=>handleError("rate", null)} onChange={(event) => { setRate(event.target.value) }} label="Enter Rate" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField value={offer} error={error.offer?true:false} helperText={error.offer} onFocus={()=>handleError("offer", null)} onChange={(event) => { setOffer(event.target.value) }} label="Enter Offer Price" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField value={weight} error={error.weight?true:false} helperText={error.weight} onFocus={()=>handleError("weight", null)} onChange={(event) => { setWeight(event.target.value) }} label="Enter Weight" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField value={stock} error={error.stock?true:false} helperText={error.stock} onFocus={()=>handleError("stock", null)} onChange={(event) => { setStock(event.target.value) }} label="Enter Stock" variant="outlined" fullWidth />
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


      <Grid item xs={4}>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input onChange={handlePicture} hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        <div className={classes.errorText}>{error.picture}</div>
      </Grid >
      <Grid item xs={4}>
        <Avatar
          alt="Icon"
          src={picture.file}
          style={{ width: 56, height: 56 }}
          variant="rounded"
        />
      </Grid>
      
      <Grid item xs={4}>
      {btnStatus?<>
      <Button onClick={handleEditIcon}>Save</Button>
       <Button onClick={handleCancle}>Cancle</Button></>:<></>}
       </Grid>
      <Grid item xs={6}>
        <Button onClick={handleEditData} variant="contained" fullWidth>Edit</Button>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={handleDelete} variant="contained" fullWidth>Delete</Button>
      </Grid>
    </Grid>

  </div>

}
useEffect(function(){
  fetchListProductList()
    },[])


    const handleClose=()=>{
      setOpen(false)
    }
    const handleOpen=(rowData)=>{ 
      setproductId(rowData.productid)
      setproductListId(rowData.productlistid)
      fetchAllSubcategory(rowData.categoryid)
      fetchAllProduct(rowData.subcategoryid)
      setsubcategoryId(rowData.subcategoryid)
      setcategoryid(rowData.categoryid)
      setproductListName(rowData.productlistname)
      setDescription(rowData.description)
      setRate(rowData.rate)
      setOffer(rowData.offer)
      setStock(rowData.stock)
      setWeight(rowData.weight)
      setStatus(rowData.status)
      setPicture({file:`${serverURL}/images/${rowData.picture}`, bytes:""})
      setOldIcon(rowData.picture)
      setOpen(true)
    }
    const DisplayProductListDialog=()=>{
      return(
        <Dialog
        open={open}
        onClose={handleClose}
        >
         
            <DialogContent>
            {showListProductListForm()}
            </DialogContent>
            <DialogActions>
            </DialogActions>
          
        </Dialog>
      )
    }
    return(<div className={classes.displaycontainer}>
      <div className={classes.displaybox}>

   {ShowProductList()}
    </div>
    
    {DisplayProductListDialog()}
    </div>)
}  