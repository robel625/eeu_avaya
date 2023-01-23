let users2 = [];
var socket1

function hi(users, socket) {
    console.log('Socketusers',users)
    users2 = users;
    socket1 = socket
  }
  
function bye() {
    return {users2 , socket1}
  }

module.exports = {hi , bye}


