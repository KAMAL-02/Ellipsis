import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react"
import { PRFile } from '@/types/pr'

interface PRViewerProps {
  prFiles: PRFile[]
}

export default function PRViewer({ prFiles }: PRViewerProps) {
  return (
    <div className="space-y-4 p-4">
      {prFiles.map((file) => (
        <FileCard key={file.sha} file={file} />
      ))}
    </div>
  )
}

function FileCard({ file }: { file: PRFile }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">{file.filename}</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(file.status)}`}>
            {file.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-green-500">
            <Plus className="w-4 h-4 mr-1" />
            <span>{file.additions}</span>
          </div>
          <div className="flex items-center text-red-500">
            <Minus className="w-4 h-4 mr-1" />
            <span>{file.deletions}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-4"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" /> Hide Changes
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" /> Show Changes
            </>
          )}
        </Button>
        {isExpanded && file.patch && (
          <pre className="bg-slate-800 p-4 rounded-md overflow-x-auto">
            <code>{formatPatch(file.patch)}</code>
          </pre>
        )}
      </CardContent>
    </Card>
  )
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'added':
      return 'bg-green-100 text-green-800'
    case 'modified':
      return 'bg-yellow-100 text-yellow-800'
    case 'removed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function formatPatch(patch: string): JSX.Element {
  const lines = patch.split('\n')
  return (
    <>
      {lines.map((line, index) => {
        let className = ''
        if (line.startsWith('+')) {
          className = 'text-green-600'
        } else if (line.startsWith('-')) {
          className = 'text-red-600'
        } else if (line.startsWith('@')) {
          className = 'text-blue-600'
        }
        return (
          <div key={index} className={className}>
            {line}
          </div>
        )
      })}
    </>
  )
}