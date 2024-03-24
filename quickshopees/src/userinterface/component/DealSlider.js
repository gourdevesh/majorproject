import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React,{createRef} from "react";
import Slider from "react-slick";
import { serverURL } from "../../assets/services/FetchNodeService";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { useStyles } from "./DealSliderCSS";
export default function DealSlider(){

  const theme = useTheme();
      const sm = useMediaQuery(theme.breakpoints.down('sm'));
      const md = useMediaQuery(theme.breakpoints.down('md'));

      var classes=useStyles()

    var settings = {
        dots:false,
        infinite: true,
        speed: 500,
        slidesToShow:sm?3:4,
        slidesToScroll: 1,
        autoplay:false,
        autoplayspeed: 3000,
        arrows:false
          };

  
      var images=['deal1.webp','deal2.webp','deal3.webp','deal4.webp','deal5.webp','deal6.webp']
      function playImages()
      {
        return images.map((item)=>{
            return(<div><img src={`${serverURL}/images/${item}`} className={classes.imageStyle} /> </div>)
        })
      }

      var slider=createRef()
     
      function handleLeftClick(){
        slider.current.slickPrev()
      }

      function handleRightClick(){
        slider.current.slickNext()
      }

      

    return(
       
      <div className={classes.position}>
           
           {!md?<><div className={classes.leftarrow}>
            <KeyboardArrowLeftIcon onClick={handleLeftClick} className={classes.arrowSize}/>
            </div>

            <Slider ref={slider} {...settings}>
                   {playImages()}
            </Slider>
         
            <div className={classes.rightarrow}>
         <KeyboardArrowRightIcon onClick={handleRightClick} className={classes.arrowSize}/>
         </div></>
        
        :<><Slider ref={slider} {...settings}> {playImages()}</Slider></>}
         
         </div>
           
        
    )
}