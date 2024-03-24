import React from "react";
import CategoryInterface from "./assets/categories/CategoryInterface";
import { Routes,BrowserRouter as Router, Route } from "react-router-dom";

import DashboardInterface from "./assets/adminlogin/DashbordInterface";
import AdminLoginInterface from "./assets/adminlogin/AdminLoginInterface";
import Home from "./userinterface/screen/Home";
import CategoryViewProduct from "./userinterface/screen/CategoryViewProduct";
import CategoryListComponent from "./userinterface/component/CategoryListComponent";
import ProductDetails from "./userinterface/screen/ProductDetails";
import Cart from "./userinterface/screen/Cart";
import MakePayment from "./userinterface/screen/MakePayment";
 function App()
 { 
  return(
    <div>
      <Router>
        <Routes>
         
          <Route element={<AdminLoginInterface/>} path="/adminlogin"/>
          <Route element={<DashboardInterface/>} path="/dashboard/*"/>
         <Route element={<Home/>} path="/home"/>
         <Route element={<CategoryViewProduct/>} path="/categoryviewproduct"/>
         <Route element={<CategoryListComponent/>} path="/CategoryListComponent"/>
         <Route element={<ProductDetails/>} path="/productdetails" />
         <Route element={<Cart/>} path="/cart" />
         <Route element={<CategoryInterface/>} path="/CategoryInterface" />
         <Route element={<MakePayment/>} path="/makepayment" />

        </Routes>
      </Router>
    
      
    </div>
  )

 }
 export default App;