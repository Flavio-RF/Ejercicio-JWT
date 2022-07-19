const { Schema, model } = require("mongoose")
const beautifyUnique = require("mongoose-beautiful-unique-validation")
const { hashSync } = require("bcrypt")


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
        },
        lastName: String,
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(beautifyUnique)

userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    return user
}

userSchema.pre("save", function (next) {
    if (this.isModified("password"))
        this.password = hashSync(this.password, 10)
    return next()
})

const User = model("User", userSchema);

module.exports = User;