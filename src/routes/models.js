const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
  quarter: { type: Number, required: true },
  grades: { type: [Number], required: true },
  time: { type: [Date] },
  comment: { type: String },
  index: { type: Number },
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  results: { type: [resultSchema] },
});

const Result = mongoose.model("Result", resultSchema);
const Student = mongoose.model("Student", studentSchema);

exports.ResultModel = Result;
exports.StudentModel = Student;
