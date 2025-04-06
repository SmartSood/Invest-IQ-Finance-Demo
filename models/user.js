import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, unique: true },
  xp: { type: Number, default: 0 },
  unlockedModules: { type: [Number], default: [] },
  moduleProgress: {
    type: Map,
    of: new mongoose.Schema({
      completedLevels: { type: Number, default: 0 }
    }),
    default: {}
  }
});

const User = mongoose.model("User", UserSchema);

export default User;