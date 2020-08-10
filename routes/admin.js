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
                res.render('admin', { data: form });
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .post((req, res, next) => {
        if (req.body.assign != null) {
            console.log(req.body);
            Forms.findByIdAndUpdate(req.body.id, { status: req.body.assign }, { new: true })
                .then((dish) => {
                    res.redirect('back');
                }, (err) => { next(err) })
                .catch((err) => next(err));

        }
        else {
            Forms.findById(req.body.id)
                .then((data) => {
                    console.log(data);
                    res.render('adminView', { data: data });
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    })
    .put((req, res, next) => {
        console.log(req.body);
        console.log(req);
    });

module.exports = router;