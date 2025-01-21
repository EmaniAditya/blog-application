import mongoose from "mongoose"
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            required: true,
            unique: true, 
            lowercase: true, 
            trim: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        bio: { 
            type: String, 
            maxLength: 500 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        updatedAt: { 
            type: Date, 
            default: Date.now 
        }
    },
    { 
        timestamps: true 
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)
export default User
