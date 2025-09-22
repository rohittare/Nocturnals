"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TreePine, MapPin, Globe, ImageIcon, Video } from "lucide-react"

interface TreePlantingData {
  location: string
  latitude: number
  longitude: number
  treesPlanted: number
  files: File[]
}

interface WaitingCardProps {
  data: TreePlantingData
}

export function WaitingCard({ data }: WaitingCardProps) {
  const imageFiles = data.files.filter((file) => file.type.startsWith("image/"))
  const videoFiles = data.files.filter((file) => file.type.startsWith("video/"))

  return (
    <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4">
      <CardContent className="space-y-6">
        {/* Location Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-medium">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Location
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 transition-colors duration-200">
            <p className="text-blue-800 dark:text-blue-200 font-medium text-lg">{data.location}</p>
          </div>
        </div>

        {/* Coordinates Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-medium">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Coordinates
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 transition-colors duration-200">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Latitude</div>
              <div className="text-blue-800 dark:text-blue-200 font-mono text-xl font-bold">{data.latitude}°</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 transition-colors duration-200">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Longitude</div>
              <div className="text-blue-800 dark:text-blue-200 font-mono text-xl font-bold">{data.longitude}°</div>
            </div>
          </div>
        </div>

        {/* Trees Planted - Highlighted Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-medium">
            <TreePine className="w-5 h-5 text-green-600 dark:text-green-400" />
            Trees Planted
          </div>
          <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/40 dark:to-blue-900/40 rounded-lg p-6 border-2 border-green-200 dark:border-green-700 transition-all duration-300 hover:shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">
                {data.treesPlanted.toLocaleString()}
              </div>
              <Badge variant="secondary" className="bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200">
                Trees Planted
              </Badge>
            </div>
          </div>
        </div>

        {/* Media Section */}
        {(imageFiles.length > 0 || videoFiles.length > 0) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-medium">
              <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Uploaded Media ({data.files.length})
            </div>

            {/* Images Grid */}
            {imageFiles.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Images ({imageFiles.length})</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {imageFiles.map((file, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-blue-50 dark:bg-blue-900/30 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    >
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {videoFiles.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                  <Video className="w-4 h-4" />
                  Videos ({videoFiles.length})
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videoFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/30 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      <video controls className="w-full h-48 object-cover" preload="metadata">
                        <source src={URL.createObjectURL(file)} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                      <div className="p-3">
                        <div className="text-sm text-blue-700 dark:text-blue-300 truncate">{file.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary Badge */}
        <div className="pt-4 border-t border-blue-200 dark:border-blue-700">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300">
              📍 {data.location}
            </Badge>
            <Badge
              variant="outline"
              className="border-green-300 text-green-700 dark:border-green-600 dark:text-green-300"
            >
              🌳 {data.treesPlanted} trees
            </Badge>
            {data.files.length > 0 && (
              <Badge
                variant="outline"
                className="border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300"
              >
                📸 {data.files.length} files
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
