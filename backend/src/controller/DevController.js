const axios = require('axios');
const Dev = require('../models/Dev');
const ToArray = require('../models/utils/StringtoArray');
const Api = require('./ApiController');

//index, show, store, update, destroy

module.exports = {

async index(request,response){
    const devs = await Dev.find();

    return response.json(devs);
},


async store(request, response){
    const { github_username, techs, latitude, longitude} = request.body;
 
    let dev = await Dev.findOne({github_username});

    if(!dev){

     const gitResponse = await axios.get(`https://api.github.com/users/${github_username}`);
     const {name = login, avatar_url,bio } = gitResponse.data;
 
     const techsArrays = ToArray(techs);
     
     const location = {
         type: 'Point',
         coordinates: [longitude, latitude],
     }
 
    dev = await Dev.create({
         name,
         github_username,
         bio,
         avatar_url,
         techs: techsArrays,
         location,
     });
    }
     return response.json({dev});
 },

 async update(request, response){
    const { github_username, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({github_username})
    
    try {

        if(!dev){
            return response.json({message: {
                "Validation": "Dev não Cadastrado!!!",
                "error": "",
            }});
        }

        const gitResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        const {name = login, avatar_url,bio } = gitResponse.data;

        const techsArray = ToArray(techs);
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        dev = await Dev.updateOne(
            {github_username: github_username}, // query
            {
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            }
        );

        if(dev.ok){
            dev = await Dev.findOne({github_username});
        }


    } catch (err) {
        console.log(err);
        return response.json({message: {
            "Validation": "",
            "error": err,
        }});
    }
    
    return response.json({dev});
 },

 async destroy(request, response){
    const { github_username} = request.body;

    try {

        await Dev.deleteOne({github_username});
        
    } catch (error) {
        console.log(error);
        return response.json({message: {
            "Validation": "",
            "error": error,
        }});
    }
 return response.json({message: {
            "Validation": `Dev ${github_username}, deletado com sucesso`,
            "error": "",
        }});

 }

};