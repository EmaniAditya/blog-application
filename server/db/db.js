import mongoose from "mongoose"

const URI = process.env.ATLAS_URI || "mongodb://localhost:27017/blog-application"

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("mongodb connected!")
    } catch (error) {
        console.error("error connecting to mongodb:", error)
        process.exit(1)
    }
}

export default connectDB
