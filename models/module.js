import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    Module_Name: String,
    Module_heading:String,
    Module_no:Number   // Changed from Int32 to Number
});

const Modules = mongoose.model("Module", ModuleSchema);
export default Modules;