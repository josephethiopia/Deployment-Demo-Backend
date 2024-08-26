import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authorize() {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if(!token) return res.status(401).json({error: "Empty token"});

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch(e) {
            res.status(500).json({error: e.message})
        }
        
    }
}

export default authorize