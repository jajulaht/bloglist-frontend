import React from 'react' // eslint-disable-line no-unused-vars

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

export default ErrorMessage