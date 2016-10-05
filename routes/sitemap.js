//SITEMAP
var express     = require('express');
var router      = express.Router();
var sm = require('sitemap');


/********** Middleware******/
var categories = require('../services/middleware/mw-categories');
var brands = require('../services/middleware/mw-brands');
var products = require('../services/middleware/mw-products');
var newsletter = require('../services/middleware/mw-newsletter');
var session = require('../services/middleware/mw-session');
var feed = require('../services/middleware/mw-feed');
var email = require('../services/middleware/mw-email');


var shared = require('../public/javascripts/helper');

var static_sitemap = sm.createSitemap ({
 hostname: 'http://www.brantu.com',
 cacheTime: 600000,        // 600 sec - cache purge period
 urls: [
 { url: '/',  changefreq: 'weekly', priority: 1 },
 { url: '/kvinna/',  changefreq: 'weekly', priority: 1 },
 { url: '/man/',  changefreq: 'weekly',  priority: 1 },
 { url: '/signup/',  changefreq: 'monthly',  priority: 0.7 },
 { url: '/login/',  changefreq: 'monthly',  priority: 0.7 },
 { url: '/contact-us/',changefreq: 'monthly',  priority: 0.7 },
 { url: '/about-us/',  changefreq: 'monthly',  priority: 0.7 },
 { url: '/faq/',  changefreq: 'weekly',  priority: 0.5 },
 { url: '/privacy-policy/',  changefreq: 'monthly',  priority: 0.5 },
 { url: '/terms-and-conditions/',  changefreq: 'monthly',  priority: 0.5 },
 { url: '/cookie-policy/',  changefreq: 'monthly',  priority: 0.5 }
 ]
 });
var category_sitemap = sm.createSitemap ({
 hostname: 'http://www.brantu.com',
 cacheTime: 600000});
var blog_sitemap = sm.createSitemap ({
 hostname: 'http://www.brantu.com',
 cacheTime: 600000});

var routes = [
 [ '/static-sitemap.xml', 'get', [
  function(req, res, next) {
   static_sitemap.toXML( function (err, xml) {
     if (err) {return res.status(500).end();}
     res.header('Content-Type', 'application/xml');
     res.send( xml );
   });
  } ]],
 [ '/blog-sitemap.xml', 'get', [
  feed.getSitemapBlog,
  function(req, res, next) {
   for(var b in res.locals.feed){
    blog_sitemap.add({url: res.locals.feed[b].url , changefreq:'weekly', priority: 0.8});
   }
   blog_sitemap.toXML( function (err, xml) {
    if (err) {return res.status(500).end();}
    res.header('Content-Type', 'application/xml');
    res.send( xml );
   });
  } ]],
 [ '/category-sitemap.xml', 'get', [
  categories.getSitemapCategories,
  function(req, res, next) {
   for(var s in req.categoryList){
    category_sitemap.add({url: req.categoryList[s] , changefreq:'weekly', priority: 0.5});
   }
   category_sitemap.toXML( function (err, xml) {
    if (err) {
     return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send( xml );
   });
  } ]]
];

routes.forEach(function(arr){
 //console.log(arr[1]);
 router[arr[1]](arr[0], arr[2]);
});
module.exports = router;