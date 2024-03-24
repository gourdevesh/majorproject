import { useCallback,useEffect } from "react";
import useRazorpay from "react-razorpay";
import { serverURL } from "../../assets/services/FetchNodeService";
import { useSelector,useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function MakePayment() {
  const Razorpay = useRazorpay();
  const navigate=useNavigate()
  const dispatch=useDispatch()
    var user=useSelector((state)=>state.user)
    var userdata=Object.values(user)
    console.log("USERDATAAA",userdata)
    const products = useSelector((state) => state.products);
    const productList=Object.values(products)
    let total= productList.reduce((a,b) => {
        return  a+b.offer*b.qty;
      },0);
     
  const handlePayment=()=> {
       const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: total*100,
      currency: "INR",
      name: "Quick Shopee",
      description: "Test Transaction",
      image: `http://${serverURL}/images/logo.jpg`,
    
      handler: (res) => {
        console.log(res);
       
       // dispatch({type:'CLEAR_CART',payload:[]})
        navigate("/home")
        

      },
      prefill: {
        name: userdata[0].username,
        email: "youremail@example.com",
        contact: userdata[0].mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }
useEffect(function(){
var timeout=setTimeout(handlePayment,1000)

},[])

  return (
    <div className="App">
     
    </div>
  );
}


