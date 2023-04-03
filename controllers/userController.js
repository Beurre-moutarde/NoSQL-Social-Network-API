const { User, Thought } = require("../models");

modules.exports = {
  //GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //PUT to update a user by its _id
  updateUser(req, res) {
    const { username, email } = req.body;
    const { userId } = req.params;

    User.findOneAndUpdate(
      { _id: userId },
      { $set: { username, email } },
      { new: true },
      (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
      }
    );
  },
  //DELETE to remove user by its _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughtss deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //Add a friend to a user by updating user
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //Delete a friend by updating user
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
