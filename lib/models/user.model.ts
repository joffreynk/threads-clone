import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    id: { type:String, required:true },
    name: { type:String, required:true },
    username: { type:String, required:true, unique:true },
    image: String,
    bio: String,
    threads: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
    communities: [
        {
            type: Schema.Types.ObjectId,
            ref: "Community"
        }
    ],
    onboarded: { type: Boolean, default: false},
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;