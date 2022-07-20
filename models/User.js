const { Schema, model } = require("mongoose")
const beautifyUnique = require("mongoose-beautiful-unique-validation")
const bcrypt = require("bcryptjs")


const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            maxLength: 80,
        },
        lastname: {
            type: String,
            required: true,
            maxLength: 80,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: { type: String, required: true, minLength: 3, maxLength: 100 },
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
    if (this.isModified("password") || this.isNew) {
        this.password = bcrypt.hash(this.password, 10)
    }
    return next()
})

userSchema.methods.comparePassword = async function (candidatePasswoord) {
    const match = await bcrypt.compare(candidatePassowrd, this.password)
    return match
}

const User = model("User", userSchema);

module.exports = User;