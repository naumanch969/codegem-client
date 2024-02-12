import Notification from "../models/notification.js";
import { isUndefined, createError } from "../utils/functions.js";

export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ user: userId });
    res.status(200).json(notifications);
  } catch (error) {
    return next(createError(res, 500, error.message));
  }
};
export const getNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);
    res.status(200).json(notification);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const createNotification = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { title, description, type } = req.body;
    if (isUndefined(title) || isUndefined(description))
      return next(
        createError(res, 401, "Make sure to provide all the fields.")
      );

    const newNotification = await Notification.create({
      user: userId,
      title,
      description,
      type: type | "GENERAL",
    });
    res.status(200).json(newNotification);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const markAllAsRead = async (req, res, next) => {
  try {
    const allNotifications = await Notification.find({ user: req.user._id });
    await Promise.all(
      allNotifications.map(async (notification) => {
        await Notification.findByIdAndUpdate(
          notification._id,
          { $set: { isRead: true } },
          { new: true }
        );
      })
    );
    res.status(200).json({ message: "Mark as read." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const markAsRead = async (req, res, next) => {
  try {
    const { notificationId } = req.params;

    await Notification.findByIdAndUpdate(
      notificationId,
      {
        $set: { isRead: true },
      },
      { new: true }
    );
    res.status(200).json({ message: "All notification marked as read." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notification deleted successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteAllNotification = async (req, res, next) => {
  try {
    await Notification.deleteMany({ user: req.user._id });
    res
      .status(200)
      .json({ message: "All notifications deleted successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
