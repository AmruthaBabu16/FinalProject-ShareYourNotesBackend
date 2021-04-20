
//n accessing mongoose package
const mongoose=require('mongoose');
// database coonection
mongoose.connect('mongodb://localhost:27017/NoteDb',{useNewUrlParser:true});
// schema definition
const Schema=mongoose.Schema;
const NewNoteSchema=new Schema({
    TopicName:String,
    Preview:String,
    Details:String
});
// model creation
var Notedata=mongoose.model('note',NewNoteSchema);
module.exports=Notedata;