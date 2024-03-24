import {React,createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  ArrowBackIosNewIcon  from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos  from "@mui/icons-material/ArrowForwardIos"
import { serverURL } from "../../assets/services/FetchNodeService";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
export default  function BannerComponent(props)
{
    const theme = useTheme()
    const matches=useMediaQuery(theme.breakpoints.up('md'));
    var sliderRef=createRef()

    var Settings={
        dots:false,
        infinite:true,
        speed:1500,
        autoplay:true,
        autoplaySpeed:2500,
        SlidesToShow:1,
        slidesToscroll:1
    }
   
    const showImages=()=>
    {
        return props.images.map((item)=>{
            return(<div>
             <img src={`${serverURL}/images/${item}`} width={'100%'} />
            </div>) 
        })
    }
    const handleBackclick=()=>
    {
        sliderRef.current.slickPrev()
    }
    const handleForwardClick=()=>
    {
        sliderRef.current.slickNext()
    }

    return( <div style={{position:'relative'}}>
        {matches?<><div style={{position:'absolute',top:'40%',left:'1%',zIndex:1,background:'#fff',width:40,height:40,borderRadius:45,display:"flex",justifyContent:'center',alignItems:'center',opacity:1}}>
        <ArrowBackIosNewIcon style={{color:'black'}} onClick={handleBackclick} />
        </div></>:<></>}

        
            <Slider {...Settings} ref={sliderRef}>
              {showImages()}
            </Slider>

            {matches?<><div style={{position:'absolute',top:'40%',right:'1%',zIndex:1,background:'#fff',width:40,height:40,borderRadius:45,display:"flex",justifyContent:'center',alignItems:'center',opacity:1}}>
        <ArrowForwardIos style={{color:'black'}} onClick={handleForwardClick}  />
        </div></>:<></>}

            </div>)
}