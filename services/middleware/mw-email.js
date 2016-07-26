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
            refreshToken: "1/sQJHYoA7lIzZ-kRgyTtu26CQNKTSD63DgzFemB7GnVk",
            accessToken: 'ya29.Ci8sAxtCGkw26hybClcoVb6HRd94izdjdzXBlC4N8PlOT-3lH1Hgj_WBOYGvdOSeYw'

        })
    },
    noReply:{
        email:"no-replay@brantu.com",
        getToken: xoauth2.createXOAuth2Generator({
            user: "no-replay@brantu.com",
            clientId: "144499945264-cll1b6e0cblk785eo4t3ovueq2vqu9u7.apps.googleusercontent.com",
            clientSecret: "F5b5RXTYQDc0pchX9A1iZvyY",
            refreshToken: '1/fuCdrH2_SzCb__NePslGgpjrNh2fmdaTvPbGJXgfKYY',
            accessToken: 'ya29.Ci8sAwPv92xcdfuPzvgr84YqNB4frgDT1ydLxKeEjt5N1HXqHBhOHRfaLBzf2zNm7A'

        })
    }
}



var generatorRizk    = BrantuEmails.rizk.getToken;
var generatorFredrik = BrantuEmails.granstrom.getToken;
var generatorNoReply = BrantuEmails.noReply.getToken;

//refreshToken: "1/WXHbZ-QDmMPuWEEXN406k_eL6D04kWNugAyWlwzxYak"
module.exports = {
    sendSignupConfirmation: function(userEmail, callback){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                xoauth2: generatorFredrik
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
                '</html>'
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
                xoauth2: generatorNoReply
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
    sendTokenLink:function(userEmail, link, callback){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                xoauth2: generatorRizk
            }
        });
        var mailOptions = {
            from: BrantuEmails.noReply.email,
            to: userEmail,
            subject: "Reset Password",
            text:'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            link + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
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