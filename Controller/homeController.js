const cityModel = require("../Models/cityModel");
const donorModel = require("../Models/donorModel");
const stateModel = require("../Models/stateModel");
const moment = require('moment');
const requesterModel = require("../Models/requesterModel");

class HomeController{

   static dashboard= async (req,res)=>{
       var donor = await donorModel.find({}).countDocuments()
       var request = await requesterModel.find({}).countDocuments()
       var no_of_state = await stateModel.find({}).countDocuments()
      var data = []
       for (let i = 0; i < no_of_state; i++) {
        var state = await stateModel.find({})
        var no_of_donor = await donorModel.find({state_id:state[i]._id}).countDocuments();
        var no_of_request = await requesterModel.find({state_id:state[i]._id}).countDocuments();
        console.log(state[i].name);
            data.push({
                name_of_state:state[i].name,
                no_of_donor:no_of_donor,
                no_of_request:no_of_request
            })
       }
    res.render('dashboard',{
        donor : donor,
        request:request,
        data:data
    });
    }
    //donorform
   static donorForm= async (req,res)=>{
       var state = await stateModel.find({})
       var city = await cityModel.find({})

    res.render('donorForm',{ csrfToken: req.csrfToken(),state:state,city:city });
    }
    //requestform
   static requestForm= async(req,res)=>{
    var state = await stateModel.find({})
    var city = await cityModel.find({})
    res.render('requestForm',{ csrfToken: req.csrfToken(),state:state,city:city  });
    }

    //managedonor
   static manageDonor= async (req,res)=>{
    var state = await stateModel.find({})
       var data = await donorModel.find({}).populate('state_id').populate('city_id')
       console.log(data);
    res.render('manageDonor',{data:data,state:state});
    }

    static filter = async (req,res)=>{
        var state = await stateModel.find({})
        var data = await donorModel.find({$or:[{state_id:req.query.state}]}).populate('state_id').populate('city_id');
        res.render('manageDonor',{data:data,state:state});
    }

        //manageRequester
   static manageRequester= async (req,res)=>{
    var state = await stateModel.find({})
       var data = await requesterModel.find({}).populate('state_id').populate('city_id')
       console.log(data);
    res.render('manageRequester',{data:data,state:state});
    }

    static filterReq = async (req,res)=>{
        var state = await stateModel.find({})
        var data = await requesterModel.find({$or:[{state_id:req.query.state}]}).populate('state_id').populate('city_id');
        res.render('manageDonor',{data:data,state:state});
    }


    // static Insertstate = (req,res) => {
    //     var date = new stateModel({
    //         name:'Uttar Pardesh'
    //     })
    //     date.save();
    //     res.redirect('/')
    // }

    static insertDonor = async (req,res)=>{
        var {name,age,gender,bloodgroup,covid_positive_date,covid_negative_date,state,city,phone_no} =req.body;
        console.log(req.body.state);
    var dateOfcovid_positive = new Date(covid_positive_date)
    var Year_of_positive = dateOfcovid_positive.getFullYear();
    var Month_of_positive = dateOfcovid_positive.getMonth() + 1;
    var Date_of_positive = dateOfcovid_positive.getDate();

    var dateOfcovid_negative = new Date(covid_negative_date)
    var Year_of_negative = dateOfcovid_negative.getFullYear();
    var Month_of_negative = dateOfcovid_negative.getMonth() + 1;
    var Date_of_negative = dateOfcovid_negative.getDate();

    var diffMonth = moment([Year_of_negative,Month_of_negative,Date_of_negative]).diff(moment([Year_of_positive,Month_of_positive,Date_of_positive]),"months")

        const data = await donorModel.findOne({name:name,age:age,gender:gender,bloodgroup:bloodgroup})
        if (data != null) {
            req.flash("danger",'You have already applied')
            res.redirect('/donorForm')
        } else {
            if (name && age && gender && bloodgroup && covid_positive_date &&covid_negative_date&& state && city && phone_no) {
                if ( diffMonth >= 3 && age >= 18 && age < 60) {
                    const data = new donorModel({
                        name:name,
                        age:age,
                        gender:gender,
                        bloodgroup:bloodgroup,
                        covid_positive_date:covid_positive_date,
                        covid_negative_date:covid_negative_date,
                        state_id:state,
                        city_id:city,
                        phone_no:phone_no,
                    })
                    await data.save()
                    req.flash("success",'Form submited')
                    res.redirect('/donorForm')
                } else {
                    req.flash("danger",'You are not elligiable');
                    res.redirect('/donorForm')
                }
            } else {
                req.flash("danger",'All field Required')
            res.redirect('/donorForm')
            }
        }
    }

    // ////////////////////////////

    static insertRequester = async (req,res)=>{
        var {name,age,gender,bloodgroup,covid_positive_date,covid_negative_date,state,city,phone_no} =req.body;
        console.log(req.body.state);

        const data = await requesterModel.findOne({name:name,age:age,gender:gender,bloodgroup:bloodgroup})
        if (data != null) {
            req.flash("danger",'You have already applied')
            res.redirect('/requestForm')
        } else {
            if (name && age && gender && bloodgroup && covid_positive_date &&covid_negative_date&& state && city && phone_no) {
                if (age >= 18 && age < 60) {
                    const data = new requesterModel({
                        name:name,
                        age:age,
                        gender:gender,
                        bloodgroup:bloodgroup,
                        covid_positive_date:covid_positive_date,
                        covid_negative_date:covid_negative_date,
                        state_id:state,
                        city_id:city,
                        phone_no:phone_no,
                    })
                    await data.save()
                    req.flash("success",'Form submited')
                    res.redirect('/requestForm')
                } else {
                    req.flash("danger",'You are not elligiable');
                    res.redirect('/requestForm')
                }
            } else {
                req.flash("danger",'All field Required')
            res.redirect('/requestForm')
            }
        }
    }

}
module.exports = HomeController
