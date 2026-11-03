const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Bookdetail");

const BookSchema= mongoose.Schema({
    Bookimage:String,
    BookName:String,
    AuthorsName:String,
    EshopPlatform:String,
    PrintLength:String,
    Publisher:String,
    PublicationDate:Date,
    Language:String,
    BookPdf:String,
    Isbn10:String,
    Isbn13:String,
    Edition:String

})

module.exports=mongoose.model('user',BookSchema);