"use client"

import {WaitingCard} from "../../WaitingCard"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TreePine, Users, Globe } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const mockSubmissions = [
  {
    location: "Central Park, New York",
    latitude: 40,
    longitude: -74,
    treesPlanted: 150,
    files: [] as File[],
  },
  {
    location: "Golden Gate Park, San Francisco",
    latitude: 37,
    longitude: -122,
    treesPlanted: 89,
    files: [] as File[],
  },
  {
    location: "Hyde Park, London",
    latitude: 51,
    longitude: 0,
    treesPlanted: 234,
    files: [] as File[],
  },
  {
    location: "Shibuya Park, Tokyo",
    latitude: 35,
    longitude: 139,
    treesPlanted: 67,
    files: [] as File[],
  },
  {
    location: "Vondelpark, Amsterdam",
    latitude: 52,
    longitude: 4,
    treesPlanted: 112,
    files: [] as File[],
  },
  {
    location: "Retiro Park, Madrid",
    latitude: 40,
    longitude: -3,
    treesPlanted: 198,
    files: [] as File[],
  },
]

export default function SubmissionsPage() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([])

  const totalTrees = mockSubmissions.reduce((sum, submission) => sum + submission.treesPlanted, 0)
  const totalLocations = mockSubmissions.length
  const averageTrees = Math.round(totalTrees / totalLocations)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const cardElements = document.querySelectorAll("[data-index]")
    cardElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">Tree Planting Feed</h1>
            <p className="text-blue-700 dark:text-blue-300 text-lg mb-6">
              Discover tree planting efforts from around the world
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TreePine className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Trees</span>
                </div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {totalTrees.toLocaleString()}
                </div>
              </div>

              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Locations</span>
                </div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalLocations}</div>
              </div>

              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Avg per Site</span>
                </div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{averageTrees}</div>
              </div>
            </div>
          </div>
        </div>

        {mockSubmissions.length > 0 && (
          <div className="space-y-6">
            {mockSubmissions.map((submission, index) => (
              <div
                key={index}
                data-index={index}
                className={`transition-all duration-700 ease-out transform ${
                  visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } hover:scale-[1.02] hover:shadow-2xl`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <WaitingCard data={submission} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State Message */}
        {mockSubmissions.length === 0 && (
          <div className="text-center py-16">
            <TreePine className="w-16 h-16 text-blue-400 dark:text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">No submissions yet</h3>
            <p className="text-blue-600 dark:text-blue-400 mb-6">
              Upload your tree planting data.
            </p>
            <Link href="/user/upload">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Submit Your Data</Button>
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-blue-600 dark:text-blue-400 text-sm">
            Together we're making the world greener, one tree at a time 🌱
          </p>
        </div>
      </div>
    </main>
  )
}
