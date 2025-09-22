"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TreePine, Users, MapPin, TrendingUp, Shield, Flag, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for demonstration
const mockPublicEntries = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "/diverse-woman-avatar.png",
    },
    location: "Central Park, New York",
    treesPlanted: 150,
    hashCode: "a1b2c3d4e5f6",
    isVerified: true,
    credits: 750,
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    user: {
      name: "Miguel Rodriguez",
      avatar: "/man-avatar.png",
    },
    location: "Amazon Rainforest, Brazil",
    treesPlanted: 500,
    hashCode: "f6e5d4c3b2a1",
    isVerified: true,
    credits: 2500,
    timestamp: "2024-01-14T14:45:00Z",
  },
  {
    id: "3",
    user: {
      name: "Aisha Patel",
      avatar: "/woman-indian-avatar.jpg",
    },
    location: "Mumbai Urban Forest, India",
    treesPlanted: 75,
    hashCode: "9z8y7x6w5v4u",
    isVerified: false,
    credits: 375,
    timestamp: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    user: {
      name: "James Wilson",
      avatar: "/man-beard-avatar.png",
    },
    location: "Yellowstone National Park, USA",
    treesPlanted: 200,
    hashCode: "u4v5w6x7y8z9",
    isVerified: true,
    credits: 1000,
    timestamp: "2024-01-12T16:20:00Z",
  },
  {
    id: "5",
    user: {
      name: "Emma Thompson",
      avatar: "/woman-blonde-avatar.jpg",
    },
    location: "Black Forest, Germany",
    treesPlanted: 300,
    hashCode: "3c4d5e6f7g8h",
    isVerified: true,
    credits: 1500,
    timestamp: "2024-01-11T11:00:00Z",
  },
  {
    id: "6",
    user: {
      name: "Kenji Tanaka",
      avatar: "/man-asian-avatar.jpg",
    },
    location: "Mount Fuji Area, Japan",
    treesPlanted: 120,
    hashCode: "h8g7f6e5d4c3",
    isVerified: false,
    credits: 600,
    timestamp: "2024-01-10T13:30:00Z",
  },
]

export default function PublicPage() {
  const [visibleRows, setVisibleRows] = useState<string[]>([])

  // Calculate statistics
  const totalTrees = mockPublicEntries.reduce((sum, entry) => sum + entry.treesPlanted, 0)
  const totalUsers = mockPublicEntries.length
  const verifiedEntries = mockPublicEntries.filter((entry) => entry.isVerified).length
  const totalCredits = mockPublicEntries.reduce((sum, entry) => sum + entry.credits, 0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rowId = entry.target.getAttribute("data-row-id")
            if (rowId) {
              setVisibleRows((prev) => [...new Set([...prev, rowId])])
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    const rowElements = document.querySelectorAll("[data-row-id]")
    rowElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className=" backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl text-center font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Global Tree Registry
            </h1>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <TreePine className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Total Trees</span>
              </div>
              <p className="text-2xl font-bold text-green-800">{totalTrees.toLocaleString()}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Contributors</span>
              </div>
              <p className="text-2xl font-bold text-blue-800">{totalUsers}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Verified</span>
              </div>
              <p className="text-2xl font-bold text-purple-800">{verifiedEntries}</p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">Total Credits</span>
              </div>
              <p className="text-2xl font-bold text-orange-800">{totalCredits.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100 shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-blue-100">
                <tr>
                  <th className="text-left p-4 font-semibold text-blue-800">Contributor</th>
                  <th className="text-left p-4 font-semibold text-blue-800">Location</th>
                  <th className="text-center p-4 font-semibold text-blue-800">Trees Planted</th>
                  <th className="text-center p-4 font-semibold text-blue-800">Status</th>
                  <th className="text-center p-4 font-semibold text-blue-800">Credits</th>
                  <th className="text-left p-4 font-semibold text-blue-800">Date</th>
                  <th className="text-left p-4 font-semibold text-blue-800">Hash Code</th>
                  <th className="text-center p-4 font-semibold text-blue-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPublicEntries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    data-row-id={entry.id}
                    className={`border-b border-blue-50 hover:bg-blue-25 transition-all duration-300 ${
                      visibleRows.includes(entry.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200">
                          <Image
                            src={entry.user.avatar || "/placeholder.svg"}
                            alt={entry.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{entry.user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-700">{entry.location}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                        <TreePine className="h-4 w-4" />
                        {entry.treesPlanted}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      {entry.isVerified ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-orange-600">{entry.credits.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600">{formatDate(entry.timestamp)}</span>
                    </td>
                    <td className="p-4">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-700">
                        {entry.hashCode}
                      </code>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {mockPublicEntries.map((entry, index) => (
              <div
                key={entry.id}
                data-row-id={entry.id}
                className={`bg-white rounded-lg border border-blue-100 p-4 shadow-sm transition-all duration-300 ${
                  visibleRows.includes(entry.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
                      <Image
                        src={entry.user.avatar || "/placeholder.svg"}
                        alt={entry.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{entry.user.name}</p>
                      <p className="text-sm text-gray-600">{formatDate(entry.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {entry.isVerified ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-700">{entry.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                      <TreePine className="h-4 w-4" />
                      {entry.treesPlanted} trees
                    </div>
                    <span className="font-semibold text-orange-600">{entry.credits.toLocaleString()} credits</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-700">
                      {entry.hashCode}
                    </code>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="bg-white/80 backdrop-blur-sm border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            Load More Entries
          </Button>
        </div>
      </div>
    </div>
  )
}
