"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseClient";

// Icon Components - Simple Gray Icons (no color in icons themselves, color applied by parent)
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
  </svg>
);

const PeopleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const PayrollIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M2 12h20M2 6h20M2 18h20"/>
  </svg>
);

const EngageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
  </svg>
);

const ITIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

const KnowledgeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
  </svg>
);

const MoreIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const HelpIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7"/>
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
  </svg>
);

// More Menu Icons
const KnowledgeHubIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
  </svg>
);

const AppsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/>
  </svg>
);

const DeveloperIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
  </svg>
);

const ServicesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
  </svg>
);

const PluginsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
  </svg>
);

const ConsultingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  </svg>
);

const ToolsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);

const RewardsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
  </svg>
);

const AutomationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
  </svg>
);

const AIWorkforceIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>
);

const AnonymousReportingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
  </svg>
);

const BenefitsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
  </svg>
);

const CompensationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

interface DashboardNavProps {
  activePage?: 'home' | 'people' | 'payroll' | 'engage' | 'it';
}

export default function DashboardNav({ activePage = 'home' }: DashboardNavProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [userRole, setUserRole] = useState<string>("admin"); // Default to admin for now
  const menuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  
  const handleNavigation = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  // Fetch user role on component mount
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const supabase = supabaseBrowser();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("role")
            .eq("user_id", user.id)
            .single();
          
          if (profile?.role) {
            setUserRole(profile.role);
          }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = supabaseBrowser();
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };

    if (showUserMenu || showMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showUserMenu, showMoreMenu]);

  // Define menu items with role-based access
  const allTopMenuItems = [
    { label: "Home", icon: HomeIcon, href: "/dashboard", roles: ["admin", "hr", "manager", "employee"] },
    { label: "People", icon: PeopleIcon, href: "/people", roles: ["admin", "hr"] },
    { label: "Payroll", icon: PayrollIcon, href: "/dashboard", roles: ["admin", "hr"] },
    { label: "Engage", icon: EngageIcon, href: "/dashboard", roles: ["admin", "hr", "manager"] },
    { label: "IT", icon: ITIcon, href: "/dashboard", roles: ["admin", "it"] },
    { label: "More", icon: MoreIcon, href: "/dashboard", roles: ["admin", "hr", "manager", "employee", "it"] },
  ];

  // Filter menu items based on user role
  const topMenuItems = allTopMenuItems.filter(item => item.roles.includes(userRole));

  // Define more menu items with role-based access
  const allMoreMenuItems = [
    { label: "Knowledge Hub", icon: KnowledgeHubIcon, roles: ["admin", "hr", "manager", "employee"] },
    { label: "Analytics", icon: AnalyticsIcon, roles: ["admin", "hr"] },
    { label: "Apps", icon: AppsIcon, roles: ["admin", "hr", "it"] },
    { label: "Developer", icon: DeveloperIcon, roles: ["admin", "it"] },
    { label: "Services", icon: ServicesIcon, roles: ["admin", "hr"] },
    { label: "VOQ Plugins", icon: PluginsIcon, roles: ["admin", "it"] },
    { label: "Consulting", icon: ConsultingIcon, roles: ["admin", "hr"] },
    { label: "Tools", icon: ToolsIcon, roles: ["admin", "hr", "it"] },
    { label: "Rewards", icon: RewardsIcon, roles: ["admin", "hr"] },
    { label: "Automation", icon: AutomationIcon, roles: ["admin", "it"] },
    { label: "VOQ AI", icon: AIWorkforceIcon, roles: ["admin"] },
    { label: "AI Workforce", icon: AIWorkforceIcon, roles: ["admin"] },
    { label: "Anonymous Reporting", icon: AnonymousReportingIcon, roles: ["admin", "hr", "manager", "employee"] },
    { label: "Benefits", icon: BenefitsIcon, roles: ["admin", "hr", "manager", "employee"] },
    { label: "Compensation", icon: CompensationIcon, roles: ["admin", "hr"] },
  ];

  // Filter more menu items based on user role
  const moreMenuItems = allMoreMenuItems.filter(item => item.roles.includes(userRole));

  const getActiveItem = () => {
    const map: { [key: string]: string } = {
      'home': 'Home',
      'people': 'People',
      'payroll': 'Payroll',
      'engage': 'Engage',
      'it': 'IT',
    };
    return map[activePage] || 'Home';
  };

  const activeLabel = getActiveItem();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white rounded flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
              d.
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-xs sm:text-sm font-medium">
                <span className="truncate">VOQ-demo</span>
                <ChevronDownIcon />
              </div>
              <div className="text-xs text-gray-500 hidden sm:block">All groups</div>
            </div>
          </div>
        </div>

        {/* Middle - Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {topMenuItems.map((item) => {
            const isActive = item.label === activeLabel;
            const isMore = item.label === "More";
            
            if (isMore) {
              return (
                <div key={item.label} className="relative inline-flex" ref={moreMenuRef}>
                  <button
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 whitespace-nowrap"
                  >
                    <div className="w-5 h-5">
                      <item.icon />
                    </div>
                    <span>{item.label}</span>
                  </button>
                  
                  {showMoreMenu && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="grid grid-cols-4 gap-0 p-2">
                        {moreMenuItems.map((moreItem) => (
                          <button
                            key={moreItem.label}
                            className="flex flex-col items-center justify-center p-4 rounded-md hover:bg-gray-50 transition-colors border border-transparent"
                          >
                            <div className="text-gray-700 mb-2">
                              <moreItem.icon />
                            </div>
                            <span className="text-xs text-center text-gray-700">{moreItem.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <button
                key={item.label}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.href);
                }}
                disabled={isPending}
                className={`flex items-center gap-2 whitespace-nowrap cursor-pointer ${isActive ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'} ${isPending ? 'opacity-50' : ''}`}
              >
                <div className="w-5 h-5">
                  <item.icon />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"/>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"/>
              )}
            </svg>
          </button>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
            <SearchIcon />
            <span className="hidden lg:inline">K</span>
          </button>
          <button className="relative text-gray-600 hover:text-gray-900">
            <SettingsIcon />
            {activePage === 'home' && <span className="absolute top-0 right-0 w-1 h-1 bg-gray-600 rounded-full"></span>}
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <HelpIcon />
          </button>
          <button className="relative text-gray-600 hover:text-gray-900">
            <BellIcon />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </button>
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded"
            >
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                JO
              </div>
              <ChevronDownIcon />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <LogoutIcon />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 pt-3 mt-3">
          <div className="flex flex-col gap-2 mb-3">
            {topMenuItems.map((item) => {
              const isActive = item.label === activeLabel;
              return (
                <button
                  key={item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    handleNavigation(item.href);
                  }}
                  disabled={isPending}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer w-full text-left ${
                    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                  } ${isPending ? 'opacity-50' : ''}`}
                >
                  <div className="w-5 h-5">
                    <item.icon />
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                JO
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <LogoutIcon />
                <span>Logout</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <SearchIcon />
              </button>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <BellIcon />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <SettingsIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

