"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import "../Navbar/Navbar.css";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */
const servicesLinks = [
  {
    label: "Business Setup Solution",
    sub: [
      { label: "Company Registration", href: "/company-registration" },
      { label: "LLP Formation", href: "/llp-formation" },
      { label: "Startup India Support", href: "/startup-india-support" },
    ],
  },
  {
    label: "Book Keeping & Accounting",
    sub: [
      { label: "Tally & QuickBooks", href: "/tally-quickbooks" },
      { label: "MIS Reports", href: "/mis-reports" },
      { label: "Payroll Services", href: "/payroll-services" },
    ],
  },
  {
    label: "Taxation Related Services",
    sub: [
      { label: "Income Tax Filing", href: "/income-tax-filing" },
      { label: "Tax Planning", href: "/tax-planning" },
      { label: "TDS Compliance", href: "/tds-compliance" },
    ],
  },
  {
    label: "ROC Compliances",
    sub: [
      { label: "Annual Filings", href: "/annual-filings" },
      { label: "Director KYC", href: "/director-kyc" },
      { label: "DIN Compliance", href: "/din-compliance" },
    ],
  },
  {
    label: "Audit & Assurance",
    sub: [
      { label: "Statutory Audit", href: "/statutory-audit" },
      { label: "Internal Audit", href: "/internal-audit" },
      { label: "Management Audit", href: "/management-audit" },
    ],
  },
  {
    label: "International Taxation",
    sub: [
      { label: "Transfer Pricing", href: "/transfer-pricing" },
      { label: "DTAA Advisory", href: "/dtaa-advisory" },
      { label: "NRI Tax Filing", href: "/nri-tax" },
    ],
  },
  {
    label: "GST Related Services",
    sub: [{ label: "GST Registration", href: "/gst-registration" }],
  },
];

/* ------------------------------------------------------------------ */
/* navbar                                                              */
/* ------------------------------------------------------------------ */
const Navbar = ({ className = "" }) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => setServicesOpen(false), [pathname]);

  const handleCloseDrawer = () => setDrawerOpen(false);

  return (
    <nav className="py-3 bg-background/70 border-b-white !sticky !top-0 backdrop-blur z-50 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo and Title */}
       {/* Logo and Title Combined */}
<Link href="/" className={`flex items-center  group ${className}`}>
  <img
    src="/logo.png"
    alt="Chintan Agrawal & Co. Logo"
    className="w-15 h-16 object-contain" // Adjust size if needed
    loading="lazy"
  />
  <span className="leading-none">
    <h1 className="text-lg md:text-md font-bold tracking-tight text-[#004AAD]">
      Chintan Agrawal <span className="text-green-600">& Co</span>
    </h1>
    <p className="text-[8px] md:text-xs uppercase tracking-wider text-gray-600">
      Chartered Accountants

    </p>
    <p className="text-[10px] italic tracking-wider text-gray-600">Towards Excellence</p>
  </span>
</Link>


        <div className="hidden md:flex space-x-5 items-center text-base font-medium text-lg font-bold relative">
          {[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative group inline-block px-2 py-1 transition-all duration-300 ${
                isActive(link.href) ? "text-[#013B7A]" : ""
              }`}
            >
              <span className="group-hover:text-[#013B7A]">{link.label}</span>
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 bg-[#013B7A] transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <div className="flex items-center cursor-pointer px-2">
              <span
                className={`transition-colors duration-300 ${
                  pathname.startsWith("/services") || servicesOpen
                    ? "text-[#013B7A]"
                    : "group-hover:text-[#013B7A]"
                }`}
              >
                Services
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  servicesOpen ? "rotate-180 text-[#013B7A]" : ""
                }`}
              />
            </div>

            {servicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 w-[830px] bg-white border border-[#2AB55E] rounded-md shadow-xl z-50 p-6 grid grid-cols-3 gap-6 max-h-[90vh] overflow-y-auto">
                {servicesLinks.map((item) => (
                  <div key={item.label} className="group/item p-3 rounded-md hover:bg-green-100/50">
                    <p className="block text-[16px] font-semibold text-gray-800 group-hover/item:text-[#004AAD]">
                      {item.label}
                    </p>

                    {item.sub.map((subItem) => (
                      <li key={subItem.href} className="relative pl-4 group list-none">
                        <Link
                          href={subItem.href}
                          className="flex items-center text-gray-600 hover:text-[#004AAD] transition-all duration-200"
                        >
                          <span className="absolute left-0 opacity-0 translate-x-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1">
                            ➜
                          </span>
                          <span className="transition-transform text-[15px] duration-200 group-hover:translate-x-1">
                            {subItem.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {[
            { label: "Publication", href: "/publication" },
            { label: "Industries", href: "/industries" },
            { label: "Knowledge Hub", href: "/knowledge" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative group inline-block px-2 py-1 transition-all duration-300 ${
                isActive(link.href) ? "text-[#013B7A]" : ""
              }`}
            >
              <span className="group-hover:text-[#013B7A]">{link.label}</span>
              <span
                className={`absolute left-0 -bottom-0.5 h-0.5 bg-[#013B7A] transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          <div className="flex justify-center md:justify-start">
            <Link href="/contact-us">
              <button className="btn capitalize">Contact Us</button>
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col gap-4 pt-5 text-md">
                    <Link href="/" className={isActive("/") ? "text-[#013B7A]" : ""} onClick={handleCloseDrawer}>Home</Link>
                    <Link href="/about" className={isActive("/about") ? "text-[#013B7A]" : ""} onClick={handleCloseDrawer}>About Us</Link>

                    <MobileDropdown title="Services" links={servicesLinks} onNavigate={handleCloseDrawer} />

                    <Link href="/publication" className={isActive("/publication") ? "text-[#013B7A]" : ""} onClick={handleCloseDrawer}>Publication</Link>
                    <Link href="/industries" className={isActive("/industries") ? "text-[#013B7A]" : ""} onClick={handleCloseDrawer}>Industries</Link>
                    <Link href="/knowledge" className={isActive("/knowledge") ? "text-[#013B7A]" : ""} onClick={handleCloseDrawer}>Knowledge Hub</Link>

                    <div className="flex justify-center md:justify-start">
                      <Link href="/contact-us" onClick={handleCloseDrawer}>
                        <button className="btn capitalize">Contact Us</button>
                      </Link>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};



const MobileDropdown = ({ title, links, onNavigate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const toggleGroup = (label) =>
    setExpanded(expanded === label ? null : label);

  return (
    <div className="pt-2">
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="w-full text-left font-semibold flex justify-between items-center"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            drawerOpen ? "rotate-180" : ""
          }`}
        />
      </button>

{drawerOpen && (
        <div className="mt-2 pl-2 space-y-2">
          {links.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => toggleGroup(item.label)}
                className="w-full flex justify-between items-center text-[#013B7A] font-medium py-2"
              >
                <span>{item.label}</span>
                {item.sub && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expanded === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {expanded === item.label && item.sub && (
                <ul className="pl-4 space-y-1 pb-2">
                  {item.sub.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        onClick={onNavigate}
                        className="block text-md text-gray-600 hover:text-[#013B7A] py-1"
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
