"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/user/submission", label: "Submissions" },
    { href: "/user/NFTs", label: "NFTs" },
]
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                            <div className="h-4 w-4 rounded-sm bg-primary-foreground" />
                        </div>
                        <Link
                            href="/submission"
                            className="text-xl font-bold text-blue-500"
                        >
                            Nocturnals
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative text-sm font-medium text-gray-700 transition-colors duration-300 group hover:text-blue-500"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>


                        <Button variant="destructive" size="sm" className="hover:bg-destructive/90 transition-colors duration-300">
                            Logout
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="sm" onClick={toggleMenu} className="p-2" aria-label="Toggle menu">
                            {isMenuOpen ? (
                                <X className="h-5 w-5 transition-transform duration-300 rotate-90" />
                            ) : (
                                <Menu className="h-5 w-5 transition-transform duration-300" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-border">
                        <div className="py-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block px-4 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-muted rounded-md transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="px-4 pt-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-full hover:bg-destructive/90 transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar


