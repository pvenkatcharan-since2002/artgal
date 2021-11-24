exports.uploads = (req,res,next)=>{
    const files = req.files;
    if(!files)
    {
        const error = new Error("Please choose a file");
        return next(error);
    }
    res.json(files);
}