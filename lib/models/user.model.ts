import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  profilePictureUrl?: string;
  role: "user" | "admin";
}
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    profilePictureUrl: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
