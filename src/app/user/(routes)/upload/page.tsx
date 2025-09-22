"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, TreePine, MapPin, Plus, Minus } from "lucide-react"
const page = () => {
  const [formData, setFormData] = useState({
    location: "",
    latitude: 0,
    longitude: 0,
    treesPlanted: 0,
  })
  const [files, setFiles] = useState<File[]>([])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { formData, files })
    // Handle form submission here
  }
  return (
    <div className="w-full flex items-center justify-center my-10 ">
      <Card className="shadow-xl w-2/3 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
            <TreePine className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">Register Your Tree Planting</CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            Share your contribution to reforestation efforts
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Field */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-blue-900 dark:text-blue-100 font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter the planting location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-blue-200 dark:border-blue-700"
              />
            </div>

            {/* Coordinates Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Latitude */}
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-blue-900 dark:text-blue-100 font-medium">
                  Latitude
                </Label>
                <div className="relative">
                  <Input
                    id="latitude"
                    type="number"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange("latitude", Number.parseInt(e.target.value) || 0)}
                    className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-blue-200 dark:border-blue-700"
                  />
                </div>
              </div>

              {/* Longitude */}
              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-blue-900 dark:text-blue-100 font-medium">
                  Longitude
                </Label>
                <div className="relative">
                  <Input
                    id="longitude"
                    type="number"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange("longitude", Number.parseInt(e.target.value) || 0)}
                    className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-blue-200 dark:border-blue-700"
                  />
                </div>
              </div>
            </div>

            {/* Number of Trees */}
            <div className="space-y-2">
              <Label htmlFor="trees" className="text-blue-900 dark:text-blue-100 font-medium flex items-center gap-2">
                <TreePine className="w-4 h-4" />
                Number of Trees Planted
              </Label>
              <Input
                id="trees"
                type="number"
                min="0"
                placeholder="Enter number of trees"
                value={formData.treesPlanted}
                onChange={(e) => handleInputChange("treesPlanted", Number.parseInt(e.target.value) || 0)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-blue-200 dark:border-blue-700"
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <Label className="text-blue-900 dark:text-blue-100 font-medium flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Images & Videos
              </Label>

              <div className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-6 text-center transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110">
                    <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-blue-700 dark:text-blue-300">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </div>
                  <div className="text-sm text-blue-500 dark:text-blue-400">Images and videos accepted</div>
                </label>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-blue-900 dark:text-blue-100 font-medium">Uploaded Files ({files.length})</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                      >
                        <span className="text-sm text-blue-800 dark:text-blue-200 truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-blue-600 hover:text-red-600 hover:bg-red-50 dark:text-blue-400 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              <TreePine className="w-5 h-5 mr-2" />
              Register Tree Planting
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

  )
}

export default page
