const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Name is Required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    }
})

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if(user){
        const authUser = await bcrypt.compare(password, user.password);
        if(authUser){
            return user;
        }
        throw Error("Invalid Password");
    }
    throw Error("Email does not exist")
}
module.exports = mongoose.model("Users", userSchema);