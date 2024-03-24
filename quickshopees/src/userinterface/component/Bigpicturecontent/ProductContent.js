import ScheduleIcon from '@mui/icons-material/Schedule';




export default function ProductContent({product})
{
    return(<div>
        <div>
        {product.productlistname}
        </div>
        <div style={{fontFamily:'sans-serif',fontSize:20,fontWeight:'bold',marginTop:10}}>
            {product.productlistname}
        </div>

        <div style={{marginTop:10,display:'flex',flexDirection:'row',background:'#07a1ff',width:'15%',justifyContent:'center'}}>
            <div >
       <ScheduleIcon fontSize='5' />
       </div>
        <div style={{fontFamily:'poppins',fontWeight:'bold',marginLeft:5,fontSize:12,marginTop:1}}>
        {'10 Mins'}
        </div>
        </div>

        <div style={{marginTop:15,fontFamily:'poppins',fontWeight:"bold",color:'green',fontSize:20}}>
            View all by {'lays'}
        </div>

       
    </div>)
}