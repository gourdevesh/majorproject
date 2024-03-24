var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')

router.post('/bannersubmit',upload.any(),function(req,res,next){
     console.log('Body',req.body)
     console.log('Files',req.files)
     var picture=''
     req.files.map((item)=>{
        picture+=item.filename+","
     })
     picture=picture.substring(0,picture.length-1)
     console.log(picture)
try{
    pool.query('insert into banners (banners,status) values(?,?)',[picture,req.body.status],function(error,result){
        if(error)
        {  
            return res.status(200).json({status:false,message:'server error'})
        }
        else{
            return res.status(200).json({status:true,message:'submit succesfull'})
        }
    })
}catch(e)
{
    return res.status(200).json({status:false,message:'server nor responding'})
}
      
})
module.exports=router