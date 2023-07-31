const Event = require('../../models/dogs')

module.exports = {
    index,
    create,
    detail,
    deleteDog,
    update,
    apiCreate
}

async function index(req, res){
    try{
        const userId = req.user._id;
        const dogs = await Event.find({ uploaded_by: userId }).sort('date');        
        res.status(200).json(dogs)
    }catch(err){
        res.status(400).json(err)
    }
}

async function create(req, res){
    try{
        req.body.uploaded_by = req.user._id;
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent)
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

async function detail(req, res){
    try{
        const event = await Event.findById(req.params.id)
        res.status(200).json(event)
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

async function deleteDog(req, res){
    try{
        await Event.findByIdAndDelete(req.params.id)
        res.status(200).json({
            data: 'success'
        })
    }catch(err){
        res.status(400).json(err)
    }
}

async function update(req, res){
    try{
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedEvent)
    }catch(err){
        console.log(err);
        res.status(400).json('Bad Request')
    }
}

// 3pd party dogsApi:

// async function apiCreate (req,res) {
//     try{
//         // Grab the API information 1st as a whole, then use the parsed user info below in 
//         req.body.user = req.user._id;
//         const dogApiData = await fetch ...
//         console.log(dogApiData)
//         res.json({
//             success: true,
//             status: 200,
//             dogApi: dogApiData // dogApiData is what gets compared to entire dog dataset.
//         })
//     }catch(err){
//         console.log(err)
//         res.status(400).json(err)
//     }
// }