import Header from "../component/Header"
import Footer from "../component/Footer"
import SliderPicture from "../component/Bigpicturecontent/SliderPicture"
import { Grid, Paper } from "@mui/material"
import DetailComponent from "../component/Bigpicturecontent/DetailComponent"
import RightSideComponent from "../component/Bigpicturecontent/RightSideComponent"
import ProductContent from "../component/Bigpicturecontent/ProductContent"
import WhyShop from "../component/Bigpicturecontent/whyShop"
import { useLocation,useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import { serverURL,postData } from "../../assets/services/FetchNodeService"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function ProductDetails({props})
{
    const[productId,setProductId]=useState('')
    const[refresh,setRefresh]=useState(false)
   const[getPicture,setPicture]=useState([])
    const[productlistId,setProductListId]=useState('')
    const location=useLocation()
    const navigate=useNavigate()
    // console.log("location:",location.state.category)
    var product=location.state.product
    

   const RefreshPage=()=>
   {
    setRefresh(!refresh)
   }

   const theme = useTheme();
   const matches=useMediaQuery(theme.breakpoints.up('md'));
 const sm = useMediaQuery(theme.breakpoints.down('sm'));
 const md=useMediaQuery(theme.breakpoints.down('md'));
 const lg= useMediaQuery(theme.breakpoints.down('lg'));

//    const fetchallpicture=async()=>
//    {
//  var result=await postData('userinterface/fetchall_multiplepicture_byproductlistid',{productlistid:product.productlistid})
//      var pic=result.data[0].picture.split(",")
//      console.log("pppppppppp",pic)
//        setPicture(pic)
//     //    setImage(`${serverURL}/images/${pic[0]}`)
   
//     //    console.log("ppp:",image)
//    }

//    useEffect(function(){
//     fetchallpicture()
//  },[])
 
 const FetchId=(picture)=>
 {
    console.log("iiiiidddd:",picture)
    setProductListId(picture)
 }

   

  

    return(<div>
        <div>
          <Header/>
        </div>
         
         <div style={{marginTop:40}}>
        <Grid container spacing={2}>
            <Grid item xs={sm?12:md?11:6}>
                
                   
                <div style={{marginLeft:100}}>
                <SliderPicture picture={productlistId}   product={product} />
                
                </div>

                <div>
                    <DetailComponent/>
                </div>

            </Grid>

            <Grid item xs={sm?12:md?11:6}>
                <Paper elevation={1} style={{height:180}}>
                <div  style={{marginTop:90,marginLeft:50}}>
                    <ProductContent product={product} />
                </div>
          </Paper>
          <Paper  variant="outlined" style={{height:250}}>
            <div style={{marginTop:10}}>
               <RightSideComponent product={product} fetch={FetchId}  refreshpage={RefreshPage}/>
                </div>
            </Paper>

            <Paper>
                <div>
                    <WhyShop/>
                </div>
            </Paper>
            </Grid>

        </Grid>
        </div>
          <div>
          <Footer/>
          </div>
    </div>)
}
