const mongoose = require('mongoose');

// MongoDB Connection caching for Serverless
let cachedDb = null;
async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    if (!process.env.MONGO_URI) {
        throw new Error('Please define the MONGO_URI environment variable');
    }
    const opts = { bufferCommands: false };
    const conn = await mongoose.connect(process.env.MONGO_URI, opts);
    cachedDb = conn;
    return cachedDb;
}

// Mongoose Model
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://my-portfolio-two-inky-55.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        await connectToDatabase();
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields' });
        }

        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again ❌' });
    }
};