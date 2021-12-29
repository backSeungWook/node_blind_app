const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const Article = new Schema({
  author:{type:Schema.Types.ObjectId,ref:'User',required:true},
  title:{type:String,required:true},
  content:{type:String,required:true},
  createdAt:{type:Date,default:Date.now, required:true},
  board:{type:Schema.Types.ObjectId,ref:'Board',required:true},
  
  // 동적으로 변동될 수 있는 데이터
  viewCount:{type:Number,default:0},
  thumbupCount:{type:Number,default:0},
  commentCount:{type:Number,default:0},
  deleteTime:{type:Number,default:0},

  // {옵션}: 사용자가 게시글에 추가할 수 있는 데이터
  articleImgAddress:{type:String},
  mention:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
})

Article.plugin(AutoIncrement, {inc_field: 'key'}) //id(number)값을 자동으로 생성(즉 mysql - auto_increment)
module.exports = Article