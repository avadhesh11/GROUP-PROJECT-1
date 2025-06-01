import User from "../models/user.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ status: "error", error: "User already exists" });
        }

        //need to put this in dotenv 
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //JWT add karna he

        const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword
        })

        await newUser.save();

        console.log("User registered successfully", newUser);
        res.render("home", { message: "User registered successfully" });
    } 
    catch (error) { 
        console.error("Signup Error:", error);
        res.json({ status: "error", error: "Something went wrong" });
    }
};

export const login = async(req,res)=>{
    const{email, password} = req.body;
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.json({status:"error", error:"User not found"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
    }
    catch{
        console.error("Signup Error:", error);
        res.json({ status: "error", error: "Something went wrong" });
    }
};

//need to make log out route using cookies add cookies then add log out routes
