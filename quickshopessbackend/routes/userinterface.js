var express=require ('express')
var router = express.Router()
var pool= require('./pool')
var upload=require('./multer')

router.get('/fetchallbanner',function(req,res,next){
    try{
    pool.query('select * from banners ',function(error,result){
        if(error){
            console.log(error)
            return res.status(200).json({status:false,data:[]})
        }
        else{
           
            return res.status(200).json({status:true,data:result[0]})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
});

router.get('/fetch_footer_category',function(req,res,next){
    try{
    pool.query('select * from category',function(error,result){
        if(error){
            console.log(error)
            return res.status(200).json({status:false,data:[]})
        }
        else{
            
            return res.status(200).json({status:true,data:result})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
});

router.post('/fetch_all_category',function(req,res,next){
    try{
    pool.query('select * from category where status=?',[req.body.status],function(error,result){
        if(error){
            console.log(error)
            return res.status(200).json({status:false,data:[]})
        }
        else{
            
            return res.status(200).json({status:true,data:result})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
});

router.post('/fetch_product_bysubcategory',function(req,res,next){
    try{
    pool.query('select PL.* from productlist PL where PL.subcategoryid in (select subcategoryid from subcategory where subcategoryname=?)',[req.body.subcategoryname],function(error,result){

        if(error){
            
            return res.status(200).json({status:false,data:[]})
        }
        else{
            
            return res.status(200).json({status:true,data:result})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
})

router.post('/fetch_all_subcategory_bycategoryid',function(req,res,next){
    try{
    pool.query('select * from subcategory where categoryid=?',[req.body.categoryid],function(error,result){

        if(error){
           
            return res.status(200).json({status:false,data:[]})
        }
        else{
            
            return res.status(200).json({status:true,data:result})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
});

router.post('/fetchproducts_bysubcategory',function(req,res,next){
    try{
    pool.query('select PL.* from productlist PL where PL.subcategoryid=?',[req.body.subcategoryid],function(error,result){

        if(error){
            
            return res.status(200).json({status:false,data:[]})
        }
        else{
            
            return res.status(200).json({status:true,data:result})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
})

router.post('/fetchproducts_bycategory',function(req,res,next){
    try{
    pool.query('select PL.* from productlist PL where PL.categoryid=?',[req.body.categoryid],function(error,result){

        if(error){
          
            return res.status(200).json({status:false,data:[]})
        }
        else{
           
            return res.status(200).json({status:true,data:result})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
})

router.post('/fetchall_productby_productid',function(req,res,next){
    try{
    pool.query('select PL.* from productlist PL where PL.productid=?',[req.body.productid],function(error,result){

        if(error){
            
            return res.status(200).json({status:false,data:[]})
        }
        else{
            
            return res.status(200).json({status:true,data:result})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
})

router.post('/fetchall_multiplepicture_byproductlistid',function(req,res,next){
    try{
    pool.query('select * from productpictures  where productlistid=?',[req.body.productlistid],function(error,result){

        if(error){
            
            return res.status(200).json({status:false,data:[]})
        }
        else{console.log(result)
            return res.status(200).json({status:true,data:result})
        }
    })
}catch(e){
    return res.status(200).json({status:false,data:[]})
}
})


router.post('/check_mobileno',function(req,res,next){
    try{
        pool.query('select * from usersinfo where mobileno=?',[req.body.mobileno],function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,data:[]})
            }
            else
            {  
                if(result.length==0)
                    return res.status(200).json({status:false,data:[]})
                
                else
                    return res.status(200).json({status:true,data:result})
                
            }
        })
    }
    catch(e)
    {
        return res. status(200).json({status:false,data:[]})
    }
})

router.post('/check_address_by_mobileno',function(req,res,next){
    try{
        pool.query('select * from useraddress where mobileno=?',[req.body.mobileno],function(error,result){
            if(error)
            {
                return res.status(200).json({status:false,data:[]})
            }
            else
            {  
                if(result.length==0)
                    return res.status(200).json({status:false,data:[]})
                
                else
                    return res.status(200).json({status:true,data:result})
                
            }
        })
    }
    catch(e)
    {
        return res. status(200).json({status:false,data:[]})
    }
})

router.post('/add_adress',function(req,res,next){
    try{
    pool.query('insert into usersinfo(emailid,mobileno)values(?,?)',[req.body.email,req.body.mobileno],function(error,result){
        if(error)
        {   
            console.log(error)
            return res.status(200).json({status:false,message:'error'})
        }
        else
        {
            
            pool.query('insert into  useraddress (emailid, mobileno, addressone, addresstwo, city, pincode, username, addressstatus)values(?,?,?,?,?,?,?,?)',[req.body.email,req.body.mobileno,req.body.addressone,req.body.addresstwo,req.body.city,req.body.pincode,req.body.name,req.body.deliveryarea],function(error,result){
                if(error)
                {  
                    console.log(error)
                    return res.status(200).json({status:false,message:'error'})
                }
                else
                {
                    console.log(result)
                    return res.status(200).json({status:true,message:'submit'})
                }
            })
        }
    })
} catch(e)
{
    return res.status(200).json({status:false,message:'error'})
}
})
module.exports=router