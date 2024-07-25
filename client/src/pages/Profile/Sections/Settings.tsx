import React from 'react'
import { AlternateEmail, Block, Brightness4, ChevronRight, Email, ExpandMore, FormatSize, Info, LocationOn, Logout, Notifications, People, Person, PersonAdd, PostAdd, Tag, VerifiedUser, Visibility, Settings as SettingsIcon, Facebook, Twitter, GitHub, Accessibility, ContactSupport, Help } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

const Settings = () => {

  const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
      <Accordion className="mb-8 rounded-lg shadow-md">
        <AccordionSummary className="bg-light-gray py-4">
          <h2 className="text-xl font-semibold mb-0 text-dark-slate-blue">{title}</h2>
          <ExpandMore className="ml-auto text-cool-gray" />
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col w-full">
            {children}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };

  const SettingsItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => {
    return (
      <div className="flex items-center py-2 px-4 rounded-md hover:bg-light-gray transition duration-200 cursor-pointer">
        {icon && <div className="mr-2 text-cool-gray">{icon}</div>}
        <div>
          <p className="text-cool-gray font-medium">{label}</p>
          <p className="text-cool-gray">{value}</p>
        </div>
        <ChevronRight className="ml-auto w-4 h-4 text-cool-gray" />
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col ">
      <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Settings</h2>

      {/* Account Settings */}
      <SettingsSection title="Account Settings">
        <SettingsItem icon={<VerifiedUser />} label="Username" value="johndoe" />
        <SettingsItem icon={<Person />} label="Full Name" value="John Doe" />
        <SettingsItem icon={<AlternateEmail />} label="Email" value="johndoe@example.com" />
        <SettingsItem icon={<LocationOn />} label="Location" value="New York, USA" />
        <SettingsItem icon={<Info />} label="Bio" value="Web developer and tech enthusiast." />
      </SettingsSection>

      {/* Privacy Settings */}
      <SettingsSection title="Privacy Settings">
        <SettingsItem icon={<Visibility />} label="Manage Visibility of Profile" value="Everyone" />
        <SettingsItem icon={<PersonAdd />} label="Control Who Can Send Friend Requests" value="Everyone" />
        <SettingsItem icon={<People />} label="Control Who Can See My Friends List" value="Friends" />
        <SettingsItem icon={<PostAdd />} label="Control Who Can See My Posts" value="Friends" />
        <SettingsItem icon={<Tag />} label="Control Who Can Tag Me in Posts" value="Friends" />
        <SettingsItem icon={<Block />} label="Block Users" value="0" />
        <SettingsItem icon={<SettingsIcon />} label="Manage App Permissions" value="0" />
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection title="Notification Settings">
        <SettingsItem icon={<Email />} label="Email Notifications" value="Enabled" />
        <SettingsItem icon={<Notifications />} label="Push Notifications" value="Enabled" />
        <SettingsItem icon={<SettingsIcon />} label="Manage Notification Preferences" value="0" />
      </SettingsSection>

      {/* Theme and Display Settings */}
      <SettingsSection title="Theme and Display Settings">
        <SettingsItem icon={<Brightness4 />} label="Choose Dark/Light Theme" value="Dark" />
        <SettingsItem icon={<FormatSize />} label="Adjust Font Size" value="Medium" />
      </SettingsSection>

      {/* Connected Accounts */}
      <SettingsSection title="Connected Accounts">
        <SettingsItem icon={<Facebook />} label="Link/Unlink Facebook Account" value="Linked" />
        <SettingsItem icon={<Twitter />} label="Link/Unlink Twitter Account" value="Not Linked" />
        <SettingsItem icon={<GitHub />} label="Link/Unlink Github Account" value="Linked" />
        {/* ... Add more connected accounts items */}
      </SettingsSection>

      {/* Accessibility Settings */}
      <SettingsSection title="Accessibility Settings">
        <SettingsItem icon={<Accessibility />} label="Enable Accessibility Features" value="Enabled" />
      </SettingsSection>

      {/* Help and Support */}
      <SettingsSection title="Help and Support">
        <SettingsItem icon={<ContactSupport />} label="Contact Support" value="support@example.com" />
        <SettingsItem icon={<Help />} label="Help Center" value="Visit Help Center" />
      </SettingsSection>

      {/* Log Out */}
      <button className="mt-6 px-4 py-2 bg-teal-blue text-white rounded-lg hover:bg-teal-blue-dark transition duration-200">
        <Logout className="mr-2 w-5 h-5" />
        Log Out
      </button>
    </div>
  );
};

export default Settings