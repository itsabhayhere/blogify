const Router = require('express')
const router = Router();

const multer = require('multer')
const path = require('path')

const Blog = require('../models/blog')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads/'));  // Setting destination folder
    },
    filename: function (req, file, cb) {
        // Creating a unique file name based on the current timestamp and the original file name
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);  // Passing the file name to the callback
    },
});


// File type validation
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and are allowed.'), false);
    }
}
const upload = multer({storage:storage,fileFilter:fileFilter})


router.get('/add-new',(req, res)=>{
    return res.render('addBlog',{
        user : req.user
    })
});

router.post('/',upload.single("coverImage"), async (req, res)=>{
    const {title , body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy : req.user._id,
        coverImageURL : `uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id);

    return res.render('blog', {
        user : req.user,
        blog 
    })

})
 

module.exports = router;