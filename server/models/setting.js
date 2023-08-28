import { Schema, model } from "mongoose";

const settingSchema = Schema({
  
}, { timestamps: true });

const settingModel = model('Setting', settingSchema);

export default settingModel