const express= require('express');
const app= express();
const path= require('path');
const BookModel =require("./models/user");
const multer= require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    return cb(null,"./public/Data");
  },
  
  filename: function (req, file, cb) {
    return cb(null,`${file.originalname}`)
    },
});
const upload= multer({storage});

app.set("view engine", "ejs" );
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/create',upload.fields([{name:'Bookimage',maxCount:1},{name:'BookPdf',maxCount:1}]),async (req,res,next)=>{
   let{Bookimage,BookName,AuthorsName,EshopPlatform,PrintLength,Publisher,PublicationDate,
    Language,BookPdf,Isbn10,Isbn13,Edition} = req.body;
  let createdBook= await BookModel.create({ 
      Bookimage: req.files?.Bookimage?.[0]?.filename,
      BookPdf: req.files?.BookPdf?.[0]?.filename,
      BookName,
                AuthorsName,EshopPlatform,
                PrintLength,Publisher,
                PublicationDate,Language,
               Isbn10,Isbn13,Edition
    });
        res.redirect('/Own-Library');  
})

app.get('/Own-Library',async (req,res)=>{
    let allBookdetails= await BookModel.find();
    res.render("Library",{users:allBookdetails});
})

app.get('/edit/:BookId',async (req,res)=>{
   let user= await BookModel.findOne({_id:req.params.BookId});
    res.render("edit",{user});
})


app.post('/update/:BookId',async (req,res)=>{
    let{Bookimage,BookName,AuthorsName,EshopPlatform,PrintLength,Publisher,PublicationDate,
    Language,BookPdf,Isbn10,Isbn13,Edition} = req.body;
   let user= await BookModel.findOneAndUpdate({_id:req.params.BookId},{Bookimage,BookName,AuthorsName,EshopPlatform,PrintLength,Publisher,PublicationDate,
    Language,BookPdf,Isbn10,Isbn13,Edition},{name:true});
    res.redirect("/Own-Library" );
})


app.get('/delete/:id',async (req,res)=>{
   let allBookdetails= await BookModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/Own-Library");
})





app.listen(8080);