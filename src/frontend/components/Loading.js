import React from 'react'

const Loading = ({val}) => {
  return (
    <div className='d-flex justify-content-center mt-4'>
          <h4 className='m-auto lead'>
            <span
              className='spinner-border spinner-border-sm me-2'
              role='status'
              aria-hidden='true'
            ></span>
            <span>{val}</span>
          </h4>
        </div>
  )
}

export default Loading