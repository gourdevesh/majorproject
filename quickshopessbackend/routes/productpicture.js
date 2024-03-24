var express=require('express')
var router=express.Router()
var  pool=require('./pool')
var upload=require('./multer')

router.post('/productpicture_submit',upload.any(),function(req,res,next){
     console.log('Body',req.body)
     console.log('Files',req.files)
    
     var picture=''
     req.files.map((item)=>{
        picture+=item.filename+","
     })
     picture=picture.substring(0,picture.length-1)
     console.log(picture)
     try{
        pool.query('insert into productpictures(categoryid,subcategoryid,productid,productlistid,pictures) values(?,?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.productlistid,picture],function(error,result){
            if(error)
            {
                console.log(error)
                return res.status(200).json({status:false,message:'server error'})
            }
            else{
                return res.status(200).json({status:true,message:'submit sucessfully'})
            }
        })
     } 
     catch(e){
        return res.status(200).json({status:false,message:'server not responding'})
     }
     
     
})





module.exports=router;