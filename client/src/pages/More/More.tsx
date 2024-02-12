import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
} from '@mui/icons-material';

const MorePage = () => {

    const SettingsItem = ({ icon, label, value }) => {
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

    const Section = ({ icon, title, content, expanded, handleChange }) => {
        return (
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-content" id="panel-header">
                    {icon}
                    <span className="ml-2">{title}</span>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-col w-full">
                        {content}
                    </div>
                </AccordionDetails>
            </Accordion>
        );
    };

    const sections = [
        {
            title: 'Account Settings',
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
            content: (
                <>
                    <SettingsItem icon={<Brightness4 />} label="Choose Dark/Light Theme" value="Dark" />
                    <SettingsItem icon={<FormatSize />} label="Adjust Font Size" value="Medium" />
                </>
            ),
        },
        {
            title: 'Connected Accounts',
            content: (
                <>
                    <SettingsItem icon={<Facebook />} label="Link/Unlink Facebook Account" value="Linked" />
                    <SettingsItem icon={<Twitter />} label="Link/Unlink Twitter Account" value="Not Linked" />
                    <SettingsItem icon={<GitHub />} label="Link/Unlink Github Account" value="Linked" />
                    {/* ... Add more connected accounts items */}
                </>
            ),
        },
        {
            title: 'Accessibility Settings',
            content: (
                <>
                    <SettingsItem icon={<Accessibility />} label="Enable Accessibility Features" value="Enabled" />
                </>
            ),
        },
        {
            title: 'Help and Support',
            content: (
                <>
                    <SettingsItem icon={<ContactSupport />} label="Contact Support" value="support@example.com" />
                    <SettingsItem icon={<Help />} label="Help Center" value="Visit Help Center" />
                </>
            ),
        },
        {
            title: 'Log Out',
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


    const [expanded, setExpanded] = useState(null);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="p-6 w-full">
            <h1 className="text-3xl font-bold mb-4 text-dark-slate-blue">More</h1>
            <div className="w-full flex flex-col gap-[1rem]">
                {sections.map((section, index) => (
                    <Section
                        key={index}
                        title={section.title}
                        content={section.content}
                        icon={section.icon}
                        expanded={expanded === index}
                        handleChange={handleAccordionChange(index)}
                    />
                ))}
            </div>
            <style jsx>
                {`
                    .MuiAccordionDetails-root {
                        transition: height 0.3s ease-in-out;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                    }
                    .Mui-expanded .MuiAccordionDetails-root {
                        height: auto;
                    }
                `}
            </style>
        </div>
    );
};





export default MorePage;
