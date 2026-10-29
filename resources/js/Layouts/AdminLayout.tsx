import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';

export default function AdminLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const pageProps = usePage().props as any;
    const user = pageProps.auth?.admin || pageProps.auth?.user;
    const flashSuccess = pageProps.flash?.success;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Close mobile nav on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowingNavigationDropdown(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (showingNavigationDropdown) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showingNavigationDropdown]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            {/* Logo */}
                            <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
                                <ApplicationLogo className="block h-8 w-auto transition-transform group-hover:scale-105" />
                                <div className="flex flex-col">
                                    <span className="font-serif tracking-widest text-sm font-semibold text-[#0F204B] uppercase leading-none">
                                        Ourélia
                                    </span>
                                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-amber-700 mt-0.5">
                                        Admin Panel
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Links */}
                            <div className="hidden space-x-6 lg:space-x-8 sm:-my-px sm:ms-8 sm:flex">
                                <NavLink
                                    href={route('admin.dashboard')}
                                    active={route().current('admin.dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('admin.products.index')}
                                    active={route().current('admin.products.*')}
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                    href={route('admin.orders.index')}
                                    active={route().current('admin.orders.index')}
                                >
                                    Orders Kanban
                                </NavLink>
                                <NavLink
                                    href={route('admin.orders.list')}
                                    active={route().current('admin.orders.list')}
                                >
                                    Orders List
                                </NavLink>
                                {user?.is_super_admin && (
                                    <NavLink
                                        href={route('admin.admins.index')}
                                        active={route().current('admin.admins.*')}
                                    >
                                        Administrators
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* Desktop User Menu & Storefront Link */}
                        <div className="hidden sm:flex sm:items-center sm:gap-3">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                title="Open customer storefront in a new tab"
                            >
                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Storefront
                            </a>

                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#0F204B] text-white flex items-center justify-center text-xs font-bold mr-2">
                                                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                                            </div>
                                            <span className="max-w-[120px] truncate">{user?.name || 'Admin'}</span>

                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4 text-gray-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">
                                            Signed in as <strong className="text-gray-800">{user?.email}</strong>
                                            {user?.is_super_admin && (
                                                <span className="block mt-0.5 text-[10px] font-bold text-purple-700">Super Administrator</span>
                                            )}
                                        </div>
                                        <Dropdown.Link
                                            href={route('admin.logout')}
                                            method="post"
                                            as="button"
                                            className="text-red-600 hover:bg-red-50"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Hamburger & Actions */}
                        <div className="flex items-center gap-1 sm:hidden">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-500 hover:text-gray-700"
                                title="View Storefront"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>

                            <button
                                type="button"
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                aria-label="Toggle navigation menu"
                                className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    {showingNavigationDropdown ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Backdrop & Drawer Menu */}
                {showingNavigationDropdown && (
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden transition-opacity"
                        onClick={() => setShowingNavigationDropdown(false)}
                        aria-hidden="true"
                    />
                )}

                <div
                    className={`fixed top-16 right-0 bottom-0 w-[82vw] max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-200 ease-in-out sm:hidden flex flex-col justify-between overflow-y-auto border-l border-gray-200 ${
                        showingNavigationDropdown ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="py-4 space-y-1">
                        <div className="px-4 pb-2 mb-2 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Navigation</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Admin</span>
                        </div>

                        <ResponsiveNavLink
                            href={route('admin.dashboard')}
                            active={route().current('admin.dashboard')}
                            onClick={() => setShowingNavigationDropdown(false)}
                            className="flex items-center gap-3 px-4 py-3"
                        >
                            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Dashboard</span>
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('admin.products.index')}
                            active={route().current('admin.products.*')}
                            onClick={() => setShowingNavigationDropdown(false)}
                            className="flex items-center gap-3 px-4 py-3"
                        >
                            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>Products</span>
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('admin.orders.index')}
                            active={route().current('admin.orders.index')}
                            onClick={() => setShowingNavigationDropdown(false)}
                            className="flex items-center gap-3 px-4 py-3"
                        >
                            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                            <span>Orders Kanban</span>
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('admin.orders.list')}
                            active={route().current('admin.orders.list')}
                            onClick={() => setShowingNavigationDropdown(false)}
                            className="flex items-center gap-3 px-4 py-3"
                        >
                            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <span>Orders List</span>
                        </ResponsiveNavLink>

                        {user?.is_super_admin && (
                            <ResponsiveNavLink
                                href={route('admin.admins.index')}
                                active={route().current('admin.admins.*')}
                                onClick={() => setShowingNavigationDropdown(false)}
                                className="flex items-center gap-3 px-4 py-3"
                            >
                                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span>Administrators</span>
                            </ResponsiveNavLink>
                        )}

                        <div className="pt-2 px-4">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span>View Storefront</span>
                            </a>
                        </div>
                    </div>

                    {/* Admin User Info & Logout on Mobile */}
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full bg-[#0F204B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-semibold text-gray-900 truncate">
                                    {user?.name || 'Administrator'}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {user?.email}
                                </div>
                                {user?.is_super_admin && (
                                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wide">
                                        Super Admin
                                    </span>
                                )}
                            </div>
                        </div>

                        <ResponsiveNavLink
                            method="post"
                            href={route('admin.logout')}
                            as="button"
                            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-white border border-gray-200 text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Log Out</span>
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-white border-b border-gray-200/80 shadow-xs">
                    <div className="mx-auto max-w-7xl px-4 py-3 sm:py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Flash Messages */}
            {flashSuccess && (
                <div className="mx-auto max-w-7xl w-full px-4 pt-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-green-50 p-3.5 sm:p-4 border border-green-200 text-sm text-green-800 flex items-center gap-3 shadow-xs">
                        <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="flex-1">{flashSuccess}</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 w-full">{children}</main>
        </div>
    );
}

