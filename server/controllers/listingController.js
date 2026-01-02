const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const collectionName = 'listings';

// Helper to get collection
const getCollection = () => getDB().collection(collectionName);

// @desc    Fetch all listings
// @route   GET /api/listings
const getListings = async (req, res) => {
    try {
        const { search, city, vibe, minRent, maxRent } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }

        if (city) {
            query.city = city;
        }

        if (vibe) {
            query.vibe = vibe;
        }

        if (minRent || maxRent) {
            query.rent = {};
            if (minRent) query.rent.$gte = parseInt(minRent);
            if (maxRent) query.rent.$lte = parseInt(maxRent);
        }

        const listings = await getCollection().find(query).toArray();
        res.json({ success: true, data: listings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Fetch single listing
// @route   GET /api/listings/:id
const getListingById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid Listing ID' });
        }

        const listing = await getCollection().findOne({ _id: new ObjectId(id) });

        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        res.json({ success: true, data: listing });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create a listing
// @route   POST /api/listings
const createListing = async (req, res) => {
    try {
        const {
            name,
            location,
            city,
            rent,
            image,
            images,
            vibe,
            vibeScore,
            amenities,
            roomTypes,
            rules,
            highlights,
            hiddenCosts,
            vibeAnalysis
        } = req.body;

        // Basic Validation
        if (!name || !location || !city || !rent) {
            return res.status(400).json({ 
                success: false, 
                error: 'Please fill in all required fields (name, location, city, rent)' 
            });
        }

        const newListing = {
            name,
            location,
            city,
            rent: Number(rent),
            image: image || (images && images[0]) || '',
            images: images || [],
            vibe: vibe || 'chill',
            vibeScore: Number(vibeScore) || 80,
            amenities: amenities || [],
            roomTypes: roomTypes || [],
            rules: rules || [],
            highlights: highlights || {
                curfew: 'No Curfew',
                guests: false,
                pets: false,
                cooking: false
            },
            hiddenCosts: hiddenCosts || [],
            vibeAnalysis: vibeAnalysis || { badge: '', description: '' },
            reviews: [],
            roommates: [],
            createdAt: new Date()
        };

        const result = await getCollection().insertOne(newListing);
        const createdListing = await getCollection().findOne({ _id: result.insertedId });

        res.status(201).json({ success: true, data: createdListing });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update a listing
// @route   PUT /api/listings/:id
const updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid Listing ID' });
        }

        const updates = { ...req.body };
        if (updates.rent) updates.rent = Number(updates.rent);
        if (updates.vibeScore) updates.vibeScore = Number(updates.vibeScore);
        delete updates._id;
        updates.updatedAt = new Date();

        const result = await getCollection().findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updates },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid Listing ID' });
        }

        const result = await getCollection().deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        res.json({ success: true, message: 'Listing removed' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Add a review to a listing
// @route   POST /api/listings/:id/reviews
const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, avatar, rating, text, vibeTag } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid Listing ID' });
        }

        const review = {
            id: new ObjectId().toString(),
            author,
            avatar: avatar || '👤',
            rating: Number(rating),
            text,
            vibeTag: vibeTag || '',
            date: 'Just now'
        };

        const result = await getCollection().findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $push: { reviews: review } },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update rules for a listing (used after PDF extraction)
// @route   PUT /api/listings/:id/rules
const updateRules = async (req, res) => {
    try {
        const { id } = req.params;
        const { rules } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: 'Invalid Listing ID' });
        }

        const result = await getCollection().findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { rules, updatedAt: new Date() } },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
    addReview,
    updateRules
};
