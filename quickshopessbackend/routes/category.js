var express=require ('express')
var pool=require('./pool')
var upload=require('./multer')
var router=express.Router();

router.post('/categorysubmit' , upload.single('icon') ,function(req,res,next){

    try{
        pool.query("insert into category(categoryname,status,icon) values (?,?,?)",[req.body.categoryname,req.body.status,req.file.filename],function(error,result){
        if(error)
        {
            return res.status(200).json({status:false,message:'server error'})
        }
        else
        {
            return res.status(200).json({status:true,message:'submitted succesfully'})
        }
    })
}    catch(e)
           {
            return res.status(200).json({status:false,message:'server not respond pls contact website handler'})
               }
});

router.get('/categorylist',function(req,res,next){
    try{
    pool.query('select* from category',function(error,result){
        if(error)
        {
            return res.status(200).json({status:false,data:[]})
        }
        else
        {
            return res.status(200).json({status:true,data:result})
        }
    })
    }  
    catch(e)
    {
        return res.status(200).json({status:false,data:[]})
    }

});

router.post('/categoryupdate' ,function(req,res,next){

    try{
        pool.query("update category set categoryname=?,status=? where categoryid=? ",[req.body.categoryname,req.body.status,req.body.categoryid],function(error,result){
        if(error)
        {
            return res.status(200).json({status:false,message:'server error'})
        }
        else
        {
            return res.status(200).json({status:true,message:'editted succesfully'})
        }
    })
}    catch(e)
           {
            return res.status(200).json({status:false,message:'server not respond pls contact website handler'})
               }
});

router.post('/categoryicon' , upload.single('icon') ,function(req,res,next){

    try{
        pool.query("update  category set icon=? where categoryid=?",[req.file.filename,req.body.categoryid],function(error,result){
        if(error)
        {
            return res.status(200).json({status:false,message:'server error'})
        }
        else
        {
            return res.status(200).json({status:true,message:'icon edited succesfully'})
        }
    })
}    catch(e)
           {
            return res.status(200).json({status:false,message:'server not respond pls contact website handler'})
               }
});

router.post('/categorydelete' ,function(req,res,next){

    try{
        pool.query("delete from  category where categoryid=?",[req.body.categoryid],function(error,result){
        if(error)
        {
            return res.status(200).json({status:false,message:'server error'})
        }
        else
        {
            return res.status(200).json({status:true,message:'deleted succesfully'})
        }
    })
}    catch(e)
           {
            return res.status(200).json({status:false,message:'server not respond pls contact website handler'})
               }
});







module.exports=router;