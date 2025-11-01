const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

// Get all contracts
router.get('/', async (req, res) => {
    try {
        const contracts = await Contract.find();
        res.json(contracts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one contract
router.get('/:address', async (req, res) => {
    try {
        const contract = await Contract.findOne({ address: req.params.address });
        if (!contract) {
            return res.status(404).json({ message: 'Contract not found' });
        }
        res.json(contract);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create contract
router.post('/', async (req, res) => {
    const contract = new Contract({
        address: req.body.address,
        sentienceScore: req.body.sentienceScore,
        experiencePoints: req.body.experiencePoints
    });

    try {
        const newContract = await contract.save();
        res.status(201).json(newContract);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update contract
router.patch('/:address', async (req, res) => {
    try {
        const contract = await Contract.findOneAndUpdate(
            { address: req.params.address },
            req.body,
            { new: true }
        );
        res.json(contract);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;