const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    "use strict";
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(`hash: ${hash}`);
        console.log(`salt: ${salt}`);
    });
});

let hashedPassword = '$2a$10$lnToIwY29z/3.7r5qq9apu/k7gG/qqUn3wVQOM8LgrVQVrLzIP8Ti';

bcrypt.compare(password, hashedPassword, (err, res) => {
    "use strict";
    console.log(res);
});

// let data = {
//     id: 10
// };
//
// let token = jwt.sign(data, '123abc');
// console.log(token);
//
// let decoded = jwt.verify(token, '123abc');
// console.info(decoded);
// let message = 'I am user number 3';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
// 	id: 4
// };

// let token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };


// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
// 	console.log('Data was not changed.');
// } else {
// 	console.log('Data was changed. Dont trust.');
// }

