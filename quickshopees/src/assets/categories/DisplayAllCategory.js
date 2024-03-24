import MaterialTable from "@material-table/core"
import { useState,useEffect } from "react"
import { Avatar,TextField,Grid,MenuItem,Select,FormControl,InputLabel,IconButton } from "@mui/material"
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useStyle } from "./CategoryCss"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {  useNavigate } from 'react-router-dom';

import { postData,getData, serverURL } from "../services/FetchNodeService"
import Swal from "sweetalert2";

 
export default function DisplayAllCategory()
{
  const navigate=useNavigate('')
    const[categoryList,setCategoryList]=useState([])
    const[open,setOpen]=useState(false)
    const[categoryName,setCategoryName]=useState('')
    const[status,setStatus]=useState('')
    const[icon,setIcon]=useState({file:'',bytes:''})
    const[oldicon,setOldIcon]=useState()
    const[categoryid,setCategoryId]=useState('')
    const[btnState,setBtnState]=useState(false)
    const[error,setError]=useState('')




    const FetchCategoryList=async()=>
    {
        var result=await getData('category/categorylist')
        setCategoryList(result.data)
    }
     useEffect (function(){
        FetchCategoryList()
     },[])
     
    
    function ShowCategory() {
        return (
          <MaterialTable style={{margin:50}}
            title="Display All Category"
            columns={[
                {title:'categoryid',field:'categoryid'},
                {title:'categoryname',field:'categoryname'},
                {title:'status',field:'status'},
                {title:'icon',field:'icon',
                         render:rowData=><Avatar src={`${serverURL}/images/${rowData.icon}`}style={{width:40}} variant="circular" />}
                
            ]}
            data={categoryList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Save User',
                onClick: (event, rowData) => handleOPen(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/categoryinterface')
              }
            ]}
          />
        )
      }
      const handleOPen=(rowData)=>
      { //alert(JSON.stringify(rowData))
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setStatus(rowData.status)
        setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
        setOldIcon(rowData.icon)
        setOpen(true)

      }
      const handleCancel=()=>
      {
        setIcon({file:`${serverURL}/images/${oldicon}`,bytes:''})
        setBtnState(false)
      }
      const handleClose=()=>
      {
        setOpen(false)

      }
      const CategoryDialog=()=>{
       
       return(<div>    
          <Dialog
       open={open}
       onClose={handleClose}>
        
        <DialogContent>
          
          {DisplayContentBox()}

        </DialogContent>
 
        
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>

      </Dialog>

      </div>)


      }
     

     const handlePicture=(event)=>
     {
         setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
         setBtnState(true)
     }
     const handleError=(input,value)=>
     {
         setError((prev)=>({...prev,[input]:value}))
     }
     const checking=()=>
     {
         var isValid=true
         if(!categoryName)
         {
             handleError('categoryName','pls fill input')
             isValid=false
         }
         if(!status)
         {
             handleError('status','pls fill status')
             isValid=false
         }
        //  if(!icon.bytes)
        //  {
        //      handleError('icon','pls select image')
        //      isValid=false
        //  }
 
         return isValid
     }
     const handleClick=async()=>
     {  setOpen(false)
         if(checking())
         {
            var body={categoryid:categoryid,categoryname:categoryName,status:status}
             var result= await postData('category/categoryupdate',body)
         }
         if(result.status)
         {
             Swal.fire({
                 position: 'center',
                 icon: 'success',
                 title: result.message,
                 showConfirmButton: false,
                 timer: 1500
               })
               FetchCategoryList()
         }
     }
   

     const DisplayContentBox=()=>{
      const classes=useStyle()
      return(
      <div className={classes.formbox}>
          <Grid container spacing ={3}>
              <Grid item xs={6}>
                  <div className={classes.heading}>
                  Add category interface
                  </div>
              </Grid>
              <Grid item xs={12}>
              <TextField value={categoryName} onFocus={()=>handleError('categoryName',null)} error={error.categoryName?true:false} helperText={error.categoryName} onChange={(event)=>setCategoryName(event.target.value)}  variant="outlined" label='categoryname' fullWidth />
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">status</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={status}
      label="Status"
      onChange={(event)=>setStatus(event.target.value)}
      onFocus={()=>handleError('status',null)}  error={error.status?true:false} 
      
    >
      <MenuItem value='select status'>-select Status-</MenuItem>
      <MenuItem value='Popular'>Popular</MenuItem>
      <MenuItem value='Continue'>Continue</MenuItem>
    <MenuItem value='tranding'>Tranding</MenuItem>
      <MenuItem value='Dicontinue'>Discontinue</MenuItem>
    </Select>
  </FormControl>
  <div>
      {error.status}
  </div>
              </Grid>
              <Grid item xs={4}>
              <IconButton color="primary" aria-label="upload picture" component="label">
          <input onFocus={()=>handleError('icon',null)}  onChange={handlePicture} hidden accept="image/*" type="file" />
          <PhotoCamera />
             </IconButton>
             <div>
              {error.icon}
             </div>
           </Grid>
           <Grid item xs={4}>
           <Avatar
              alt="error"
             src={icon.file}
            style={{ width: 56, height: 56 }}
           />
           </Grid>
           <Grid item xs={4}>
            { btnState?<>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button></>:<></>}

           </Grid>
           <Grid item xs={6}>
              <Button onClick={handleClick} fullWidth variant="contained">Edit</Button>
           </Grid>
           <Grid item xs={6}>
              <Button  onClick={handleDelete}fullWidth variant="contained">Delete</Button>
           </Grid>
  
          </Grid>
          
      
      </div>)

     }
     const handleDelete=async()=>{
      setOpen(false)
      if(checking()){
      var body={
        categoryid:categoryid
      }
        var result= await postData('category/categorydelete',body)
    }
       
          if(result.status)
          {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: result.message,
                  showConfirmButton: false,
                  timer: 1500
                })
                FetchCategoryList()
        }
     
    }

     const handleSave=async()=>
     { setBtnState(false)
      setOpen(false)
       var formData=new FormData()
       formData.append('categoryid',categoryid)
       formData.append('icon',icon.bytes)
       var result =await postData('category/categoryicon',formData)
       if(result.status)
       {
           Swal.fire({
               position: 'center',
               icon: 'success',
               title: result.message,
               showConfirmButton: false,
               timer: 1500
             })
             FetchCategoryList()
       }
       }
     
      return(
      <div className="classes.listbox">
        {ShowCategory()}
        {CategoryDialog()}
     </div>)
      
}
