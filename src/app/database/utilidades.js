const md5 = require('md5');

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function makeCod() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const characters2 = '0123456789';

  const charactersLength = characters.length;
  const charactersLength2 = characters2.length;
  let counter = 0;

  while (counter < 7) {

    if(counter<2){
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }else{
      result += characters2.charAt(Math.floor(Math.random() * charactersLength2));
    }
    counter += 1;
  }
  return result;
}

function hashPassword(password) {

  const saltRounds = 10;
  var salt = makeid(5);
  var hash = password;

  for (let index = 0; index < saltRounds; index++) {
    hash = md5(hash+salt)  
  }

  return [salt, hash];
}

function hashPassword2(salt, password) {

  const saltRounds = 10;
  var hash = password;

  for (let index = 0; index < saltRounds; index++) {
    hash = md5(hash+salt)  
  }

  return hash;
}

function checkEmail(email) {
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    
    return 'Please enter a valid email';
  }else{
    return 'ok'
  }
}

module.exports = {
  makeid,
  makeCod,
  checkEmail,
  hashPassword,
  hashPassword2,
};