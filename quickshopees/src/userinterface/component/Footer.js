import { Grid,Paper } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { serverURL,getData,postData } from "../../assets/services/FetchNodeService";
import { useEffect, useState } from "react";
import { useTheme,useMediaQuery } from "@mui/material";


export default function Footer(props)
{   
    const theme =useTheme()
    const md=useMediaQuery(theme.breakpoints.down('md'))
    const lg=useMediaQuery(theme.breakpoints.down('lg'))
    const sm=useMediaQuery(theme.breakpoints.down('sm'))

    const[footercategory,setFooterCategory]=useState([])

   

    const fetchFooterCategory=async()=>
    {
        var result=await getData('userinterface/fetch_footer_category')
        setFooterCategory(result.data)
    }

    useEffect(function(){
        fetchFooterCategory()
    },[])

    var links1=[
        {id:1,title:'Home'},
        {id:2,title:'Delivery Areas'},
        {id:3,title:'Carrers'},
        {id:4,title:'Customer Support'},
        {id:5,title:'Press'}, 
      ]
      var links2=[
        {id:6,title:'Privacy Policy'},
        {id:7,title:'Terms of Use'},
        {id:8,title:'Responsible Disclosure Policy'},
        {id:9,title:'More'},
      ]

    return(<div>
        <Paper elevation={2} variant="outlined" style={{width:'98vw',display:'flex',flexDirection:'column'}}>
        <div style={{marginLeft:30,fontFamily:'poppins',fontSize:20,fontWeight:'600'}}>
    
        </div>

        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'flex-start',padding:20}}>
            {
          footercategory.map((item)=>{
            return(<div style={{ width:'clamp(190px, 4.5vw, 700px)',
                height:'clamp(78px, 4.5vw, 80px)',fontFamily:'poppins',fontSize:14,fontWeight:'550'}}>
                {item.categoryname}
            </div>)
          })
        }
        </div>
         </Paper>

         <div style={{display:'flex',flexDirection:md?'column':'row',width:'100%',height:'auto',marginTop:30,fontFamily:'poppins',fontSize:14}}>
            <Grid container spacing={2}>
                <Grid item xs={sm?12:md?6:3}>
                    
                    <div style={{display:"flex",justifyContent:'center',fontSize:20,fontFamily:'poppins',fontWeight:'bold',color:'green'}}>
                        QuickShopee
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignSelf:'center',margin:20}}>
                       <InstagramIcon/>
                       <TwitterIcon/>
                       <FacebookIcon/>
                       <LinkedInIcon/>
                      </div>
                      <div style={{display:"flex",justifyContent:'center',fontSize:14,fontFamily:'poppins'}}>
                        @Quickshopee Pvt Ltd 
                      </div>
                   
                </Grid>
                <Grid item xs={sm?6:md?4:3}>
                   <div style={{display:'flex',fontFamily:'poppins',fontSize:14,display:'flex',flexDirection:'column'}}>
                    {
                        links1.map((item)=>{
                            return(<div style={{display:'flex',fontFamily:'poppins',padding:5}}>
                           {item.title}
                            </div>)
                        })
                    }
                   </div>
                </Grid>
                
                <Grid item xs={md?6:md?4:3}>
                     <div>
                       {
                        links2.map((item)=>{
                            return(<div style={{display:'flex',fontFamily:'poppins',padding:5}}>
                                {item.title}
                            </div>)
                        })
                       }
                     </div>
                </Grid>
                <Grid item xs={sm?12:md?6:3}>
                    <div style={{fontFamily:'poppins',fontWeight:'bold',fontSize:14}}>
                        Download Our App
                    </div >
                    <div style={{margin:5,display:'flex',flexDirection:'column'}}>

                    <div style={{border:'1px solid pink',display:'flex',flexDirection:md?'column':'row',justifyContent:'center',alignItems:'center',width:'100%'}}>
                        
                        <img src={`${serverURL}/images/playstore.png`} width={md?'5%':'8%'} height={md?'5%':'8%'}/>
                        
                        <div style={{marginLeft:20}}>
                        <p>Get it on playstore</p>
                       </div>
                       </div>

                       <div style={{border:'1px solid pink',display:'flex',flexDirection:md?'column':'row',justifyContent:'center',alignItems:'center',width:'100%',marginTop:10}}>
                        
                        <img src={`${serverURL}/images/apple.png`} width={md?'5%':'20%'} height={md?'5%':'8%'}/>
                        
                        <div style={{marginLeft:20}}>
                        <p>Get it on appstore</p>
                       </div>
                       </div>


                       
                       </div>


                </Grid>

            </Grid>
        </div>
        

        

       
            
        

        

    
     </div>)
}



