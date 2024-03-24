import { Grid,Paper,Button } from "@mui/material";
import CartItem from "../component/Cart/CartItem";
import Header from "../component/Header";
import CartPartner from "../component/Cart/CartPartner";
import CartCoupen from "../component/Cart/CartCoupen";
import CartAddress from "../component/Cart/CartAddress";
import {useSelector} from "react-redux";
import DeliveryPartner from "../component/Cart/DeliverySafty";
import { useState } from "react";
import { FlareSharp } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function Cart()
{
    const[refresh,setRefresh]=useState(false)
    const cart=useSelector((state)=>state.products)
    const CartData=Object.values(cart)
    const [btnTitle,setBtnTitle]=useState("go")
    const [userAdddress,setUserAdddress]=useState([])
    const PageRefresh=()=>
    {
        setRefresh(!refresh)
    }
    const theme = useTheme();
    const matches=useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md=useMediaQuery(theme.breakpoints.down('md'));
  const lg= useMediaQuery(theme.breakpoints.down('lg'));

    return(<div>
        <div>
            <Header/>
        </div>
        
        <Grid container spacing={2} style={{justifyContent:'center'}}>
            <Grid item xs={12}>
                <div style={{marginTop:90,marginLeft:80,marginRight:80,marginBottom:20}}>
          <Paper elevation={2} style={{height:50}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:15}}>
            <div style={{alignItems:'center',marginTop:'1.5%'}}>
                Cart ({CartData.length}) Item
            </div>

            <div style={{width:'100px',height:'60px',alignItems:'center',marginTop:'0.6%'}}>
                <Button variant='outlined'>Empty</Button>
            </div>
            </div>
          </Paper>
          </div>

            </Grid>
       <Grid item xs={sm?12:md?11:5}>
        <div>
        <CartItem  cartdata={CartData}  PageRefresh={PageRefresh}/>
         </div>
         <div>      
        <CartPartner/>
        </div>
        <div>
<DeliveryPartner/>
        </div>
        </Grid>
        <Grid item xs={sm?12:md?11:5}>
            <div>           <CartCoupen cartdata={CartData}/>
  </div>
  <div>      
           <CartAddress  PageRefresh={PageRefresh}  btnTitle={btnTitle} setBtnTitle={setBtnTitle}  userAdddress={userAdddress} setUserAdddress={setUserAdddress} />
     </div>
        </Grid>
        </Grid>

        
    </div>)
}