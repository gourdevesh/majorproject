
import {React,createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  ArrowBackIosNewIcon  from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos  from "@mui/icons-material/ArrowForwardIos"
import { serverURL } from "../../assets/services/FetchNodeService";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";

export default  function CircleScrollComponent(props)
{   
    const navigate =useNavigate()
    const theme = useTheme();
    const matches=useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md=useMediaQuery(theme.breakpoints.down('md'));
  const lg= useMediaQuery(theme.breakpoints.down('lg'));

    var sliderRef=createRef()

    var Settings={
        dots:false,
        infinite:false,
        speed:400,
        slidesToShow:sm?3:md?3:lg?4:6                                                                                                                                                                                                                                                                                                                                                                                                                   ,
        slidesToscroll:1,
        autoplay:true,
        autoplaySpeed:2500,
    };
  
    var color=['#27ae60','#fab1a0','#dfe6e9','#ffeaa7','#a29bfe','#81ecec','#badc58','#7ed6df','#D980FA','#7d5fff','#18dcff']
    const showImages=()=>
    {
        return props.category.map((item)=>{
             return( <div  onClick={()=>handleRender(item)} style={{cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:2, width:sm?90:180,height:sm?90:180,borderRadius:sm?45:90,background:color[parseInt(Math.random()*(color.length-1))]}}>
                <img src={`${serverURL}/images/${item.icon}`} width={'80%'} />
               </div>
               <div style={{textAlign:'center',fontFamily:'Poppins',fontSize:sm?10:14,fontWeight:700,width:sm?90:180,margin:5}}>{item.categoryname}</div>
             </div>) 
        })
    }
    const handleRender=(item)=>
    {
        navigate('/categoryviewproduct',{state:{category:item.categoryid}})
    }

    const handleBackclick=()=>
    {
        sliderRef.current.slickPrev()
    }
    const handleForwardClick=()=>
    {
        sliderRef.current.slickNext()
    }

    return( <div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'3%'}}>
        <div style={{fontFamily:'poppins',fontSize:md?'12px':'18px',fontWeight:'bold'}}>
           {props.title}
        </div>
        <div style={{display:"flex",flexDirection:'row',fontSize:lg?18:21,width:'8%'}}>
          {matches?<><div>
          <ArrowBackIosNewIcon style={{color:'black'}} onClick={handleBackclick} />
          </div></>:<></>}

            {matches?<><div>
        <ArrowForwardIos style={{color:'black'}} onClick={handleForwardClick}  />
        </div></>:<></>}
        </div>
        </div>

        
            <Slider {...Settings} ref={sliderRef}>
              {showImages()}
            </Slider>


            </div>)
}