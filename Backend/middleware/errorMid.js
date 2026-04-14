
const errorMiddleware = (err, req, res, next) => {
    console.log(err) 

    res.status(err.sratusCode || 500).json({
        status:"failed",
        message:"Server Filed!"
    })
}

export default errorMiddleware