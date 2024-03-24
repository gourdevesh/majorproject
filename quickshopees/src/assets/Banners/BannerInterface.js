import { Grid,Button } from "@mui/material"
import { useStyle } from "../Banners/BannerCss"
import { DropzoneArea } from "mui-file-dropzone"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from "react";
import { postData } from "../services/FetchNodeService";

export default function BannerInterface(){
    const[status,setStatus]=useState('')
    const[banner,setBanner]=useState('')
    

    const handleSubmit=async()=>
    {
        var formdata = new FormData()
        formdata.append('status',status)
        banner.map((item,index)=>{
            formdata.append('picture'+index,item)
        })
        var result=await postData('banner/bannersubmit',formdata)
        alert(result.message)
    }

    const classes=useStyle()
    return(<div className={classes.main}>
        <div className={classes.box}>
        <Grid container spacing={2}>
         <Grid item xs={12}>
            <div className={classes.heading}>
            Add Banners
            </div>
         </Grid>
         <Grid item xs={12}>
         <DropzoneArea
           acceptedFiles={['image/*']}
          filesLimit={6}
          dropzoneText={"Drag and drop an image here or click"}
         onChange={(files) => setBanner(files)}
         />
         </Grid>

         <Grid item xs={12}>
         <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="hide" control={<Radio onChange={(event)=>setStatus(event.target.value)}/>} label="hide" />
        <FormControlLabel value="show" control={<Radio onChange={(event)=>setStatus(event.target.value)} />} label="show" />
      </RadioGroup>
    </FormControl>
         </Grid>
         <Grid item xs={6}>
           <Button fullWidth variant="contained" onClick={handleSubmit} >Submit</Button>
         </Grid>

         <Grid item xs={6}>
           <Button fullWidth variant="contained" >Edit</Button>
         </Grid>

        </Grid>
        </div>
    </div>)
}