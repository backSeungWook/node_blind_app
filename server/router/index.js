// article,user,company

const article = require('./article')
const user = require('./user')
const board = require('./board')
const company = require('./company')
const comment = require('./comment')
const reply = require('./reply')
const search = require('./search')


module.exports = {
  article,
  user,
  company,
  board,
  comment,
  reply,
  search
}

