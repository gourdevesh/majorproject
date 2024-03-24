var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')

router.post('/productsubmit',upload.single('picture'),function(req,res,next){
    try{
        pool.query('insert into products (categoryid,subcategoryid,productname,status,description,picture)value(?,?,?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.status,req.body.description,req.file.filename],function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,message:'server error'})
            }
            else{
                return res.status(200).json({status:true,message:'submit sucessfully'})
            }
        })   
    } catch(e){
        return res.status(200).json({status:false,message:'server not respond'})
    }
})
router.get('/productlist',function(req,res,next){
    try{
        pool.query('select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid)as subcategoryname from products P ',function(error,result){
            if(error)
            {  
                return res.status(200).json({status:true,data:[]})
            }
            else{
               
                return res.status(200).json({status:true,data:result})
            }
        })
    } catch(e){
        return res.status(200).json({status:false,data:[]})
    }
});
router.post('/productlist_by_subcategoryid',function(req,res,next){
    try{
        pool.query('select *,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid)as subcategoryname from products P where p.subcategoryid=?',[req.body.subcategoryid],function(error,result){
            if(error)
            {
                return res.status(200).json({status:true,data:[]})
            }
            else{
                return res.status(200).json({status:true,data:result})
            }
        })
    } catch(e){
        return res.status(200).json({status:false,data:[]})
    }
});
router.post('/productupdate',function(req,res,next){
    try{
    pool.query("update products set categoryid=?,subcategoryid=?,productname=?,status=?,description=? where productid=?",[req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.status,req.body.description,req.body.productid],function(error,result){
        if(error)
        {  
            return res.status(200).json({status:false,message:'server error'})
        }
        else
        {
            return res.status(200).json({status:true,message:'edit succesfully'})
        }
    })
} catch(e)
{
    return res.status(200).json({status:false,message:'server not responding'})
}
});
router.post('/product_picture_update',upload.single('picture'),function(req,res,next){
    try{
        pool.query('update products set picture=? where productid=?',[req.file.filename,req.body.productid],function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,message:'server error'})
            }
            else{
                return res.status(200).json({status:true,message:'picture edit sucessfully'})
            }
        })   
    } catch(e){
        return res.status(200).json({status:false,message:'server not respond'})
    }
})

router.post('/product_delete',upload.single('picture'),function(req,res,next){
    try{
        pool.query('delete from products where productid=?',[req.body.productid],function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,message:'server error'})
            }
            else{
                return res.status(200).json({status:true,message:'Delete sucessfully'})
            }
        })   
    } catch(e){
        return res.status(200).json({status:false,message:'server not respond'})
    }
})

module.exports=router;