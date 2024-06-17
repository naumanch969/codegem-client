import { Schema, model } from "mongoose";

const settingsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    privacySettings: {
      profileVisibility: { type: String, enum: ['Everyone', 'Friends'], default: 'Everyone' },
      whoCanSendFriendRequests: { type: String, enum: ['Everyone', 'Friends'], default: 'Everyone' },
      whoCanSeeMyFriendsList: { type: String, enum: ['Everyone', 'Friends'], default: 'Everyone' },
      whoCanSeeMyPosts: { type: String, enum: ['Everyone', 'Friends'], default: 'Everyone' },
      whoCanTagMeInPosts: { type: String, enum: ['Everyone', 'Friends'], default: 'Everyone' },
      blockUsers: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    },
    notificationSettings: {
      emailNotifications: { type: Boolean, default: false },
      pushNotifications: { type: Boolean, default: false },
      manageNotificationPreferences: { type: Number, enum: [0, 1], default: 0 },  // 0: emailNotification, 1: pushNotification
    },
    themeAndDisplaySettings: {
      mode: { type: String, enum: ['Dark', 'Light'], default: 'Light' },
      adjustFontSize: { type: String, enum: ['Large', 'Medium', 'Small'], default: 'Medium' },
    },
    connectedAccounts: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      github: { type: String, default: '' },
    },
    accessibilitySettings: {
      enableAccessibilityFeatures: { type: Boolean, default: false },
    }
  },
  { timestamps: true }
);

const settingModel = model("Setting", settingsSchema);

export default settingModel;
