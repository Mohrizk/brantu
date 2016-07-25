var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var fs = require('fs')
var BrantuEmails = {
    rizk:{
        email:"rizk@brantu.com",
        getToken: xoauth2.createXOAuth2Generator({
            user: "rizk@brantu.com",
            clientId: "144499945264-cll1b6e0cblk785eo4t3ovueq2vqu9u7.apps.googleusercontent.com",
            clientSecret: "F5b5RXTYQDc0pchX9A1iZvyY",
            refreshToken: '1/WXHbZ-QDmMPuWEEXN406k_eL6D04kWNugAyWlwzxYak',
            accessToken: 'ya29.Ci8GA1gbELe5qtt5EcaLK7upccVBZhThneadY6uApMqT_f1RqZlfc5ibdGfVBN_bkA'
        })
    },
    granstrom:{
        email:"granstrom@brantu.com",
        getToken: xoauth2.createXOAuth2Generator({
            user: "granstrom@brantu.com",
            clientId: "144499945264-cll1b6e0cblk785eo4t3ovueq2vqu9u7.apps.googleusercontent.com",
            clientSecret: "F5b5RXTYQDc0pchX9A1iZvyY",
            refreshToken: '1/aL-Y-2Nd-o4XHxQgBg-HfRXOfMMZClH-yWXzjqN75a0',
            accessToken: 'ya29.Ci8rAySrzLXagsBnZ9XrRZMxzzx-5bHtkK1PgiSZUqE9psCheaZ0NQbNMV1073RB2A'
        })
    }
}

// listen for token updates (if refreshToken is set)
// you probably want to store these to a db
var generator = BrantuEmails.granstrom.getToken;


// login
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
});
//refreshToken: "1/WXHbZ-QDmMPuWEEXN406k_eL6D04kWNugAyWlwzxYak"
module.exports = {
    sendSignupConfirmation: function(userEmail, callback){
        var mailOptions = {
            from: BrantuEmails.granstrom.email,
            to: userEmail,
            subject: "Välkommen till Brantu",
            generateTextFromHTML: true,
            html:'<html>'+
                '<head>'+
                '<title>Print</title>'+
                '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">'+
                '</head>'+
                '<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">'+
                '<img src="/images/newsletter/welcomebrantumail.jpg" width="600" height="1067" alt="">'+
                '</body>'+
                ' </html>'
        };

        transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
            }
            transporter.close();
            callback();
        });
    },
    sendNewsLetters:function(department,newsletter,callback){

        var mailOptions = {
            from: BrantuEmails.granstrom.email,
            to: 'rizk@brantu.com',
            subject: "Välkommen till Brantu",
            generateTextFromHTML: true,
            html:newsletter
        };

        transporter.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
            }
            transporter.close();
            callback(response);
        });

    },

}