import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 100 }, // Starting XP
  badges: [{
    name: String,
    imageUrl: String,
    earnedAt: Date
  }],
  unlockedModules: [Number], // Array of Module_no values
  moduleProgress: { // Track progress per module
    type: Map,
    of: new mongoose.Schema({
      currentLevel: { type: Number, default: 1 },
      completedLevels:{type: [Number], default:[]},// Array of completed level numbers
      highestScore: Number
    }),
    default: {}
  },
  firstModuleSelected: { type: Boolean, default: false }
});

const User = mongoose.model("User", UserSchema);

export default User;