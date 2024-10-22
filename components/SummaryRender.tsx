import React from 'react'
import Loader from './Loader'

interface TextRendererProps {
  summary: string
  loading: Boolean
}

const SummaryRenderer: React.FC<TextRendererProps> = ({ summary, loading}) => {
  return (
    <div className="w-1/2 text-base font-semibold text-white mr-6 pr-2">
    {loading ? (
      <Loader />
    ) : (
      <>
        <p>{summary}</p>
      </>
    )}
  </div>

  )
}

export default SummaryRenderer
