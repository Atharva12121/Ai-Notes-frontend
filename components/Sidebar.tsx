"use client";
import { cn } from "@/components/lib/utils";


import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconHome,
  IconNote,
  IconPlus
} from "@tabler/icons-react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CardSpotlightDemo } from "./notes_header_cards";

const PinContainer = dynamic(() => import("@/components/ui/3d-pin").then(mod => mod.PinContainer), {
  ssr: false,
});

export  function SidebarDemo() {
  
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        
        <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "My Notes",
      href: "#",
      icon: (
        <IconNote  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Add Note",
      href: "/Addnotes",
      icon: (
        <IconPlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex h-screen w-screen flex-col md:flex-row overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800", 
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        AI Notes
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

// Dummy dashboard component with content

const Dashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="relative flex flex-col flex-1">
      <div className="flex h-full w-full flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        {/* Fullscreen toggle button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="self-end px-4 py-2 mb-4shadow-[inset_0_0_0_2px_#616467] text-black  rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
        >
          Go Fullscreen
        </button>

        {/* Regular content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full ">
          <CardSpotlightDemo />

          {[...new Array(3)].map((_, idx) => (
            <div
              key={`box-${idx}`}
              className="h-20 animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>

        {/* Shared grid section — styled normally or as fullscreen based on state */}
        <div
         className={`${
  isFullscreen
    ? "fixed top-0 left-0 z-50 w-full h-full bg-neutral-800 overflow-y-scroll overscroll-contain scroll-smooth p-6"
    : "relative mt-10"
} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-300 dark:bg-neutral-800 overflow-y-auto max-h-screen p-4`}

        >
          {/* Close button shown only when fullscreen */}
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-50 px-6 py-3shadow-[inset_0_0_0_2px_#616467] text-black  py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
            >
              Close
            </button>
          )}

          {[...Array(4)].map((_, idx) => (
            <div
              key={`pin-${idx}`}
              className="flex items-center justify-center w-full mt-12"
            >
              <PinContainer
                title="/ui.aceternity.com"
                href="https://twitter.com/mannupaaji"
              >
                <div className="flex flex-col w-[28rem] h-[21.25rem] max-w-full p-4 tracking-tight text-slate-100/50">
                  <h3 className="pb-2 m-0 font-bold text-base text-slate-100">
                    Aceternity UI
                  </h3>
                  <div className="text-base m-0 p-0 font-normal">
                    <span className="text-slate-500">
                      Customizable Tailwind CSS and Framer Motion Components.
                    </span>
                  </div>
                  <div className="flex flex-1 w-full mt-4 rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
