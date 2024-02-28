import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    ExpandMore,
    ChevronRight,
    VerifiedUser,
    Person,
    AlternateEmail,
    LocationOn,
    Info,
    Visibility,
    PersonAdd,
    People,
    PostAdd,
    Tag,
    Block,
    Settings as SettingsIcon,
    Email,
    Notifications,
    Brightness4,
    FormatSize,
    Facebook,
    Twitter,
    GitHub,
    Accessibility,
    ContactSupport,
    Help,
    Logout,
    PrivacyTip,
    NotificationImportant,
    Mode,
    CastConnected,
    HelpCenter,
} from '@mui/icons-material';

const MorePage = () => {

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

    const Section = ({ icon, title, content }: { icon: any, title: string, content: any }) => {
        return (
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className="flex justify-start gap-2">{icon} <span>{title}</span></div>
                    </AccordionTrigger>
                    <AccordionContent>
                        {content}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    };

    const sections = [
        {
            title: 'Account Settings',
            icon: <Person />,
            content: (
                <>
                    <SettingsItem icon={<VerifiedUser />} label="Username" value="johndoe" />
                    <SettingsItem icon={<Person />} label="Full Name" value="John Doe" />
                    <SettingsItem icon={<AlternateEmail />} label="Email" value="johndoe@example.com" />
                    <SettingsItem icon={<LocationOn />} label="Location" value="New York, USA" />
                    <SettingsItem icon={<Info />} label="Bio" value="Web developer and tech enthusiast." />
                </>
            ),
        },
        {
            title: 'Privacy Settings',
            icon: <PrivacyTip />,
            content: (
                <>
                    <SettingsItem icon={<Visibility />} label="Manage Visibility of Profile" value="Everyone" />
                    <SettingsItem icon={<PersonAdd />} label="Control Who Can Send Friend Requests" value="Everyone" />
                    <SettingsItem icon={<People />} label="Control Who Can See My Friends List" value="Friends" />
                    <SettingsItem icon={<PostAdd />} label="Control Who Can See My Posts" value="Friends" />
                    <SettingsItem icon={<Tag />} label="Control Who Can Tag Me in Posts" value="Friends" />
                    <SettingsItem icon={<Block />} label="Block Users" value="0" />
                    <SettingsItem icon={<SettingsIcon />} label="Manage App Permissions" value="0" />
                </>
            ),
        },
        {
            title: 'Notification Settings',
            icon: <NotificationImportant />,
            content: (
                <>
                    <SettingsItem icon={<Email />} label="Email Notifications" value="Enabled" />
                    <SettingsItem icon={<Notifications />} label="Push Notifications" value="Enabled" />
                    <SettingsItem icon={<SettingsIcon />} label="Manage Notification Preferences" value="0" />
                </>
            ),
        },
        {
            title: 'Theme and Display Settings',
            icon: <Mode />,
            content: (
                <>
                    <SettingsItem icon={<Brightness4 />} label="Choose Dark/Light Theme" value="Dark" />
                    <SettingsItem icon={<FormatSize />} label="Adjust Font Size" value="Medium" />
                </>
            ),
        },
        {
            title: 'Connected Accounts',
            icon: <CastConnected />,
            content: (
                <>
                    <SettingsItem icon={<Facebook />} label="Link/Unlink Facebook Account" value="Linked" />
                    <SettingsItem icon={<Twitter />} label="Link/Unlink Twitter Account" value="Not Linked" />
                    <SettingsItem icon={<GitHub />} label="Link/Unlink Github Account" value="Linked" />
                </>
            ),
        },
        {
            title: 'Accessibility Settings',
            icon: <Accessibility />,
            content: (
                <>
                    <SettingsItem icon={<Accessibility />} label="Enable Accessibility Features" value="Enabled" />
                </>
            ),
        },
        {
            title: 'Help and Support',
            icon: <HelpCenter />,
            content: (
                <>
                    <SettingsItem icon={<ContactSupport />} label="Contact Support" value="support@example.com" />
                    <SettingsItem icon={<Help />} label="Help Center" value="Visit Help Center" />
                </>
            ),
        },
        {
            title: 'Log Out',
            icon: <Logout />,
            content: (
                <>
                    <button className="mt-6 px-4 py-2 bg-teal-blue  text-white rounded-lg hover:bg-teal-blue -dark transition duration-200">
                        <Logout className="mr-2 w-5 h-5" />
                        Log Out
                    </button>
                </>
            ),
        },
    ];


    return (
        <div className="p-6 w-full">
            <h1 className="text-3xl font-bold mb-4 text-dark-slate-blue">More</h1>
            <div className="w-full flex flex-col gap-4">
                {sections.map((section, index) => (
                    <Section
                        key={index}
                        title={section.title}
                        content={section.content}
                        icon={section.icon}
                    />
                ))}
            </div>
        </div>
    );
};





export default MorePage;
