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

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

function scroll(element){   
  var ele = document.getElementById(element);   
  window.scrollTo(ele.offsetLeft,ele.offsetTop); 
}

async function sendEmail(email, codigo) {

  var mensagem = "Obrigado pela compra! Aqui está uma cópia do seu código :"+codigo;

  const response = await fetch("https://localhost/send_email.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      subject: "Sua Compra",
      message: mensagem,
    }),
  });

  const result = await response.json();
  console.log(result.message);
}

function cpfMask(value) {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

function alterarCpf (value, setCpf) {
  value = cpfMask(value)
  setCpf(value)
}

module.exports = {
  makeid,
  makeCod,
  checkEmail,
  hashPassword,
  hashPassword2,
  getAllUrlParams,
  scroll,
  sendEmail,
  cpfMask,
  alterarCpf
};