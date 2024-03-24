import {React,createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  ArrowBackIosNewIcon  from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos  from "@mui/icons-material/ArrowForwardIos"
import { postData, serverURL } from "../../../assets/services/FetchNodeService";
import { Paper } from "@mui/material";
import { useState,useEffect } from "react";


export default function SliderPicture({product,picture})
{
    //      console.log("fccccccc:",picture)
    const[image,setImage]=useState()
    const[getPicture,setPicture]=useState([])


    useEffect(()=>{
        setImage(`${serverURL}/images/${picture}`)
        // console.log("imahgevrhjsvf",image)
    },[picture])
    
    var sliderRef=createRef()

     var Settings = {
        dots:false,
        infinite: true,
        speed: 500,
        slidesToShow:5,
        slidesToScroll:1,
        autoplay: false,
        autoplaySpeed: 5000,
        };

        const fetchallpicture=async()=>
        {
      var result=await postData('userinterface/fetchall_multiplepicture_byproductlistid',{productlistid:product.productlistid})
          var pic=result.data[0].pictures.split(",")
            setPicture(pic)
            setImage(`${serverURL}/images/${pic[0]}`)
        
            console.log("pppxcccx:",image)
        }

        useEffect(function(){
           fetchallpicture()
        },[])

    // var images=[
    //     {id:1,image:'lays.png'},
    //     {id:2,image:'lays.png'},
    //     {id:3,image:'lays.png'},
    //     {id:4,image:'lays.png'},
    //     {id:5,image:'lays.png'},
    //     {id:6,image:'lays.png'},


    // ]
    const handlePicture=(item)=>
    {
        setImage(`${serverURL}/images/${item}`)
    }

    const ShowImage=()=>
    {
        return getPicture.map((item,)=>{
            return <div onClick={()=>handlePicture(item)}  >
               <div style={{display:'flex',justifyContent:'center'}}>            
    <Paper elevation={2} style={{background:'#fff',width:60,height:45,display:'flex',justifyContent:'center',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={`${serverURL}/images/${item}`} width={'70%'} height={'80%'} /></div>
            </Paper>
            </div>

         
            </div>
        })
    }
    const handleBack=()=>
    {
        sliderRef.current.slickPrev()
    }
    const handleNext=()=>
    {
        sliderRef.current.slickNext()
    }


    return(<div>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:75,marginBottom:45,marginRight:40}}>
        <img src={image} width={300} height={300}/>
  </div>

    <div style={{position:'relative',justifyContent:'center'}}>
        <div style={{position:'absolute',zIndex:1,background:'#fff',width:40,height:40,borderRadius:45,display:"flex",justifyContent:'center',alignItems:'center',opacity:1}}>
        <ArrowBackIosNewIcon onClick={handleBack}  />
        </div>
        <div style={{position:'absolute',right:'8%',zIndex:1,backgroundColor:'#fff',color:'black',borderRadius:45,justifyContent:'center',width:40,height:40,alignItems:'center',display:'flex',opacity:1}}>
        <ArrowForwardIos onClick={handleNext}  />
        </div>

        <div style={{width:'80%',margin:31}}>
  <Slider {...Settings} ref={sliderRef}>
   {ShowImage()}
  </Slider>
  </div>
  
    </div></div>)
}