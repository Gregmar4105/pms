import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { can } from '@/lib/can';
import { ImgHTMLAttributes } from 'react';

// Define core Tailwind colors for a crisp, aviation look
// Blue-600: Primary Action
// White/FDFDFC: Light Background
// Black/0a0a0a: Dark Background
// Gray/1b1b18 & Gray/EDEDEC: Text Colors

export default function Welcome(props: ImgHTMLAttributes<HTMLImageElement>) {
    const { auth } = usePage<SharedData>().props;
    const imagePath = '/logo.svg'; 

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            
            {/* Main Container - The background resembles a clear sky or an airport floor */}
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] p-6 lg:p-8 font-[Instrument Sans]">
                
                {/* ✈️ Header/Navigation */}
                <header className="w-full max-w-7xl text-sm lg:p-4 shadow-b">
                    <div className="flex items-center justify-between">
                         <img
                        {...props} 
                        src={imagePath}
                        alt="Application Logo"
                        // Use Tailwind classes to set a larger default size. 
                        // h-10 and w-10 (40px x 40px) is a common medium size. 
                        // Let's use h-16 w-16 (64px x 64px) for a noticeably bigger logo.
                        className="w-12"
                    />
                        {/* Brand Logo/Name */}
                        <div className="text-2xl flex-1 ml-2 font-bold text-orange-500 tracking-wider">
                            Passenger Management System
                        </div>
                        
                        {/* Auth Links */}
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full border border-orange-400 bg-orange-400 px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-orange-600 hover:border-orange-600"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-full border border-orange-400 bg-orange-400 px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-orange-700 hover:border-orange-700"
                                    >
                                        Login
                                    </Link>
                                    {can('pms_administrator') && <Link
                                        href={register()}
                                        className="rounded-full border border-orange-400 bg-orange-400 px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-orange-700 hover:border-orange-700"
                                    >
                                        Register
                                    </Link>}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <hr className="w-full max-w-7xl border-t border-[#e5e5e0] dark:border-[#2b2b29] mb-12" />

                {/* 🚀 Hero Section - High-impact, focused on the sky/view */}
                <section className="w-full max-w-7xl mt-10 lg:mt-0 text-center flex flex-col items-center px-4">
                    <div className="relative w-full max-w-4xl mx-auto">
                        {/* Subtle Blue Glow Effect - Like a beacon or cockpit lights */}
                        <div className="absolute left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]"></div>
                        
                        <h1 className="text-7xl mt-32 font-extrabold tracking-tight text-[#1b1b18] dark:text-[#EDEDEC] leading-tight">
                            Manage the Skies. <span className="text-orange-400">Simplified.</span>
                        </h1>
                        <p className="mt-6 text-2xl text-[#3b3b38] dark:text-[#bdbdbb] max-w-3xl mx-auto font-light">
                            The next-generation platform for seamless operations, smart passenger management, and real-time flight insights for modern aviation.
                        </p>
                        
                        {/* Primary CTA */}
                        <div className="mt-12 flex justify-center">
                            <Link
                                href={auth.user ? dashboard() : login()}
                                className="rounded-xl bg-orange-400 px-30 py-4 text-white text-xl font-semibold shadow-2xl shadow-blue-500/30 transition hover:bg-orange-600 hover:scale-[1.02] transform duration-300"
                            >
                                {auth.user ? 'Go to Control Center' : 'Login'}
                            </Link>
                        </div>
                    </div>
                </section>

                <hr className="w-full max-w-7xl border-t border-[#e5e5e0] dark:border-[#2b2b29] mt-32" />

                {/* 🛠️ Features - Organized for clarity, inspired by airport screens */}
                <section className="mt-20 w-full max-w-7xl text-center px-4">
                    <h2 className="text-4xl font-bold mb-16 text-[#1b1b18] dark:text-[#EDEDEC]">Powerful Modules for Peak Performance</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        
                        {/* Feature Card 1: Flight Management */}
                        <div className="rounded-3xl border border-[#e5e5e0] bg-white p-10 shadow-lg transition hover:shadow-xl hover:translate-y-[-2px] dark:border-[#2b2b29] dark:bg-[#141414]">
                            <span className="text-4xl mb-4 inline-block text-blue-600">🗓️</span>
                            <h3 className="text-2xl font-semibold mb-3">Intelligent Scheduling</h3>
                            <p className="text-lg text-[#3b3b38] dark:text-[#bdbdbb]">Automate flight and crew rotations, instantly adapting to delays and compliance needs.</p>
                        </div>
                        
                        {/* Feature Card 2: Passenger Automation */}
                        <div className="rounded-3xl border border-[#e5e5e0] bg-white p-10 shadow-lg transition hover:shadow-xl hover:translate-y-[-2px] dark:border-[#2b2b29] dark:bg-[#141414]">
                            <span className="text-4xl mb-4 inline-block text-blue-600">🧑‍✈️</span>
                            <h3 className="text-2xl font-semibold mb-3">Crew & Resource Hub</h3>
                            <p className="text-lg text-[#3b3b38] dark:text-[#bdbdbb]">Manage pilot, cabin, and ground staff certifications, availability, and communications in one place.</p>
                        </div>
                        
                        {/* Feature Card 3: Real-Time Dashboards */}
                        <div className="rounded-3xl border border-[#e5e5e0] bg-white p-10 shadow-lg transition hover:shadow-xl hover:translate-y-[-2px] dark:border-[#2b2b29] dark:bg-[#141414]">
                            <span className="text-4xl mb-4 inline-block text-blue-600">📈</span>
                            <h3 className="text-2xl font-semibold mb-3">Live Operational Views</h3>
                            <p className="text-lg text-[#3b3b38] dark:text-[#bdbdbb]">Monitor flight status, gate assignments, and ground services with a real-time, airport control-tower-style dashboard.</p>
                        </div>
                    </div>
                </section>

                {/* 🌟 Final Call to Action - Clean, focused, and high-contrast */}
                <section className="mt-32 w-full max-w-7xl px-4 mb-20">
                    <div className="p-16 rounded-3xl bg-orange-400 shadow-2xl flex flex-col md:flex-row items-center justify-between text-white text-left">
                        <div className="md:max-w-xl mb-8 md:mb-0">
                            <p className="text-lg uppercase tracking-widest opacity-80 mb-2">Ready for Takeoff</p>
                            <h2 className="text-4xl font-extrabold leading-tight">
                                Get your airline platform up and running today.
                            </h2>
                        </div>
                        <Link
                            href={auth.user ? dashboard() : login()}
                            className="rounded-full bg-white px-10 py-4 text-xl font-bold text-orange-600 shadow-lg transition hover:bg-gray-100 hover:scale-[1.05] transform duration-300"
                        >
                            {auth.user ? 'Enter Control Center' : 'Start Free Trial'}
                        </Link>
                    </div>
                </section>
                
                {/* Simple Footer */}
                <footer className="w-full max-w-7xl text-center pt-4 text-sm text-[#3b3b38] dark:text-[#bdbdbb] border-t border-[#e5e5e0] dark:border-[#2b2b29]">
                    © {new Date().getFullYear()} Passenger Management System. All rights reserved. Larable
                </footer>
            </div>
        </>
    );
}