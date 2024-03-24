import BannerComponent from "../component/BannerComponent";
import Header from "../component/Header";
import CircleScrollComponent from "../component/CircleScrollComponent";
import ProductComponent from "../component/ProductComponent";
import Footer from "../component/Footer";
import { useState,useEffect } from "react";
import DealSlider from "../component/DealSlider";
import { getData,postData } from "../../assets/services/FetchNodeService";

export default function Home(props)
{
    const [banner,setBanner]=useState([])
    const[category,setCategory]=useState([])
    const[tranding,setTranding]=useState([])
    const[productMilk,setProductMilk]=useState([])
    const[snaks,setSnaks]=useState([])
    const[soft,setSoft]=useState([])
    const[fruits,setFruits]=useState([])

    const FetchAllBanner=async()=>
    {
         var result = await getData('userinterface/fetchallbanner')
         var images=result.data.banners.split(",")
         setBanner(images)    
    }
    const fetchallCategory=async(status)=>
    {
        var result = await postData('userinterface/fetch_all_category',{status:status})
        if(status=="Continue")
        setCategory(result.data)
        else if (status=="Trending")
        setTranding(result.data)
    }
    
    const fetchAllProduct=async(subcategoryname)=>
    {
      var result= await postData('userinterface/fetch_product_bysubcategory',{subcategoryname:subcategoryname})
      if(subcategoryname=='Milk Bread & Butter')
      setProductMilk(result.data)
      else if(subcategoryname=='Chips &  Crips')
      setSnaks(result.data)
      else if(subcategoryname=='Soft Drink')
      setSoft(result.data)
      else if(subcategoryname=='Fresh Fruits')
      setFruits(result.data)
    }
    const fetchAllProducts=async(subcategoryname)=>
    {
      var result= await postData('userinterface/fetch_product_bysubcategory',{subcategoryname:subcategoryname})
      setSnaks(result.data)
    }
     
    useEffect (function(){
        FetchAllBanner()
        fetchallCategory('Continue')
        fetchallCategory('Trending')
        fetchAllProduct('Milk Bread & Butter')
        fetchAllProduct('Chips &  Crips')
        fetchAllProduct('Soft Drink')    
        fetchAllProduct('Fresh Fruits')    
      
    },[])
    return(<div>
        <Header />
        <div style={{margin:'1.2%'}}>
         <div style={{width:'100%',marginTop:90}}>
        <BannerComponent images={banner}/>
        </div>   
        <div>
            <DealSlider/>
        </div>

        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
        <CircleScrollComponent category={category} title='continue category'/>
        </div>

        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
            <ProductComponent products={productMilk} title='Milk ,bread & butter'/>
        </div>

        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
        <CircleScrollComponent category={tranding} title='trending category'/>
        </div>
        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
            <ProductComponent products={snaks} title='Chips &  Crips'/>
        </div>
        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
            <ProductComponent products={soft} title='Soft Drink'/>
        </div>
        <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
            <ProductComponent products={fruits} title='Fresh Fruits'/>
        </div>
        <Footer />
        
        </div>
    </div>)
}