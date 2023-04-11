import React from 'react'
import { Helmet } from 'react-helmet-async'

export const Head = ({ title = '', description = '' }) => {
  return (
    <Helmet
      title={title ? `${title} | Azure Project Consulting` : undefined}
      defaultTitle='Azure Project Consulting'
    >
      <meta name='description' content={description} />
    </Helmet>
  )
}
