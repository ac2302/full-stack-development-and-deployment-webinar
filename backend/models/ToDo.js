const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: {
      type: [itemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ToDo", todoSchema);
