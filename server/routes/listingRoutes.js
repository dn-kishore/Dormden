const express = require('express');
const router = express.Router();

const {
    getListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
    addReview,
    updateRules
} = require('../controllers/listingController');

router.route('/')
    .get(getListings)
    .post(createListing);

router.route('/:id')
    .get(getListingById)
    .put(updateListing)
    .delete(deleteListing);

router.post('/:id/reviews', addReview);
router.put('/:id/rules', updateRules);

module.exports = router;
