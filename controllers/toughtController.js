const { User, Thought } = require("../models");

const thoughtController = {
  //GET all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //GET a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts found with that id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Create/POST a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Update/PUT thought by its _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughts) =>
        !thoughts
          ? res.status(400).json({ message: "No thoughts found with that id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE thought by its _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughts) =>
        !thoughts
          ? res.status(400).json({ message: "No thought find with this id!" })
          : User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.Id } },
              { new: true }
            )
      )
      .then((users) => {
        if (!users) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(users);
      });
  },
  //Create/POST reaction by thought id
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughts) => {
        if (!thoughts) {
          res.status(404).json({ message: "No thoughts with this ID!" });
          return;
        }
        res.json(thoughts);
      })
      .catch((err) => res.status(400).json(err));
  },
  //DELETE reaction by thought id
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughts) => {
        if (!thoughts) {
          res.status(404).json({ message: "Try Again!" });
          return;
        }
        res.json(thoughts);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController
