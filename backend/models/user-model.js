const mongoose=require("mongoose");

const schema=mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const User=mongoose.model("User",schema);

module.exports=User;