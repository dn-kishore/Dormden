const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const { 
    extractRulesFromPDF, 
    generateEmbedding, 
    answerWardenQuestion,
    checkAIStatus 
} = require('../services/aiservices');

const listingsCollection = () => getDB().collection('listings');
const pdfDocumentsCollection = () => getDB().collection('pdfDocuments');

// @desc    Get AI service status
// @route   GET /api/rag/status
const getStatus = async (req, res) => {
    try {
        const status = checkAIStatus();
        res.json({ success: true, data: status });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Upload PDF and extract rules
// @route   POST /api/rag/upload/:listingId
const uploadAndExtractRules = async (req, res) => {
    try {
        const { listingId } = req.params;
        
        if (!ObjectId.isValid(listingId)) {
            return res.status(400).json({ success: false, error: 'Invalid Listing ID' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No PDF file uploaded' });
        }

        const listing = await listingsCollection().findOne({ _id: new ObjectId(listingId) });
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        // Store PDF document in database
        const pdfDoc = {
            listingId: new ObjectId(listingId),
            filename: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            data: req.file.buffer,
            uploadedAt: new Date()
        };
        
        // Upsert - replace if exists for this listing
        await pdfDocumentsCollection().updateOne(
            { listingId: new ObjectId(listingId) },
            { $set: pdfDoc },
            { upsert: true }
        );

        // Extract rules from PDF using AI
        const extractedRules = await extractRulesFromPDF(req.file.buffer);

        // Update listing with extracted rules
        await listingsCollection().findOneAndUpdate(
            { _id: new ObjectId(listingId) },
            { 
                $set: { 
                    rules: extractedRules,
                    rulesUpdatedAt: new Date(),
                    hasPdfRules: true
                } 
            }
        );

        res.json({ 
            success: true, 
            data: { 
                extractedRules: extractedRules.length,
                rules: extractedRules,
                pdfStored: true
            } 
        });
    } catch (error) {
        console.error('PDF extraction error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Index listing rules to vector DB
// @route   POST /api/rag/index/:listingId
const indexRules = async (req, res) => {
    try {
        const { listingId } = req.params;
        
        if (!ObjectId.isValid(listingId)) {
            return res.status(400).json({ success: false, error: 'Invalid Listing ID' });
        }

        const listing = await listingsCollection().findOne({ _id: new ObjectId(listingId) });
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        if (!listing.rules || listing.rules.length === 0) {
            return res.status(400).json({ success: false, error: 'No rules to index' });
        }

        const { Pinecone } = require('@pinecone-database/pinecone');
        const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
        const index = pinecone.index(process.env.PINECONE_INDEX);

        // Create vectors for each rule
        const vectors = [];
        for (const rule of listing.rules) {
            const text = `${rule.title}: ${rule.description}. ${rule.clause || ''}`;
            const embedding = await generateEmbedding(text);
            
            vectors.push({
                id: `${listingId}-${rule.id || vectors.length}`,
                values: embedding,
                metadata: {
                    type: 'hostel-rule',
                    listingId: listingId,
                    listingName: listing.name,
                    ruleTitle: rule.title,
                    ruleDescription: rule.description,
                    clause: rule.clause || '',
                    text: text
                }
            });
        }

        // Upsert to Pinecone
        await index.upsert(vectors);

        // Mark listing as indexed
        await listingsCollection().findOneAndUpdate(
            { _id: new ObjectId(listingId) },
            { $set: { rulesIndexed: true, indexedAt: new Date() } }
        );

        res.json({ 
            success: true, 
            data: { rulesIndexed: vectors.length } 
        });
    } catch (error) {
        console.error('Indexing error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Ask Warden Bot a question
// @route   POST /api/rag/ask
const askWardenBot = async (req, res) => {
    try {
        const { question, listingId, history } = req.body;

        if (!question) {
            return res.status(400).json({ success: false, error: 'Question is required' });
        }

        let listingContext = null;
        if (listingId && ObjectId.isValid(listingId)) {
            listingContext = await listingsCollection().findOne({ _id: new ObjectId(listingId) });
        }

        const answer = await answerWardenQuestion(question, listingId, listingContext, history);

        res.json({ success: true, data: { answer } });
    } catch (error) {
        console.error('Warden Bot error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getStatus,
    uploadAndExtractRules,
    indexRules,
    askWardenBot
};
