import { Paper } from "@mui/material";
import { serverURL } from "../../../assets/services/FetchNodeService";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';




export default function CartCoupen({cartdata})
{
    var totaloffer=cartdata.reduce((p1,p2)=>{
        return p1+(p2.offer*p2.qty)
    },0)

    var totalamount=cartdata.reduce((p1,p2)=>{
        return p1+(p2.rate*p2.qty)
    },0)

    return(<div>
    <Paper elevation={2} style={{borderRadius:15}}>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <div style={{width:50,height:50,marginTop:25,justifyContent:'center',alignItems:'center'}}>
        <img src={`${serverURL}/images/discount.png`}  width={'70%'}/>
        </div>
        <div style={{fontFamily:'poppins',fontWeight:400,fontSize:14,alignItems:'center',marginTop:5}}>
            Available Offer/Coupen
        </div>
        <div style={{display:'flex',marginLeft:180,color:'red',marginTop:10}}>
        <PlayArrowIcon/>
        </div>
     </div>
     </Paper>




        {/* TOtal cart Item */}


        <div style={{marginTop:10}}>
            <Paper elevation={2} style={{borderRadius:15}}>
                <div style={{display:'flex',flexDirection:'column',fontFamily:'poppins',fontSize:14}}>

                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:10,fontFamily:'poppins',margin:12}}>
                        <div>
                           Item Total
                        </div>
                        <div>
                           <s> &#8377;{totalamount}</s>  &#8377;{totaloffer}

                        </div>
                    </div>


                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:10}}>
                        <div style={{fontFamily:'poopins',fontWeight:500,color:'darkcyan'}}>
                           Handling Charge(&#8377;10 Saved)!
                        </div>
                        <div>
                            &#8377;5
                            &#8377;45

                        </div>
                    </div>


                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:10}}>
                        <div style={{fontFamily:'poopins',fontWeight:500,color:'darkcyan'}}>
                           Delivery Fee(&#8377;35 Saved)!
                        </div>
                        <div>
                            &#8377;456
                            &#8377;456

                        </div>
                    </div>

                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:10}}>
                        <div>
                          To Pay
                        </div>
                        <div>
                            &#8377;{totalamount}
                            {/* &#8377;456 */}

                        </div>
                    </div>



                </div>
            </Paper>
        </div>
    </div>)
}