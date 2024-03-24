var express=require('express')
var router=express.Router()
var pool=require('./pool')

router.post('/checkadmin',function(req,res,next){
    pool.query('select * from adminlogin where (emailid=? or mobileno=?)and password=?',[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
        if(error)
        {
            return res.status(500).json({status:false,message:'server error'})
        }
        else
        {   if(result.length==1)
            return res.status(200).json({status:true,data:result[0]})

            else
                return res.status(200).json({status:false,message:'invalid sigin'})
            
        }
    })
})




module.exports=router;