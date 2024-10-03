import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ", "");
    if(!token) {   
        return res.status(401).json({message:"User not authenticated"})
    }else{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(403).json({message:"User not authenticated"})
        }

        req.id = decode.userId
        next()
    }
    } catch (error) {
        console.log(error)
    }
}
