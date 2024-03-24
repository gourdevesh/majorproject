var express=require ('express')
var pool=require('./pool')
var upload=require('./multer')
var router=express.Router();


router.post('/productlistsubmit',upload.single('picture'),function(req,res,next){
        try{
            pool.query("insert into productlist (productlistname, productid, categoryid, subcategoryid, description, rate, offer, weight, stock, status, picture) values(?,?,?,?,?,?,?,?,?,?,?)", [req.body.productlistname, req.body.productid, req.body.categoryid, req.body.subcategoryid, req.body.description, req.body.rate, req.body.offer, req.body.weight, req.body.stock, req.body.status, req.file.filename], function (error, result) {

                if(error)
                {  console.log(error)
                    return res.status(200).json({status:false,message:'server error'})
                }
                else{
                   
                    return res.status(200).json({status:true,message:'submiteddddd sucessfully'})
                }
            })   
        } 
        catch(e){
            
            return res.status(200).json({status:false,message:'server not respond'})
        }
    });

    router.get('/getproductlist',function(req,res,next){
        try{
        pool.query('select PL.*,(select C.categoryname from category C where C.categoryid=PL.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=PL.subcategoryid)as subcategoryname,(select P.productname from products P where P.productid=PL.productid) as productname  from productlist PL',function(error,result){
            if(error)
            {   console.log(error)
                return res.status(200).json({status:false,data:[]})
            }
            else{
                
                return res.status(200).json({status:true,data:result})
            }
        })
    }catch(e)
    {
        return res.status(200).json({status:false,data:[]})
    }
    });
    router.post('/getproductlist_by_productid',function(req,res,next){
        try{
        pool.query('select PL.*,(select C.categoryname from category C where C.categoryid=PL.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=PL.subcategoryid)as subcategoryname,(select P.productname from products P where P.productid=PL.productid) as productname  from productlist PL where PL.productid=?',[req.body.productid],function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,data:[]})
            }
            else{
                return res.status(200).json({status:true,data:result})
            }
        })
    }catch(e)
    {
        return res.status(200).json({status:false,data:[]})
    }
    });

    router.post('/productlistupdate',function(req,res,next){
        try{
        pool.query("update productlist set categoryid=?,subcategoryid=?,productid=?,productlistname=?,rate=?,offer=?,weight=?,stock=?,status=?,description=? where productlistid=?",[req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.productlistname,req.body.rate,req.body.offer,req.body.weight,req.body.stock,req.body.status,req.body.description,req.body.productlistid],function(error,result){
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
    router.post('/productlist_picture_update',upload.single('picture'),function(req,res,next){
        try{
        pool.query('update productlist set picture=? where productlistid=?',[req.file.filename,req.body.productlistid],function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,message:'server error'})
            }
            else
            {
                return res.status(200).json({status:true,message:'picture edit sucessfully'})
            }
        })
    }catch(e)
    {
        return res.status(200).json({status:false,message:'server not responding'})
    }
    });
    
    router.post('/productlist_delete',upload.single('picture'),function(req,res,next){
        try{
            pool.query('delete from productlist where productlistid=?',[req.body.productlistid],function(error,result){
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