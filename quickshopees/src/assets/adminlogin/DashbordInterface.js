import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Paper,Grid, Avatar } from '@mui/material';
import {serverURL} from "../services/FetchNodeService"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'; 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { Routes,Route }  from "react-router-dom";

import CategoryInterface from "../categories/CategoryInterface";
import DisplayAllCategory from "../categories/DisplayAllCategory";
import SubCategoryInterface from "../subcategories/SubCategoryInterface";
import DisplayAllSubCategory from "../subcategories/DisplayAllSubCategory";
import ProductInterface from "../products/ProductInterface";
import DisplayAllProduct from "../products/DisplayAllProduct";
import BannerInterface from "../Banners/BannerInterface";
import ProductListInterface from "../productlist/ProductListInterface";
import DisplayAllProductList from "../productlist/DisplayAllProductList";
import ProductPictureInterface from "../productpicture/ProductPictureInterface";
import {  useNavigate } from 'react-router-dom';
export default function DashboardInterface()
{
  const navigate=useNavigate('')
  var admin=JSON.parse(localStorage.getItem("Admin"))
    return(<div>
        <AppBar  style={{background:'#fff'}}>
        <Toolbar>
          <div style={{color:'black',fontSize:19,fontWeight:'bold'}}>
            Quickshopee
          </div> 
        </Toolbar>
      </AppBar>
      <div style={{marginTop:'5%'}} >

      <Grid container spacing={2}>

        <Grid item xs={2}>
          <Paper elevation={2} style={{width:210,display:'flex',flexDirection:'column',margin:9,padding:5,marginBottom:10}} >
          
        <Paper elevation={2} style={{background:'#bdc3c7',width:190,paddingTop:8,paddingBottom:10,paddingLeft:15,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Avatar src={`${serverURL}/images/pp.png`} style={{width:90,height:70}} /> 
          
          <div style={{fontSize:18,fontFamily:'cursive'}}>
          {admin.adminname}
          </div>
          <div style={{fontSize:18,fontFamily:'monospace'}}>
          {admin.emailid}
          </div>
          <div style={{fontSize:18,fontFamily:'monospace'}}>
          {admin.mobileno}
          </div>


        </Paper>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/categoryinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'monospace',fontSize:17}}>category</span>} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/subcategoryinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'monospace',fontSize:16}}>sub category</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/productinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'monospace',fontSize:17}}>product</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/productlistinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'monospace',fontSize:17}}>productlist</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/bannerinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'monospace',fontSize:17}}>banner</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/productpictureinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'monospace',fontSize:17}}>productpicture</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'monospace',fontSize:17}}>Logout</span>} />
            </ListItemButton>
          </ListItem>
          </List>
        </Paper>

        </Grid>
        
      <Grid item xs={10}>
         <Routes>
          <Route element={<CategoryInterface/>} path="/categoryinterface"/>
          <Route element={<DisplayAllCategory/>} path="/displayallcategory"/>
          <Route element={<SubCategoryInterface/>} path="/subcategoryinterface"/>
          <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory"/>
          <Route element={<ProductInterface/>} path="/ProductInterface"/>
          <Route element={<DisplayAllProduct/>} path="/displayallproduct" />
         <Route element={<ProductListInterface/>} path="/productlistinterface"/>
          <Route element={<DisplayAllProductList/>} path="/displayallproductlist"/>
          <Route element={<BannerInterface/>} path="/bannerinterface"/>
          <Route element={<ProductPictureInterface/>} path="/productpictureinterface"/>
      
          </Routes>
      </Grid>

      </Grid>

      </div>
    </div>)
}