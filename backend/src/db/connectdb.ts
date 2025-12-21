import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(`✅ connetected to mongodb`);
  } catch (error) {
    console.log(`❌ error to connect to mongodb`);
    process.exit(1)
  }
}
export { connectDb }