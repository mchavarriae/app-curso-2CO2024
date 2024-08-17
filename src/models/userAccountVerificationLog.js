import mongoose from 'mongoose';

const userAccountVerificationLogSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    emailSentDate: { 
        type: Date, 
        default: Date.now 
    },
    verificationDate: Date,
});

export default mongoose.model('UserAccountVerificationLog', userAccountVerificationLogSchema);
