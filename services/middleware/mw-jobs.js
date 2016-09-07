var Job  = require('../models/job');
var jobs = {
    getAll:function(req,res,next){
        Job.find({"valid":true}).lean().sort("department").exec(function(err, jobs){
           if(err) return next(err)
           res.locals.jobList = jobs;
           next()
       })
    },
    getJob:function(req, res,next){
        var splitted = req.params.name.split('-');
        var id = splitted[splitted.length-1]
        Job.findOne({_id:id}).lean().sort("department").exec(function(err, job){
            if(err) return next(err)
            console.log('TIME ', job.date.getDate() ,'/',job.date.getMonth(), '/' ,job.date.getFullYear()  )
            job.date = job.date.getDate() +'/'+job.date.getMonth() +'/' +job.date.getFullYear()
            res.locals.job = job;
            next()
        })
    }

}
module.exports = jobs