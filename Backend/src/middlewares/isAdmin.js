const isAdmin = (req,res,next)=>{
    const user = req.user;
    try {

        const admin = req.user.role === "Admin";
        if(!admin){
            throw new Error("Not Authorized");
        }

        next()

    } catch (error) {
        res.json({
            error:error.message
        })
        
    }
}

module.exports = isAdmin;