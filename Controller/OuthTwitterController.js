const User=require('../Models/UserModel');
const axios = require('axios');
const querystring = require('querystring');
require("dotenv").config();

const CLIENT_ID =process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI =process.env.REDIRECT_URI;
const TOKEN_URL = process.env.TOKEN_URL;
const AUTHORIZATION_URL = process.env.AUTHORIZATION_URL;
const USER_DETAILS_URL =process.env.USER_DETAILS_URL ;


function generateBasicAuthHeader(clientId, clientSecret) {
    const authString = `${clientId}:${clientSecret}`;
    const base64AuthString = Buffer.from(authString).toString('base64');
    return `Basic ${base64AuthString}`;
 }

const handleCallback=async(req,res)=>{
    const authorizationCode = req.query.code;
    const stateReceived = req.query.state;
 
    console.log('Authorization Code Received:', authorizationCode);
    console.log('State Received:', stateReceived);
 

    if (stateReceived !== req.session.state) {
        return res.status(400).send('State mismatch or CSRF attack detected');
    }
 
    if (!authorizationCode) {
        return res.status(400).send('Authorization code not provided');
    }
 
    const codeVerifier = req.session.codeVerifier;
 
    if (!codeVerifier) {
        console.error('Code Verifier not found in session');
        return res.status(400).send('Code verifier not found in session');
    }
 
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': generateBasicAuthHeader(CLIENT_ID, CLIENT_SECRET)
    };
 
    const body = querystring.stringify({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
        client_id: CLIENT_ID
    });
 
    console.log('Request Body for Token Exchange:', body);
 
    try {
        const tokenResponse = await axios.post(TOKEN_URL, body, { headers });
        console.log('Token Response:', tokenResponse.data);
 
        const { access_token } = tokenResponse.data;
 
        
        req.session.access_token = access_token;
 
      
        const userResponse = await axios.get(USER_DETAILS_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
 
        console.log('User Details:', userResponse.data);

        req.session.userId = userResponse.data.data.id; 
     
        const { id, name, username } = userResponse.data.data;
        const existingUser = await User.findOne({ userId: id });

        if (existingUser) {
            console.log("User already exists in the database.");
          
        } else {
            
            const newUser = new User({
                name: name || "N/A", 
                userName: username,
                userId: id
            });

            await newUser.save();
            console.log("New user added to the database:", newUser);
            
        }   

       
        res.json({"status":"201",
            "message":"Login Sucessfully",
            "Data":userResponse.data})
    } catch (error) {
       
        res.status(500).send('Failed to exchange authorization code or fetch user details');
    }
}

module.exports={handleCallback};