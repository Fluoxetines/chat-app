const FriendRequest = require("../models/FriendRequestModel");
const User = require("../models/UserModel");
const filterObj = require("../utils/filterObj");

exports.updateMe = async (req, res, next) => {
  const filterBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );

  const userDoc = await User.findByIdAndUpdate(req.user._id, filterBody);
  res.status(200).json({
    status: "success",
    data: userDoc,
    message: "User updated successfully",
  });
};

exports.getUsers = async (req, res, next) => {
  const all_users = await User.find({ verified: true }).select(
    "firstName lastName _id"
  );

  const this_user = req.user;

  const remaining_users = all_users.filter(
    (user) =>
      !this_user.friends.includes(user._id) &&
      user._id.toString() !== req.user._id.toString()
  );

  res.status(200).json({
    status: "success",
    data: remaining_users,
    message: "User found successfully !",
  });
};

exports.getRequest = async (req, res, next) => {
  const request = await FriendRequest.find({ recipient: req.user._id })
    .populate("sender")
    .select("_id firstName lastName");

  res.status(200).json({
    status: "success",
    data: request,
    message: "Requests found successfully !",
  });
};

exports.getFriends = async (req, res, next) => {
  const this_user = await User.findById(req.user._id).populate(
    "friends",
    "_id firstName lastName"
  );
  res.status(200).json({
    status: "success",
    data: this_user.friends,
    message: "Friends found successfully !",
  });
};
