import React from 'react'
import { SVG } from '@/components';
import { code, streak, collection, friend, group, header, message, project } from '@/assets/svgs';

const About = () => {

    const contentSections = [
        {
            title: "Code Snippets",
            subtitle: "Share and Shine",
            description: "Showcase your innovative solutions and algorithms with the Codegem community. Share your code snippets to gain feedback, inspire others, and highlight your programming skills.",
            svg: code,
            imageAlt: '',
        },
        {
            title: "Code Streaks",
            subtitle: "Track Your Progress",
            description: "Stay motivated and on track with your coding goals. Code Streaks helps you monitor your progress, celebrate milestones, and push your boundaries.",
            svg: streak,
            imageAlt: '',
        },
        {
            title: "Project Collaboration",
            subtitle: "Build Together",
            description: "Work seamlessly on coding projects with friends and fellow developers. Collaborate in real-time, share updates, and build great things together.",
            svg: project,
            imageAlt: '',
        },
        {
            title: "Collections",
            subtitle: "Organize and Optimize",
            description: "Keep your code snippets organized and easily accessible. Create collections to categorize your code, making it simpler to find and share your work.",
            svg: collection,
            imageAlt: '',
        },
        {
            title: "Groups and Communities",
            subtitle: "Connect and Engage",
            description: "Join or create groups based on your interests and expertise. Engage in discussions, share knowledge, and grow your professional network within specialized communities.",
            svg: group,
            imageAlt: '',
        },
        {
            title: "Messaging",
            subtitle: "Real-Time Conversations",
            description: "Stay connected with instant messaging. Engage in real-time conversations with friends, collaborators, and groups to exchange ideas and solve problems efficiently.",
            svg: message,
            imageAlt: '',
        },
        {
            title: "Friend Discovery",
            subtitle: "Expand Your Network",
            description: "Find and connect with friends who share your coding interests. Discover new connections and broaden your network to enhance your collaborative opportunities.",
            svg: friend,
            imageAlt: '',
        },
    ];



    return (
        <div className="min-h-screen flex flex-col justify-start items-center py-12 pb-32 ">

            <h2 className="text-5xl text-blackish-lighten font-bold text-foreground text-center">Elevate Your Coding Experience</h2>
            <h4 className='text-xl text-accent-foreground mt-2 ' >Connect, Collaborate, and Create with the Ultimate Coding Community</h4>

            <span className=' px-32 mt-8 text-center ' >
                Welcome to Codegem, where coding meets community. Codegem is a dedicated social platform for programmers, offering a dynamic space to share code snippets, track coding progress, and collaborate on projects. Designed for developers of all levels, Codegem transforms coding into a shared journey of discovery and growth. Join us to elevate your coding experience and connect with a network of like-minded professionals.
            </span>

            <div className="flex flex-col justify-start items-start gap-32 mt-28 px-12">
                {contentSections.map((section, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-2 gap-6 w-full`}
                    >
                        <div className={`cols-span-1 flex flex-col gap-4 ${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                            <h3 className='text-foreground text-3xl font-semibold text-blackish-lighten'>
                                {section.title}
                                <br />{section.subtitle}
                            </h3>
                            <span className="text-muted-foreground mt-2">
                                {section.description}
                            </span>
                        </div>
                        <div className={`cols-span-1 flex justify-center ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                            <SVG width='17rem' svg={section.svg} />
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default About