
const express = require('express');
const Model = require('../models/model');
const router = express.Router();

const { MongoClient, ObjectId } =  require('mongodb');

const uri = 'mongodb+srv://jeserobertosl_db_user:Amosalmongodb1@cluster0.x8bmuxu.mongodb.net/';
const client = new MongoClient(uri);

const aggDB = client.db('sample_restaurants');

const clln_restaurant = aggDB.collection('restaurants');

var pipeline = [];

//Post Method
router.post('/add_restaurant', async (req, res) => {

    const data = new Model({
        address: req.body.address,
        borough: req.body.borough,
        cuisine: req.body.cuisine,
        grades: req.body.grades,
        name: req.body.name,
        restaurant_id: req.body.restaurant_id,
        comments: req.body.comments
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Add grade by restaurant_id and grade parameter
router.patch('/add_grade/:id', async (req, res) => {
    try {
        await clln_restaurant.updateOne(
            {"restaurant_id": req.params.id}, 
            {$push: {"grades": req.body.grades}});

        res.send('grades updated');
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/add_comment/:id', async (req, res) => {
    try {
        await clln_restaurant.updateOne(
            {"restaurant_id": req.params.id}, 
            {$push: {"comments": req.body.comments}});

        res.send('comments updated');
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/get_by_restaurant_id/:id', async (req, res) => {
    pipeline = [];
    try {
        pipeline.push({
            $match: {
                restaurant_id: req.params.id
            }
        })
        // Run the aggregation.
        const aggregationResult = await clln_restaurant.aggregate(pipeline);
        results = [];
        // Print the aggregation results.
        for await (const document of aggregationResult) {
            results.push(document);
        }
        res.json(results);
    } finally {
        await client.close();
    }
})

router.get('/get_by_borough', async (req, res) => {
    pipeline = [];
    try {
        pipeline.push({
            $match: {
                borough: req.body.borough
            }
        })

        pipeline.push({
            $unset: ["_id", "borough"]
        })
        // Run the aggregation.
        const aggregationResult = await clln_restaurant.aggregate(pipeline);
        results = [];
        // Print the aggregation results.
        for await (const document of aggregationResult) {
            results.push(document);
        }
        res.json(results);
    } finally {
        await client.close();
    }
})

router.get('/get_by_cuisine', async (req, res) => {
    pipeline = [];
    try {
        pipeline.push({
            $match: {
                cuisine: req.body.cuisine
            }
        })

        pipeline.push({
            $unset: ["_id", "cuisine"]
        })
        // Run the aggregation.
        const aggregationResult = await clln_restaurant.aggregate(pipeline);
        results = [];
        // Print the aggregation results.
        for await (const document of aggregationResult) {
            results.push(document);
        }
        res.json(results);
    } finally {
        await client.close();
    }
})

module.exports = router;