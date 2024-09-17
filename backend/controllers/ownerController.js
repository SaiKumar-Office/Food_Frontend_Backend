const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async(req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;

        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            res.status(404).json({ message: "Vendor not found" })
        }

        // if (vendor.firm.length > 0) {
        //     return res.status(400).json({ message: "vendor can have only one firm" });
            
        // }

        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        })

        const savedFirm = await firm.save();

        const firmId = savedFirm._id
        const vendorFirmName = savedFirm.firmName
        // , vendorFirmName

        vendor.firm.push(savedFirm)

        await vendor.save()
        return res.status(200).json({ message: 'Firm Added successfully ', firmId, vendorFirmName});


    } catch (error) {
        console.error(error)
        res.status(500).json("intenal server error")
    }
}

const deleteFirmById = async(req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const searchFirmsOrProducts = async (req, res) => {
    const searchTerm = req.query.query; // Get the search term from the query string

    console.log('Search Term:', searchTerm); // Log the search term for debugging

    try {
        // Example search logic: search firm names or product names
        const results = await Firm.find({
            $or: [
                { firmName: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for firm names
                { 'products.productName': { $regex: searchTerm, $options: 'i' } } // Search inside nested products array
            ]
        });

        console.log('Search Results:', results); // Log the search results for debugging

        if (results.length === 0) {
            return res.status(404).json({ message: 'No matching firms or products found' });
        }

        res.status(200).json({ products: results });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById, searchFirmsOrProducts  }