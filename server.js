require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_contacts';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit process in serverless environment
    // process.exit(1);
  }
};

// Connect to database
connectDB();

// Define schemas and models
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SuggestionSchema = new mongoose.Schema({
  suggestion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const VisitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  linkedin: String,
  feedback: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);
const Suggestion = mongoose.model('Suggestion', SuggestionSchema);
const Visitor = mongoose.model('Visitor', VisitorSchema);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const contact = new Contact({ name, email });
    await contact.save();
    res.status(201).json({ message: 'Contact saved successfully!' });
  } catch (err) {
    console.error('Contact save error:', err);
    res.status(500).json({ error: 'Failed to save contact.' });
  }
});

// Book suggestion endpoint
app.post('/api/suggestion', async (req, res) => {
  try {
    const { suggestion } = req.body;
    
    if (!suggestion) {
      return res.status(400).json({ error: 'Suggestion is required' });
    }
    
    const newSuggestion = new Suggestion({ suggestion });
    await newSuggestion.save();
    res.status(201).json({ message: 'Suggestion saved successfully!' });
  } catch (err) {
    console.error('Suggestion save error:', err);
    res.status(500).json({ error: 'Failed to save suggestion.' });
  }
});

// Visitor feedback endpoint
app.post('/api/visitor', async (req, res) => {
  try {
    const { name, linkedin, feedback } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const newVisitor = new Visitor({ name, linkedin, feedback });
    await newVisitor.save();
    res.status(201).json({ message: 'Visitor feedback saved successfully!' });
  } catch (err) {
    console.error('Visitor save error:', err);
    res.status(500).json({ error: 'Failed to save visitor feedback.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export for Vercel
module.exports = app;
