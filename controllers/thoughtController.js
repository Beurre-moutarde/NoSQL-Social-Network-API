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
    console.log(req.params.thoughtId);
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found with that id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Create/POST a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Update/PUT thought by its _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No thoughts found with that id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE thought by its _id
  deleteThought(req, res) {
    console.log(req.params.thoughtId)
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "No thought find with this id!" })
          : User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { thought: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(user);
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
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thoughts with this ID!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },
  //DELETE reaction by thought id
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "Try Again!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController
