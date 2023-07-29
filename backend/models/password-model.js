const mongoose=require("mongoose");

const schema=mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    iv: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});

const Password=mongoose.model("Password",schema);

module.exports=Password;