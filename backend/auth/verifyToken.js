import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'


export const authenticate = async (req, res, next) => {
    //get token from headesr

    const authToken = req.headers.authorization;

    //check if token is present

    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).json({
            success: false, message: "No token, Access Denied"
        });
    }

    try {
        
        const token = authToken.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.id;
        req.role = decoded.role;

        next();  //must be called to move to next function
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token Expired"
            });
        }

        return res.status(401).json({success:false, message: "Invalid Token"});

    }
};

export const restrict = roles => async (req, res, next) => {
    const userId = req.userId;

    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (patient) {
        user = patient;
    }

    if (doctor) {
        user = doctor;
    }

    if (!roles.includes(user.role)) {
        return res.status(401).json({
            success:false, message: "You are not authorized to access this route"
        });
    }

    next();
};