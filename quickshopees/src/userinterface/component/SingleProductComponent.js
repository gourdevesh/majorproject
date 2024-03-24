import {Paper,Button} from '@mui/material';
import { serverURL } from '../../assets/services/FetchNodeService';
import { useNavigate } from 'react-router-dom';



export default function  SingleProductComponent(props)
{  const navigate=useNavigate()
    var item=props.item

    const handleNavigate=(item)=>
    {
        navigate(props.url,{state:{product:item}})
    }

    const showSingleProduct=()=>
    { 
        
            return (<div onClick={()=>handleNavigate(item)}>
                <Paper  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:10,width:200,height:240}}  variant="outlined" elevation={2}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:90}}>
             <img src={`${serverURL}/images/${item.picture}`} width={'80%'} />
             </div>

             <div style={{fontFamily:'poppins',fontWeight:'500',fontSize:14,textAlign:'center',width:'65%',paddingTop:10,fontFamily:'poppins'}}>{item.productlistname}</div>
             <div style={{width:180,padding:1,fontFamily:'poppins',fontSize:12}}>
             <div style={{paddingLeft:1}}>{item.weight}</div>
             <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex',flexDirection:'column'}}>
                   <div style={{paddingLeft:1}}>&#8377;<s>{item.rate}</s></div>
                   <div>&#8377; {item.offer}</div>
                </div>

                <div style={{paddingRight:1}}>
                    <Button variant="outlined">ADD</Button>
                </div>

             </div>
             </div>

                </Paper>
            </div>)
      

    }



    return(<div >
           {showSingleProduct()}
    </div>)
}