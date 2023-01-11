import { mongoose } from "mongoose";

// const uri = "mongodb://127.0.0.1:27017/crud";
const uri = "mongodb+srv://amit244245:amit2442455@merncrudcluster.7jzjbti.mongodb.net/mern_crud"

mongoose.set("strictQuery", false);

export default async function connect() {
    await mongoose.connect(uri)
    .then(() => {
      console.log(`Database Connected`);
    })
    .catch(() => {
      console.log(`Database Error: No Connection`);
    });
}