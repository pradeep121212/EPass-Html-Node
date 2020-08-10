const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Forms = require("../models/forms");

const router = express.Router();
router.use(bodyParser.json());

router.route('/')
    .get((req, res) => {
        Forms.find({})
            .then((form) => {
                console.log(form);
                res.render('user', { data: form });
            }, (err) => next(err))
            .catch((err) => next(err));

    })


router.route('/applyPass')
    .get((req, res) => {

        Forms.find({})
            .then((form) => {
                console.log(form);
            }, (err) => next(err))
            .catch((err) => next(err));

        res.render('applyPass');
    })
    .delete((req, res, next) => {

        Forms.remove({})
            .then((resp) => {
                console.log(resp);
            })
            .catch();
    }).post((req, res, next) => {
        const noOfPassengers = parseInt(req.body['vehicle'].split(" ")[0]);
        let passengers = [];
        for (var i = 1; i <= noOfPassengers; i++) {
            passengers.push({
                name: req.body[`name${i}`],
                aadhar: req.body[`aadhar${i}`],
                age: req.body[`age${i}`],
            });

        }
        const data = {
            emailId: "pradeep@gmail.com",
            reason: req.body['reason'],
            fromAddressLine1: req.body['fromAddress1'],
            fromAddressLine2: req.body['fromAddress2'],
            fromDistrict: req.body['fromDistrict'],
            toAddressLine1: req.body['toAddress1'],
            toAddressLine2: req.body['toAddress2'],
            toDistrict: req.body['toDistrict'],
            vehicleType: req.body['vehicle'].split(" ")[1],
            vehicleNumber: req.body['vehicleNo'],
            numberOfPassengers: req.body['vehicle'].split(" ")[0],
            passengers: passengers,
            status: "pending",

        };
        Forms.create(data)
            .then((form) => {
                form.save()
                    .then((form) => {
                        console.log(form);


                        res.redirect('back');
                    }, (err) => next(err));
            }, (err) => { next(err) })
            .catch((err) => next(err));

    });



module.exports = router;
