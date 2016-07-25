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
        email:"granstrom@brantu.com"
    }
}

var generator = xoauth2.createXOAuth2Generator({
    user: BrantuEmails.granstrom.email,
    clientId: "144499945264-cll1b6e0cblk785eo4t3ovueq2vqu9u7.apps.googleusercontent.com",
    clientSecret: "F5b5RXTYQDc0pchX9A1iZvyY",
    refreshToken: '1/chTJ8pYfD3ExkrFeVAatUz96ABbVKgFM1OgOvDpVnXI',
    accessToken: 'ya29.Ci8rA3nnoO-AQ8VwIdjggRx3Whsn3v-u1-ug0Uh7gAcwcRIdQyGXKwobUBUIUEZY3A'
});

//refreshToken: "1/WXHbZ-QDmMPuWEEXN406k_eL6D04kWNugAyWlwzxYak"
module.exports = {
    sendSignupConfirmation: function(userEmail, callback){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                xoauth2: generator
            }
        });
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
                '<img src="http://www.brantu.com/images/newsletter/welcomebrantumail.jpg" width="600" height="1067" alt="">'+
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
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                xoauth2: generator
            }
        });

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