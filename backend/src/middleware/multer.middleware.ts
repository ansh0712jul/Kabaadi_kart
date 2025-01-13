import multer from "multer";


// Configure multer disk storage
const storage = multer.diskStorage({
    // Set the destination directory for uploaded files
    destination: function (req, file, cb) {
        cb(null, './public/temp'); // Specify the destination directory (change as needed)
    },

    // Define the filename for uploaded files
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Specify the filename format
    }
});


// Create a multer instance with the configured storage
export const upload = multer({ 
    storage
});
