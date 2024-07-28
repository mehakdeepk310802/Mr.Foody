import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const jwtSecret = "MynameisEndToEndYouTubeChannel$#"
const router = express.Router();
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ success: false, message: 'Enter Valid Credentials' });
        }
        const salt = await bcrypt.genSalt(10);
        const setPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location
            });
            return res.json({ success: true });
        } catch (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
});
router.post("/loginuser", [
        body('email').isEmail(),
        body('password').isLength({ min: 5 })
    ],    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ success: false, message: 'Enter Valid Credentials' });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({email});
            if(!userData){
                return res.status(400).json({errors: "Try login with correct credentials"});
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
            if(!pwdCompare){
                return res.status(400).json({errors: "Try login with correct credentials"});
            }
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });
        } catch (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
});

export default router;
