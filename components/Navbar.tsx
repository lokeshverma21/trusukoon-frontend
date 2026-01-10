"use client"
import React, { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import Link from 'next/link';

import { LogOut, MenuIcon, XIcon } from 'lucide-react'; // Install with `npm i lucide-react`
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { RootState } from '@/lib/store/store';
import { Button } from './ui/button';
import { logoutUser } from '@/lib/features/auth/authSlice';

function Navbar() {
  const dispatch = useAppDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);
  console.log(user)

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="w-full bg-background px-6 py-4 sticky top-0 z-50 font-heading">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 rounded-full p-2 border border-teal-200">
                  <span
                    className="block h-6 w-6 rounded-full"
                    style={{
                      background: "conic-gradient(from 90deg, #2ABBB1, #5AA7D8, #2ABBB1)",
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold tracking-wide text-primary">
                    TruSukoon
                  </span>
                  <span className="text-xs font-normal text-muted">
                    Your space for inner calm
                  </span>
                </div>
              </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-0">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-0">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-sm font-medium transition-colors">
                  <Link href={'/'}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-sm font-medium transition-colors">
                  <Link href={'/about-us'}>
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-sm font-medium transition-colors">
                  <Link href={'/contact-us'}>
                    Contact Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
{/* 
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-sm font-medium transition-colors">
                  <Link href={'/book-appointment'}>
                    Book Appointment
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}

              {/* <NavigationMenuItem>
                <NavigationMenuTrigger className='hover:bg-primary/40'>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/about-us">About Us</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">Contact Us</Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}

              {/* <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-sm font-medium transition-colors">
                  <Link href={'/my-appointments'}>
                    My Appointments
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="flex space-x-4 ml-6">
          {user === null ? 
          (
            <div className='flex gap-4'>
              <Link href={'/login'} className="text-sm px-4 py-2 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition">
                  Login
                </Link>
                {/* <Link href={'/signup'} className="text-sm px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition">
                  Get Started
                </Link> */}
            </div>
          )
          : (
            <div className='flex items-center justify-center gap-2'>
              {user.role === "admin" || user.role === "staff" ? (
                <Link href={'/admin'} className='bg-transparent hover:bg-accent/10 p-2 rounded-md hover:text-accent cursor-pointer text-primary'>
                  Dashboard
                </Link>
              ): (
                null
              )}

              <Button onClick={handleLogOut} className='bg-transparent cursor-pointer text-primary hover:text-white'>
                <LogOut className=' hover:text-white'/>
              </Button>
            </div>
          )}
            
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
        <div className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-9999 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-4 flex justify-between items-center border-b">
            <div className="text-lg font-bold text-primary">Menu</div>
            <button onClick={() => setMobileMenuOpen(false)}>
            <XIcon className="w-6 h-6 text-gray-700" />
            </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
            <Link href={'/'} className="text-sm font-medium text-gray-800 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            {/* <Link href={'/book-appointment'} className="text-sm font-medium text-gray-800 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Book Appointment</Link> */}
            <Link href={'/about-us'} className="text-sm font-medium text-gray-800 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href={'/contact-us'} className="text-sm font-medium text-gray-800 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
            {/* <Link href={'/my-appointments'} className="text-sm font-medium text-gray-800 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>My Appointments</Link> */}
            {/* <Link href="#" className="text-sm font-medium text-gray-800 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Recurring Booking</Link> */}
            {/* <Link href="#" className="text-sm font-medium text-gray-800 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Consultation</Link> */}
        </div>

        <div className="mt-auto p-4 border-t">
          {user === null ? (
            <div>
              <Link href={'/login'}>
                <button className="w-full mb-2 text-sm px-4 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white transition">
                  Login
                </button>
              </Link>
              <Link href={'/signup'}>
                <button className="w-full text-sm px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
                  Get Started
                </button>
              </Link>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center gap-2'>
              {user.role === "admin" || user.role === "staff" ? (
                <Link href={'/admin'} className='bg-transparent border  w-full text-center border-primary hover:bg-accent/10 p-2 rounded-md hover:text-accent cursor-pointer text-primary'>
                  Dashboard
                </Link>
              ): (
                null
              )}

              <Button onClick={handleLogOut} className='bg-primary text-white border border-accent w-full cursor-pointer hover:text-white'>
                Logout <LogOut className=' hover:text-white'/>
              </Button>
            </div>
          )}
        </div>
        </div>

    </div>
  );
}

export default Navbar;
