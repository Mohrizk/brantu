var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var BrantuEmails = {
    confirmation:"rizk@brantu.com"
}
// listen for token updates (if refreshToken is set)
// you probably want to store these to a db
var generator = xoauth2.createXOAuth2Generator({
    user: "rizk@brantu.com",
    clientId: "144499945264-cll1b6e0cblk785eo4t3ovueq2vqu9u7.apps.googleusercontent.com",
    clientSecret: "F5b5RXTYQDc0pchX9A1iZvyY",
    refreshToken: '1/WXHbZ-QDmMPuWEEXN406k_eL6D04kWNugAyWlwzxYak',
    accessToken: 'ya29.Ci8GA1gbELe5qtt5EcaLK7upccVBZhThneadY6uApMqT_f1RqZlfc5ibdGfVBN_bkA'
})

generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

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
            from: BrantuEmails.confirmation,
            to: userEmail,
            subject: "Välkommen till Brantu",
            generateTextFromHTML: true,
            html: "<b>Hej nya Shopaholic!</b>"+
                    "<p>Vad roligt att du har hittat till oss, och varmt välkommen som kund!<br/>Ditt användarnamn är din e-postadress som du behöver för att logga in på <a target='_blank' href='http//www.brantu.com'> BRANTU.COM.</a></p>"+
                    "<p>Om du har frågor kring något tveka inte på att höra av dig till vår <a href='mailto:support@brantu.com'>kundtjänst</a>.</p>"+
                    "<p style='padding-top: 30px;'>Blir du shoppingsugen? (Det blir vi) - Gå direkt till <a target='_blank' href='http//www.brantu.com'>BRANTU.COM.</a></p>"
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
    }
}