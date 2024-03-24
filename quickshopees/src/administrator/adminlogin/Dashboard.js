 
import {useState} from 'react'
import { AppBar,Toolbar,Grid,Paper,Avatar } from '@mui/material'
import {serverURL} from "../services/FetchNodeServices"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { Routes,Route } from 'react-router-dom';
import CategoryInterface from "../categories/CategoryInterface"; 
import DisplayAllCategory from "../categories/DisplayAllCategory";
import SubCategoryInterface from "../subcategories/SubCategoryInterface"
import DisplayAllSubcategory from "../subcategories/DisplayAllSubcategory"
import ProductInterface from "../products/ProductInterface"
import BannersInterface from "../banners/BannersInterface";
import DisplayAllProducts from "../products/DisplayAllProducts";
import ProductListInterface from '../productlist/ProductlistInterface'
import DisplayAllProductList from "../productlist/DisplayProductlist";
import ProductPictures from "../productpicture/ProductPictures"
import { useNavigate } from 'react-router-dom';
export default function Dashboard(){
  var admin=JSON.parse(localStorage.getItem("ADMIN"))
   const navigate=useNavigate()
    return(<div>
     <AppBar style={{background:'#fff'}}>
        <Toolbar>
            <div style={{color:'#000',fontFamily:'Poppins',letterSpacing:1,fontWeight:'bold',fontSize:24 }}>
                QuickShopee
            </div>
        </Toolbar>
       
     </AppBar>
     
     <div style={{marginTop:'5%'}}>
     <Grid container spacing={3}>
        <Grid item xs={2}>
         <Paper style={{display:'flex',flexDirection:'column',margin:5,padding:5,marginBottom:10}}>
            <Paper elevation={3} style={{background:'#bdc3c7',flexDirection:'column', display:'flex',alignItems:'center',justifyContent:'center', width:200,padding:10,marginBottom:10}}>
             
             <Avatar src={`${serverURL}/images/alice.jpg`} style={{width:70,height:70,paddingBottom:5}} />
             <div style={{fontFamily:'Poppins',fontWeight:'bold',paddingBottom:5}}>
             {admin.adminname}
             </div>
              
             <div style={{fontSize:12,fontFamily:'Poppins',fontWeight:'bold',paddingBottom:5}}>
              {admin.emailid}
             </div>
             
            </Paper>
            <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Category</span>} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Sub Category</span>} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Product</span>} />
            </ListItemButton>
          </ListItem>
      
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Product List</span>} />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Product Picture</span>} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Banner</span>} />
            </ListItemButton>
          </ListItem>
          
          
          <Divider/>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Logout</span>} />
            </ListItemButton>
          </ListItem>
      

        </List>


         </Paper>
        </Grid>
        <Grid item xs={10}>

         {/* DashBoard Routes */}
    <Routes>
    <Route element={<CategoryInterface/>} path="/categoryinterface"/>
        <Route element={<DisplayAllCategory/>} path="/displayallcategory"/>
        <Route element={<SubCategoryInterface/>} path="/subcategoryinterface"/> 
        <Route element={<DisplayAllSubcategory/>} path="/displayallsubcategory"/>  
        <Route element={<ProductInterface/>} path="/productinterface"/>
        <Route element={<DisplayAllProducts/>} path="/displayallproducts"/>
        <Route element={<BannersInterface/>} path="/bannersinterface"/>  
       
        <Route element={<ProductListInterface/>} path="/productlistinterface"/>  
        <Route element={<DisplayAllProductList/>} path="/displayproductlist"/>  
        <Route element={<ProductPictures/>} path="/productpictures"/>  

    </Routes>



        </Grid>

       </Grid>
      </div>

    
    </div>)


}