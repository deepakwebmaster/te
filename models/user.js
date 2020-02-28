//user schema
let mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: Number, required: true },
        password: { type: String, required: true },
        created_at: { type: Date, default: Date.now }
    });

UserSchema.pre("save", next => {
    let now = new Date();
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model("user", UserSchema);
