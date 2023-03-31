const { Schema, model } = require("mongoose");

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAT: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: mongoose.reactionSchema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual called formattedDate to use a getter function to format the createdAt timestamp into a string.
thoughtSchema.virtual("formattedDate").get(function () {
  return this.createdAt.toDateString();
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});