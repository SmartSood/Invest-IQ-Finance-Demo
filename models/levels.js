import mongoose from "mongoose";

const LevelsSchema = new mongoose.Schema({
    Level_Content: String,
    Level_Description: String,
    Level_Duration: String,
    Level_YoutubeLink: String,
    Level_topic: String,
    Module_no: Number,  // Changed from Int32 to Number
    Level_no: Number    // Changed from Int32 to Number
});


const Levels =mongoose.model("Levels", LevelsSchema);

export default Levels;