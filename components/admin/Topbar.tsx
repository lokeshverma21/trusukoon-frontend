"use client"

import { Fragment } from "react"
import { Disclosure, Menu } from "@headlessui/react"
import { MenuIcon, X, Bell } from "lucide-react"
import Image from "next/image"
import MaximizeScreen from "./MaximizeScreen"
import { SidebarTrigger } from "../ui/sidebar"
import { Button } from "../ui/button"
import { IconMenu2 } from "@tabler/icons-react"

// const navigation = [
//   // { name: "Dashboard", href: "#", current: true },
// ]

function classNames(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Topbar() {
  return (
    <Disclosure
      as="nav"
      className="relative bg-white border-b dark:bg-gray-800/50 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <SidebarTrigger>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <IconMenu2 className="size-5" />
                  </Button>
                </SidebarTrigger>
              </div>

              {/* Logo & desktop menu */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <div className="text-xl font-bold text-primary">
                    {/* logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-100 rounded-full p-2 border border-teal-200">
                          <span
                            className="block h-4 w-4 rounded-full"
                            style={{
                              background: "conic-gradient(from 90deg, #2ABBB1, #5AA7D8, #2ABBB1)",
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold tracking-wide text-primary">
                            TruSukoon
                          </span>
                          <span className="hidden md:block text-xs font-normal text-muted">
                            Your space for inner calm
                          </span>
                        </div>
                      </div>
                </div>
                </div>
              </div>

              {/* Right section */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                <MaximizeScreen/>
                
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="size-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <Image
                        width={10}
                        height={10}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                    />
                  </Menu.Button>

                  <Menu.Items
                    as="div"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 dark:bg-gray-800 dark:shadow-none dark:outline-white/10"
                  >
                    {["Your profile", "Settings", "Sign out"].map((item) => (
                      <Menu.Item key={item}>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 dark:bg-white/5"
                                : "",
                              "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                            )}
                          >
                            {item}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
