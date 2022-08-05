const userModel = require("../Models/UserModel");
const movieModel = require("../Models/MovieModel");
const jwt = require('jsonwebtoken');

const maxAge = 1 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = { userName: "", email: "", password: "" }
    if (err.message === "Email does not exist")
        errors.email = "Email does not exist";
    if (err.message === "Invalid Password")
        errors.email = "Password did not match";

    if (err.code === 11000) {
        errors.email = "Email is already registered"
        return errors;
    }
    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    };
    return errors;
};
module.exports.register = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        const user = await userModel.create({ userName, email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(201).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({ user: user._id, created: true });
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

module.exports.allmovies = async (req, res, next) => {
    try {
        const Movies = await movieModel.find();
        if (Movies.length === 0) {
            return res.status(404).json({ message: "No Movies To Show" });
        }
        if (Movies) {
            return res.status(200).json(Movies)
        }
    } catch (err) {
        console.log(err)
    }
};

module.exports.addmovies = async (req, res, next) => {
    const { movieName, rating, cast, genre, date } = req.body;
    try {
        const newMovie = new movieModel({
            movieName, rating, cast, genre, date
        });
        await newMovie.save();
        if(!newMovie){
            return res.status(500).json({message: "Unable to add the New Movie"})
        }
        if(newMovie){
            return res.status(201).json({newMovie})
        }        
    } catch (err) {
        console.log(err);
    }   
}

module.exports.getmoviesbyid = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const Movies = await movieModel.findById(req.params.id);
        if (!Movies) {
            return res.status(404).json({ message: "No Movies To Show" });
        }
        if (Movies) {
            return res.status(200).json(Movies)
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.updatemoviesbyid = async(req,res,next)=>{
    const id = req.params.id;
    const { movieName, rating, cast, genre, date } = req.body;
    try {
       const Movies = await movieModel.findByIdAndUpdate(req.params.id,{
        movieName, rating, cast, genre, date
       });
       await Movies.save();
    if (Movies) {
        return res.status(200).json({message: "Updated successfully"})
    } 
    } catch (err) {
        console.log(err);
    }
}

module.exports.deletemoviesbyid = async(req,res,next)=>{
    const id = req.params.id;
    try {
        const Movies = await movieModel.findByIdAndRemove(id);
        if (Movies.length === 0) {
            return res.status(404).json({ message: "No Movies To Delete" });
        }
        if (Movies) {
            return res.status(200).json({message: "Deleted successfully"});
        }
    } catch (err) {
        console.log(err);
    }
}