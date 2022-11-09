import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRECT, async (error, decoded) => {
                if (error) {
                    res.status(401).send({status: false, message: 'your token is expired'})
                } else {
                    req.user = await User.findById(decoded.id).select('-password');
                    next();
                }
            });
        } catch (e) {
            console.error(e);
            res.status(401);
            throw new Error('Not authorized, token failed.')
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized no token');
    }
});


export {protect}