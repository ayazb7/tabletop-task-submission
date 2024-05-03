const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Make sure CORS is enabled for all origins for testing
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/api/vehicle-enquiry', async (req, res) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'mG1zaRgSH21lGk5mHwqgV6Y4oGkm8UpX5VNbfHoN',
            },
            data: {
                registrationNumber: req.body.registrationNumber
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching details from DVLA:', error);
        res.status(error.response ? error.response.status : 500).json({
            message: 'Failed to fetch vehicle details',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});