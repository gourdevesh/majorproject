import {React,createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  ArrowBackIosNewIcon  from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos  from "@mui/icons-material/ArrowForwardIos"
import { serverURL } from "../../assets/services/FetchNodeService";
import {Paper,Button} from '@mui/material';
import PlusMinusComponent from "./Bigpicturecontent/PlusMinusComponent.js";
import { useDispatch } from "react-redux";
import {useTheme,useMediaQuery} from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function ProductComponent(props)
{
    const theme=useTheme()
    const lg=useMediaQuery(theme.breakpoints.down('lg'))
    const md=useMediaQuery(theme.breakpoints.down('md'))
    const sm=useMediaQuery(theme.breakpoints.down('sm'))
    const navigate=useNavigate()
const dispatch = useDispatch()
    var sliderRef=createRef()

    var Settings={
        dots:false,
        infinite:true,
        speed:500,
        slidesToShow:sm?2:md?3:lg?4:6,
        slidesToscroll:1,
    };

    const showImages=()=>
    {
        return props.products.map((item)=>{
            return(<div style={{margin:2}}><Paper style={{paddingBottom:10,display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center',width:180,height:250}} variant="outlined" elevation={2} >
        <div onClick={()=>{handleDetial(item)}} style={{padding:2,display:'flex',justifyContent:'center',alignItems:'center',width:178}}>
         <img src={`${serverURL}/images/${item.picture}` } width='70%'/>
         </div>
         <div style={{fontFamily:'Poppins',fontSize:14,fontWeight:700,margin:5,textAlign:'center',width:180}}>{item.productlistname}</div>
         <div style={{ display:'flex',flexDirection:'column',width:178,fontFamily:'Poppins',padding:2}} >
            <div style={{paddingLeft:10,fontSize:12}}>{item.weight}</div>
            <div style={{ display:'flex',flexDirection:'row',justifyContent:'space-between'}}>   
            <div style={{ display:'flex',flexDirection:'column'}}>   
            <div style={{paddingLeft:10,fontSize:12}}>{item.offer==0?<>&#8377; {item.rate}</>:<s>&#8377; {item.rate}</s>}</div>
            <div style={{paddingLeft:10,fontSize:12}}>{item.offer==0?<></>:<>&#8377; {item.offer}</>}</div>
            </div>
            <div style={{paddingRight:10}}>
                <Button variant="outlined">Add</Button>
                {/* <PlusMinusComponent  /> */}
            </div>
            </div>
         
         </div>
      </Paper></div>)

    })
}

const handleDetial=(item)=>{
    navigate('/ProductDetails',{state:{product:item}})
} 


    const handleBackclick=()=>
    {
        sliderRef.current.slickPrev()
    }
    const handleForwardClick=()=>
    {
        sliderRef.current.slickNext()
    }
    
    return(<div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'3%'}}>
        <div style={{fontFamily:'poppins',fontSize:16,fontWeight:'bold',}}>
           {props.title}
        </div>
        <div style={{display:"flex",flexDirection:'row',fontSize:21,width:'8%'}}>
          <div>
          <ArrowBackIosNewIcon style={{color:'black'}} onClick={handleBackclick} />
          </div>

           <div>
        <ArrowForwardIos style={{color:'black'}} onClick={handleForwardClick}  />
        </div>
        </div>
        </div>

      <Slider {...Settings} ref={sliderRef}>
              {showImages()}
            </Slider>
    </div>)
}