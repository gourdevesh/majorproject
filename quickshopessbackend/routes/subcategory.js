var express=require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/subcategorysubmit',upload.single('icon'),function(req,res,next){
    try{
        pool.query('insert into subcategory(categoryid,subcategoryname,status,icon) values(?,?,?,?)',[req.body.categoryid,req.body.subcategoryname,req.body.status,req.file.filename],function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,message:'server error'})
            }
            else
            {
                return res.status(200).json({status:true,message:'submit suceesful'})
            }     
        })
    }catch(e)
    {
       return res.status(200).json({status:false,message:'server not responding'})
    }
    
})

router.get('/subcategorylist',function(req,res,next){
    try{
        pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S ',function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,data:[]})
            }
            else
            {
                return res.status(200).json({status:true,data:result})
            }     
        })
    }catch(e)
    {
       return res.status(200).json({status:false,data:[]})
    }
    
});
router.post('/subcategorylist_by_categoryid',function(req,res,next){
    try{
        pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S where S.categoryid=?',[req.body.categoryid],function(error,result){


            if(error)
            {
                return res.status(200).json({status:false,data:[]})
            }
            else
            {
                return res.status(200).json({status:true,data:result})
            }     
        })
    }catch(e)
    {
       return res.status(200).json({status:false,data:[]})
    }
    
});

router.post('/subcategoryupdate',function(req,res,next){
    try{
    pool.query('update subcategory set categoryid=?,subcategoryname=?,status=? where subcategoryid=?',[req.body.categoryid,req.body.subcategoryname,req.body.status,req.body.subcategoryid],function(error,result){
        if(error)
        {
            return res.status(200).json({status:false,message:'server error'})
        }
        else
        {   console.log(result)
            return res.status(200).json({status:true,message:'edit succesfully'})
        }
    })
} catch(e)
{
    return res.status(200).json({status:false,message:'server not responding'})
}
});

router.post('/subcategoryicon' , upload.single('icon') ,function(req,res,next){

    try{
        pool.query("update  subcategory set icon=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
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

router.post('/subcategorydelete' ,function(req,res,next){

    try{
        pool.query("delete from  subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
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