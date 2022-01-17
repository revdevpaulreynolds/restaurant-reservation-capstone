import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

// function ErrorAlert({errors}) {
//   console.log(`Errors: ${errors[0]}`, errors.length)
//   if (errors.length) {
//     let displayErrors = errors.map(error => `Error: ${error}`)
//     return (
//       <div className="alert alert-danger m-2">{displayErrors}
//       </div>
    
//     )
//   }
//   return null;
// }

function ErrorAlert({ error }) {
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}

export default ErrorAlert;
