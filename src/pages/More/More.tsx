import React, { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { VerifiedUser, Person, AlternateEmail, LocationOn, Info, Visibility, PersonAdd, People, PostAdd, Tag, Block, Settings as SettingsIcon, Email, Notifications, Brightness4, FormatSize, Facebook, Twitter, GitHub, Accessibility, ContactSupport, Help, Logout, PrivacyTip, NotificationImportant, Mode, CastConnected, HelpCenter, } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getSettings } from "@/redux/reducers/settingSlice";
import SettingItem from "./SettingItem";
import { useSettingModals } from "@/hooks/useSettingModals";
import { SettingParentField, SettingSubField } from "@/enums";
import { logout } from "@/redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";


const MorePage = () => {
  /////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loggedUser: fetchedLoggedUser } = useSelector((state: RootState) => state.user)
  const { setting: fetchedSetting } = useSelector((state: RootState) => state.setting)
  const { onOpen } = useSettingModals()

  /////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
  const [settings, setSettings] = useState(fetchedSetting)
  const [loggedUser, setLoggedUser] = useState(fetchedLoggedUser)
  /////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getSettings())
  }, [])
  useEffect(() => {
    setSettings(fetchedSetting)
  }, [fetchedSetting])
  useEffect(() => {
    setLoggedUser(fetchedLoggedUser)
  }, [fetchedLoggedUser])
  /////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
  const onOpenModal = (parentField: SettingParentField, field: SettingSubField) => {
    onOpen(parentField, field)
  }
  const onLogout = () => {
    dispatch<any>(logout(navigate))
  }


  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-4 text-blackish">More</h1>
      <div className="w-full flex flex-col gap-4">

        {/* Account Settings */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <Person /> <span>Account Settings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1' >
              <SettingItem
                field="Username"
                value={loggedUser?.username as string}
                icon={<VerifiedUser />}
                onClick={() => onOpenModal(SettingParentField.account, SettingSubField.username)}
              />
              <SettingItem
                field="Full Name"
                value={(loggedUser?.firstName || loggedUser?.lastName) ? `${loggedUser?.firstName} ${loggedUser?.lastName}` : 'FullName'}
                icon={<Person />}
                onClick={() => onOpenModal(SettingParentField.account, SettingSubField.fullName)}
              />
              <SettingItem
                field="Email"
                value={loggedUser?.email as string}
                icon={<AlternateEmail />}
                onClick={() => onOpenModal(SettingParentField.account, SettingSubField.email)}
              />
              <SettingItem
                field="Location"
                value={loggedUser?.location as string}
                icon={<LocationOn />}
                onClick={() => onOpenModal(SettingParentField.account, SettingSubField.location)}
              />
              <SettingItem
                field="Bio"
                value={loggedUser?.bio as string}
                icon={<Info />}
                onClick={() => onOpenModal(SettingParentField.account, SettingSubField.bio)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Privacy Policy */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <PrivacyTip /> <span>Privacy Settings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1' >
              <SettingItem
                field="Manage Visibility of Profile"
                value={settings?.privacySettings?.profileVisibility as string}
                icon={<Visibility />}
                onClick={() => onOpenModal(SettingParentField.privacy, SettingSubField.profileVisibility)}
              />
              <SettingItem
                field="Control Who Can Send Friend Requests"
                value={settings?.privacySettings?.whoCanSendFriendRequests as string}
                icon={<PersonAdd />}
                onClick={() => onOpenModal(SettingParentField.privacy, SettingSubField.whoCanSendFriendRequests)}
              />
              <SettingItem
                field="Control Who Can See My Friends List"
                value={settings?.privacySettings?.whoCanSeeMyFriendsList as string}
                icon={<People />}
                onClick={() => onOpenModal(SettingParentField.privacy, SettingSubField.whoCanSeeMyFriendsList)}
              />
              <SettingItem
                field="Control Who Can See My Posts"
                value={settings?.privacySettings?.whoCanSeeMyPosts as string}
                icon={<PostAdd />}
                onClick={() => onOpenModal(SettingParentField.privacy, SettingSubField.whoCanSeeMyPosts)}
              />
              <SettingItem
                field="Control Who Can Tag Me in Posts"
                value={settings?.privacySettings?.whoCanTagMeInPosts as string}
                icon={<Tag />}
                onClick={() => onOpenModal(SettingParentField.privacy, SettingSubField.whoCanTagMeInPosts)}
              />
              <SettingItem
                field="Block Users"
                value={`${settings?.privacySettings?.blockUsers?.length}`}
                icon={<Block />}
                onClick={() => onOpenModal(SettingParentField.privacy, SettingSubField.blockUsers)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Notification */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <NotificationImportant /> <span>Notifications Settings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1' >
              <SettingItem
                field="Email Notifications"
                value={`${settings?.notificationSettings?.emailNotifications}`}
                icon={<Email />}
                onClick={() => onOpenModal(SettingParentField.notification, SettingSubField.emailNotifications)}
              />
              <SettingItem
                field="Push Notifications"
                value={`${settings?.notificationSettings?.pushNotifications}`}
                icon={<Notifications />}
                onClick={() => onOpenModal(SettingParentField.notification, SettingSubField.pushNotifications)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Theme & Mode */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <NotificationImportant /> <span>Theme and Display Settings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1' >
              <SettingItem
                field="Choose Dark/Light Theme"
                value={`${settings?.themeAndDisplaySettings?.mode}`}
                icon={<Brightness4 />}
                onClick={() => onOpenModal(SettingParentField.themeAndDisplay, SettingSubField.mode)}
              />
              <SettingItem
                field="Adjust Font Size"
                value={`${settings?.themeAndDisplaySettings?.adjustFontSize}`}
                icon={<FormatSize />}
                onClick={() => onOpenModal(SettingParentField.themeAndDisplay, SettingSubField.adjustFontSize)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Connected Accounts */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <CastConnected /> <span>Connected Accounts</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1' >
              <SettingItem
                field="Link/Unlink Facebook Account"
                value={`${settings?.connectedAccounts?.facebook}`}
                icon={<Facebook />}
                onClick={() => onOpenModal(SettingParentField.connectedAccounts, SettingSubField.facebook)}
              />
              <SettingItem
                field="Link/Unlink Twitter Account"
                value={`${settings?.connectedAccounts?.twitter}`}
                icon={<Twitter />}
                onClick={() => onOpenModal(SettingParentField.connectedAccounts, SettingSubField.twitter)}
              />
              <SettingItem
                field="Link/Unlink Github Account"
                value={`${settings?.connectedAccounts?.github}`}
                icon={<GitHub />}
                onClick={() => onOpenModal(SettingParentField.connectedAccounts, SettingSubField.github)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Accessibility Settings */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <Accessibility /> <span>Accessibility Settings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1' >
              <SettingItem
                field="Enable Accessibility Features"
                value={`${settings?.accessibilitySettings?.enableAccessibilityFeatures}`}
                icon={<Accessibility />}
                onClick={() => onOpenModal(SettingParentField.accessibility, SettingSubField.enableAccessibilityFeatures)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Help and Support */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <HelpCenter /> <span>Help and Support</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1' >
              <SettingItem
                field="Contact Support"
                value="support@example.com"
                icon={<ContactSupport />}
                onClick={() => navigate('/contact-support')}
              />
              <SettingItem
                field="Help Center"
                value="Visit Help Center"
                icon={<Help />}
                onClick={() => navigate('/help-center')}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Logout */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex justify-start gap-2">
                <Logout /> <span>Logout</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-1' >
              <button onClick={onLogout} className="mt-6 px-4 py-2 bg-copper  text-white rounded-lg hover:bg-copper -dark transition duration-200">
                <Logout className="mr-2 w-5 h-5" />
                Log Out
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default MorePage;
