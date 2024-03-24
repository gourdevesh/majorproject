import { Paper,Grid,Button } from "@mui/material"
import { serverURL } from "../../../assets/services/FetchNodeService";
import PlusMinusComponent from "../Bigpicturecontent/PlusMinusComponent.js";
import {useDispatch,useSelector} from "react-redux"

export default function CartItem({cartdata,PageRefresh})
{
    const dispatch=useDispatch()
   
    // var cartcontent=[
    //     {id:1,image:'lays.png',weight:'100g',rate:'50',offer:45,name:'spicy lays  are very spicy to our child '},
    //     {id:1,image:'lays.png',weight:'100g',rate:'50',offer:45,name:'spicy lays  are very spicy to our child'}

    // ]



    const handleQtyChange=(selectProduct,value)=>
    {
        var product=selectProduct
        if(value>=1){
        product['qty']=value
        dispatch({type:'Add_Product',payload:[product.productlistid,product]})
        }
        else
        {
        product['qty']=0
            dispatch({type:'Delete_Product',payload:[product.productlistid,product]})
        }
        PageRefresh()
        
    }


    const showCartItem=()=>
    {
     return cartdata.map((item)=>{

        return  <Paper elevation={2} style={{borderRadius:15}} >
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
            <div style={{width:80,height:90,marginTop:20,borderRadius:15}}>
                <img src={`${serverURL}/images/${item.picture}`} width={'90%'}  />
            </div>

            <div style={{diaply:'flex',flexDirection:"column",fontFamily:'poppins',fontSize:14}}>
                <div style={{display:'flex',flexWrap:'wrap',fontSize:'poppins',fontSize:14}}>
                     {item.description}
                </div>
                <div>
                    &#8377;{item.rate}/{item.weight}
                </div>

                {item.offer>0?<div style={{marginTop:20,fontWeight:'bold'}}>
                     <s>&#8377;{item.rate*item.qty}</s> &#8377;{item.offer*item.qty}
                </div>:
                <div style={{marginTop:20,fontWeight:'bold'}}>
                &#8377;{item.rate*item.qty} 
              </div>}

            </div>
            <div style={{}}>
            <PlusMinusComponent qty={item?.qty} onChange={(value)=>handleQtyChange(item,value)}/>
            </div>
            </div>
        </Paper>
        
      
     
    })
}




    return(<div>
    <div >
       { showCartItem()}
</div>
    </div>)
}