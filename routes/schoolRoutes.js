const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Haversine formula for calculating distance
const haversine = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Add School API
router.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validate input
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, address, parseFloat(latitude), parseFloat(longitude)], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: "School added successfully!", schoolId: result.insertId });
    });
});

// List Schools API
router.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const sql = "SELECT * FROM schools";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const schoolsWithDistance = results.map((school) => ({
            ...school,
            distance: haversine(userLat, userLon, school.latitude, school.longitude)
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    });
});

module.exports = router;
