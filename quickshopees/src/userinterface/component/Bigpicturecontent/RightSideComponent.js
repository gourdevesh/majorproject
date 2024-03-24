import { Box } from "@mui/material"
import { postData } from "../../../assets/services/FetchNodeService"
import { useEffect,useState } from "react"

import PlusMinusComponent from "../Bigpicturecontent/PlusMinusComponent.js"
import {useDispatch,useSelector} from "react-redux"

export default function RightSideComponent({fetch,product,refreshpage})
{ 
    // const[value,setValue]=useState(0)
    var dispatch=useDispatch()
    const[content,setContent]=useState([])
    const[selectProduct,setSelectProduct]=useState(product)
    const cart=useSelector((state)=>state.products)
    const cartItem= Object.values(cart)
  
    const SearchInCart=()=>
    {
       var searchproduct=cartItem.filter((item)=>{
         return item.productlistid == product.productlistid
       })
       console.log("seass:",searchproduct)
       
       if(searchproduct?.length!=0)
       setSelectProduct(searchproduct[0])
    //    {console.log("45454:",searchproduct)}

       else{
        product['qty']=0
        setSelectProduct(product)
       }
       
    }
    useEffect(()=>
    {
        SearchInCart()
    },[])

    const FetchAllProductByProductid=async(productid)=>
    {
        var result= await postData('userinterface/fetchall_productby_productid',{productid:product.productid})
        setContent(result.data)
    }

    useEffect(function(){
        FetchAllProductByProductid()
    },[])

    

    const handleClick=(item,i)=>
    {     
       var currentProduct=item
       var searchProduct=cartItem.filter((itemm)=>{
        return itemm.productlistid==currentProduct.productlistid

       })
       if(searchProduct?.length!=0)
       {
       setSelectProduct(searchProduct[0])
       }
       else 
       {
       fetch(item.picture)
    //    console.log(item.picure)
          item['qty']=0
        setSelectProduct(item)
       }
         console.log("ghjjhf",selectProduct)
    }


    
   
    const ShowContent=()=>{
        return content.map((item,i)=>
        {
            return <div style={{width:'20%',height:'70%',display:'flex',justifyContent:'space-between'}}>
        
            <div onClick={()=>handleClick(item)} style={{cursor:'pointer',width:150,height:70,border:item.productlistid==selectProduct.productlistid?'3px solid #07a1ff':'2px solid #07a1ff',display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center',margin:10,borderRadius:20}}>
                <div style={{background:'#74b9ff',borderBottomRightRadius:10,borderBottomLeftRadius:10,marginTop:-18,width:70,alignItems:'center',display:'flex',justifyContent:'centre'}}>
                    <div style={{display:'flex',justifyContent:'center',fontFamily:'poppins',fontSize:11,alignItems:'center',width:70}}>
                  {item.offer==0?<></>:<>{parseInt(((item.rate-item.offer)/item.rate)*100)} %off</>}
                </div>
                </div>

            <div style={{fontFamily:'poppins',fontSize:12,marginTop:5}}>
                {item.weight}
            </div>
            <div style={{fontFamily:'poppins',fontSize:12}}>
               {item.offer==0?<>&#8377;{item.rate}</>:<><s> &#8377;{item.rate}</s></>}
               {item.offer==0?<></>:<> &#8377;{item.offer}</>}

            </div>

           </div>
        </div>

     
        })
    }

    const handleQtyChange=(value)=>
    {
        var product=selectProduct
        if(value>=1){
        product['qty']=value
        dispatch({type:'Add_Product',payload:[product.productlistid,product]})
        }
        else
        {
        product['qty']= 0
            dispatch({type:'Delete_Product',payload:[product.productlistid,product]})
        }
        refreshpage()
    }

    return( <div>
    <div style={{marginLeft:25,fontFamily:'poppins',fontSize:16}}>
    Select Unit
     </div>
    <div style={{display:'flex',flexDirection:'row',marginLeft:10,marginTop:10}}>
       
       {ShowContent()}
       
    </div>

    <div style={{marginLeft:20,marginTop:20}}>
       <PlusMinusComponent qty={selectProduct?.qty} onChange={handleQtyChange} />
    </div>

    </div>)
}