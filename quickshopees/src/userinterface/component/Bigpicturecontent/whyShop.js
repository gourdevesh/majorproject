import { serverURL } from "../../../assets/services/FetchNodeService";

export default function WhyShop()
{
    return(<div>
        <div style={{display:'flex',flexDirection:'column',margin:5}}>
            <div style={{fontFamily:'poppins',fontWeight:'bold',fontSize:15,fontFamily:'poppins'}}>
                Why shop from Quickshopee
            </div>

            <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
                <div >
                   <img src={`${serverURL}/images/delivery.avif`} width={50} />
                </div>
             <div style={{display:'flex',flexDirection:'column',marginLeft:15,fontFamily:'poppins',fontWeight:'600'}}>
             <div style={{fontFamily:'poppins',fontSize:13}}>
             SuperFast delivery
             </div>

            <div style={{display:'flex',flexWrap:'wrap',fontWeight:'300',color:'darkslategray',fontFamily:'poppins',fontSize:13}}>
           Get your order delivered to your doorstep at the earliest from dark stores near you.
             </div>
                </div>
            </div>
        </div>

        <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
                <div >
                   <img src={`${serverURL}/images/offer.avif`} width={50} />
                </div>
             <div style={{display:'flex',flexDirection:'column',marginLeft:15,fontFamily:'poppins',fontWeight:600}}>

             <div style={{fontFamily:'poppins',fontSize:13}}>
             Best Prices & Offers
             </div>

            <div style={{display:'flex',flexWrap:'wrap',fontWeight:'300',color:'darkslategray',fontFamily:'poppins',fontSize:12}}>
            Best price destination with offers directly from the manufacturers.
             </div>
                </div>
            </div>

            <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
                <div >
                   <img src={`${serverURL}/images/wide.avif`} width={50} />
                </div>
             <div style={{display:'flex',flexDirection:'column',marginLeft:15,fontFamily:'poppins',fontWeight:600}}>

             <div style={{fontFamily:'poppins',fontSize:13}}>
             Wide Assortment
             </div>

            <div style={{display:'flex',flexWrap:'wrap',fontWeight:'300',color:'darkslategray',fontFamily:'poppins',fontSize:13}}>
            Choose from 5000+ products across food, personal care, household & other categories.
             </div>
                </div>
            </div>
        
        
    </div>)
}