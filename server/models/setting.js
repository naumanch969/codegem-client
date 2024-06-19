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
      emailNotifications: { type: String, enum: ['Enabled', 'Disabled'], default: 'Disabled' },
      pushNotifications: { type: String, enum: ['Enabled', 'Disabled'], default: 'Disabled' },
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
      enableAccessibilityFeatures: { type: String, enum: ['Enabled', 'Disabled'], default: 'Disabled' },
    }
  },
  { timestamps: true }
);

const settingModel = model("Setting", settingsSchema);

export default settingModel;
