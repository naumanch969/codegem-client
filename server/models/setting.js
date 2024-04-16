import { Schema, model } from "mongoose";

const settingsSchema = new Schema(
  {
    accountSettings: {
      username: String,
      fullName: String,
      email: String,
      location: String,
      bio: String,
    },
    privacySettings: {
      manageVisibilityOfProfile: String,
      controlWhoCanSendFriendRequests: String,
      controlWhoCanSeeMyFriendsList: String,
      controlWhoCanSeeMyPosts: String,
      controlWhoCanTagMeInPosts: String,
      blockUsers: Number,
      manageAppPermissions: Number,
    },
    notificationSettings: {
      emailNotifications: String,
      pushNotifications: String,
      manageNotificationPreferences: Number,
    },
    themeAndDisplaySettings: {
      chooseDarkLightTheme: String,
      adjustFontSize: String,
    },
    connectedAccounts: {
      facebook: String,
      twitter: String,
      github: String,
    },
    accessibilitySettings: {
      enableAccessibilityFeatures: String,
    },
    helpAndSupport: {
      contactSupport: String,
      helpCenter: String,
    },
    logOut: String, 
  },
  { timestamps: true } // Adding timestamps option
);

const settingModel = model("Setting", settingSchema);

export default settingModel;
