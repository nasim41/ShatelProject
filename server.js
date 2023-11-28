const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const Admin = require('./models/admin');
var ObjectId = require('mongoose').Types.ObjectId;



app.use(express.urlencoded({ extended: false}));
app.use(express.json({}));
app.use(cors({
    origin : ['http://localhost:3005'  , 'https://nasim2.iran.liara.run'] ,
}));

mongoose.connect('mongodb://root:gRLShHltOwZ5oT7rZZQUX5Vd@polly.iran.liara.ir:34561/my-app?authSource=admin', {
    authSource : 'admin'
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("connect to db successfull");
});



app.post('/login' , async(req , res)=>{
    try{

        let email = req.body.email;
        let password = req.body.password;

        let admin = await Admin.findOne({email , password});
        if(admin){
            return res.json({
                status: 'success' ,
                data : admin
            });
        }else{
            return res.json({
                msg: 'کاربری با این مشخصات یافت نشد',                
                status: 'error'
            });
        }
    

    }catch(err){
        console.log(err)
        res.json({
            msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                
            status: 'error'
        })
    }
});

app.post('/new' , async(req , res)=>{
    try{

        let email = req.body.email;

        let user = await User.findOne({email});

        if(user){
            return res.json({
                msg: 'کاربر تکراری است',                   
                status: 'error'
            });
        }


        let newUser= new User({
            email
        });
        let newUserRes = await newUser.save({});

        if(newUserRes){
            return res.json({
                status: 'success' , 
                data : newUserRes
            });
        }else{
            return res.json({
                msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                   
                status: 'error'
            });
        }
    

    }catch(err){
        console.log(err)
        res.json({
            msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                
            status: 'error'
        })
    }
});


app.post('/new/file' , async(req , res)=>{
    try{

        let emails = req.body.users;

        let newEmails = emails.map(item=>{
            return{
                email : item[0]
            }
        });

        insertManyRes = await User.insertMany(newEmails);

        if(insertManyRes){
            return res.json({
                status: 'success' , 
            });
        }else{
            return res.json({
                msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                   
                status: 'error'
            });
        }
    

    }catch(err){
        console.log(err)
        res.json({
            msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                
            status: 'error'
        })
    }
});


app.put('/user/:id' , async(req , res)=>{
    try{

        let id = req.params.id ;
        email = req.body.email;

        if(! ObjectId.isValid(id)){
            return  res.json({
                msg: 'ایدی معتبر وارد کنید',                
                status: 'error'
            })
        }


        let editUserResc = await User.findByIdAndUpdate(id, {$set : { 
            email : email
            
        }});


        if(editUserResc){
            return res.json({
                data: {
                    editUserResc,
                },
                status: 'success'
            });

        }else{
            return res.json({
                msg: 'کاربری یافت نشد' ,
                status: 'success'
            });
        }

    }catch(err){
        console.log(err)
        res.json({
            msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                
            status: 'error'
        })
    }
});

app.get('/users' , async(req , res)=>{
    try{

        let users = await User.find({} , 'email' , {sort: { createdAt: -1 }});
        console.log(users)
        return res.json({
            data: {
                users,
            },
            status: 'success'
        });

    }catch(err){
        console.log(err)
        res.json({
            msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                
            status: 'error'
        })
    }
});


app.get('/users/:id' , async(req , res)=>{
    try{

        let id = req.params.id ;

        if(! ObjectId.isValid(id)){
            return  res.json({
                msg: 'ایدی معتبر وارد کنید',                
                status: 'error'
            })
        }

        let user = await User.findOne({_id : id} , 'email' , {sort: { createdAt: -1 }});
        console.log(user);

        if(user){
            return res.json({
                data: {
                    user,
                },
                status: 'success'
            });

        }else{
            return res.json({
                msg: 'کاربری یافت نشد' ,
                status: 'success'
            });
        }

    }catch(err){
        console.log(err)
        res.json({
            msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                
            status: 'error'
        })
    }
});

app.delete('/users/:id' , async(req , res)=>{
    try{

        let id = req.params.id ;

        if(! ObjectId.isValid(id)){
            return  res.json({
                msg: 'ایدی معتبر وارد کنید',                
                status: 'error'
            })
        }

        let userRemoveRes =  await User.findByIdAndDelete(id);

        if(userRemoveRes){
            res.json({
                data: userRemoveRes ,
                status: 'success'
            })

        }else{
            res.json({
                msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                
                status: 'error'
            })

        }

    }catch(err){
        console.log(err)
        res.json({
            msg: 'مشکلی پیش آمده است بعدا تلاش کنید',                
            status: 'error'
        })
    }
});


app.listen(5000, () => {
    console.log(`server is runnig on 5000`);
});


