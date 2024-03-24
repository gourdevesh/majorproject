import CategoryListComponent from "../component/CategoryListComponent"

import Header from "../component/Header"
import Footer from "../component/Footer"
import { Grid } from "@mui/material"
import { postData } from "../../assets/services/FetchNodeService"
import { useEffect, useState } from "react"
import { useNavigate,useLocation } from "react-router-dom";
import SingleProductComponent from "../component/SingleProductComponent"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function CategoryViewProduct(props)
{             const navigate=useNavigate()
               const location=useLocation()
console.log("location:",location)
    const[subCategory,setSubCategory]=useState([])
    const[subCategoryId,setSubCategoryId]=useState('')
    const[subcategoryname,setSubCategoryName]=useState('')
    const[productList,setProductList]=useState([])

    const theme = useTheme();
    const matches=useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md=useMediaQuery(theme.breakpoints.down('md'));
  const lg= useMediaQuery(theme.breakpoints.down('lg'));
 
    const FetchallSubCategory=async()=>
    {
        var result = await postData('userinterface/fetch_all_subcategory_bycategoryid',{categoryid:location.state.category})
        setSubCategory(result.data)
        
    }
    const FetchallProduct=async(scid)=>
    { 
        var result = await postData('userinterface/fetchproducts_bysubcategory',{subcategoryid:scid})
        setProductList(result.data)
        // console.log("hhhhhhhhh:",result.data)
        
    }

    const FetchallProductbycategory=async(category)=>
    { 
        var result = await postData('userinterface/fetchproducts_bycategory',{categoryid:location.state.category})
        setProductList(result.data)
        // console.log("hhhhhhhhh:",result.data)
        
    }

    const getSubCategoryId=(scid,sname)=>
    { 
        setSubCategoryId(scid)
        setSubCategoryName(sname)
        FetchallProduct(scid)
    }

    useEffect(function(){
        FetchallSubCategory()
        FetchallProductbycategory()
    },[])

    const listofproduct=()=>
    {     
        return productList.map((item)=>{
          
            return <SingleProductComponent item={item} url={"/productdetails"}/>
        })
    }

    return(<div>
        <Header/>
        <div style={{marginTop:90}}>
   <Grid container spacing={2}>
   <Grid item xs={sm?5:md?3:2}>
      <CategoryListComponent data={subCategory} getSubCategoryId={getSubCategoryId}/>
    </Grid>

    <Grid item xs={sm?6:md?9:10}>
        <div style={{fontFamily:'poppins',fontWeight:"bold"}}>
            {subcategoryname} ({productList.length})items
        </div>
        <div style={{display:"flex",flexDirection:'row',flexWrap:'wrap'}}>
    {listofproduct()}
    </div>
    </Grid>

   </Grid>
   </div>

    <div style={{marginTop:50}}>
   <Footer/>
   </div>

    </div>)
}