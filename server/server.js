const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
<<<<<<< HEAD
=======
const path = require('path');
const fs = require('fs');
>>>>>>> 934061e (updated project)
const { connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

// Import routes
const listingRoutes = require('./routes/listingRoutes');
const ragRoutes = require('./routes/ragRoutes');
<<<<<<< HEAD
=======
const complaintRoutes = require('./routes/complaintRoutes');
>>>>>>> 934061e (updated project)

const app = express();
const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
=======
// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
}

>>>>>>> 934061e (updated project)
// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

<<<<<<< HEAD
// Routes
app.use('/api/listings', listingRoutes);
app.use('/api/rag', ragRoutes);
=======
// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/listings', listingRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/complaints', complaintRoutes);
>>>>>>> 934061e (updated project)

// Health check
app.get('/', (req, res) => {
    res.json({ 
        message: 'DormDen API is running...',
        version: '1.0.0',
        endpoints: {
            listings: '/api/listings',
<<<<<<< HEAD
            rag: '/api/rag'
=======
            rag: '/api/rag',
            complaints: '/api/complaints'
>>>>>>> 934061e (updated project)
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        error: err.message || 'Something went wrong!' 
    });
});

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`DormDen Server running on port ${PORT}`);
        console.log(`API available at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});
