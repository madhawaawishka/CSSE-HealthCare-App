import User from '../models/UserSchema.js'; //achchita hal garranna meka import wela nehe.dawasak giya api eka hryta fetch krgnna
import Bookings from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try{
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            {$set: req.body}, 
            {new: true});

        res
            .status(200)
            .json({success: true, 
                message: 'User updated', 
                data: updatedUser,});

    }catch (error) {
        res.status(500).json({success: false, message: 'Failed to updated'});
    }

}



export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try{
        await User.findByIdAndDelete(
            id
        );

        res
            .status(200)
            .json({success: true, 
                message: 'User deleted', 
                });

    }catch (error) {
        res.status(500).json({success: false, message: 'Failed to delete'});
    }

}





export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try{
        const user = await User.findById(
            id
        ).select("-password");

        res
            .status(200)
            .json({success: true, 
                message: 'User found', 
                data: user,});

    }catch (error) {
        res.status(404).json({success: false, message: 'No user found'});
    }

}




export const getAllUser = async (req, res) => {
    

    try{
        const users = await User.find(
            {}
        ).select("-password");

        res
            .status(200)
            .json({success: true, 
                message: 'Users found', 
                data: users,});

    }catch (error) {
        res.status(404).json({success: false, message: 'Not found'});
    }

};

export const getUserProfile= async(req, res) => {  
    const userId=req.userId;
    try {
       const user=await User.findById(userId) 

       if (!user) {
        return res.status(404).json({success: false, message: 'User not found'});
       }

       const {password,...rest}=user._doc;

       res.status(200).json({success: true, message:'profile info is getting',data: {...rest}});
    } catch (err) {
        return res.status(500).json({success: false, message: 'something went wrong,cannot get'});
    }
};

export const getMyAppoinment = async(req, res) => {
    try {
        const bookings=await Bookings.find({user:req.userId})
        const doctorIds=bookings.map(el => el.doctor.id);
        const doctors=await Doctor.find({_id:{$in:doctorIds}}).select('-password');
        res.status(200).json({success: true, message:'Appoinments are getting',data: doctors});   
    } catch (error) {
        return res.status(500).json({success: false, message: 'something went wrong,cannot get'});
    }
}