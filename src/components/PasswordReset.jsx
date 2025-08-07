import { useState, useRef } from "react"

const PasswordReset = () => {
  const [codes, setCodes] = useState(["", "", ""])
  const inputRefs = [useRef(null), useRef(null), useRef(null)]

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCodes = [...codes]
      newCodes[index] = value
      setCodes(newCodes)

      // Auto-focus next input
      if (value && index < 2) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const verificationCode = codes.join("")
    console.log("Verification code:", verificationCode)
  }

  const handleResend = () => {
    console.log("Resending verification code...")
  }

  const handleBackToLogin = () => {
    console.log("Going back to login...")
  }

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left side - Background image with quote */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20from%202025-07-19%2014-44-05-DL4XX861PBZI0qwqCwcjmsQ4SSBEmw.png"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <blockquote className="text-white text-xl font-medium leading-relaxed">
            There are no secrets to success. It is the result of preparation, hard work, and learning from failure.
          </blockquote>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">ZiyA Academy</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-transparent">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Password reset</h1>
              <p className="text-gray-600">We sent a code to kiran@ziyaacademy.com</p>
            </div>

            <form onSubmit={handleSubmit} className="mb-6">
              {/* Verification Code Inputs */}
              <div className="flex justify-center space-x-4 mb-8">
                {codes.map((code, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength="1"
                    value={code}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-16 h-16 text-center text-2xl font-semibold border-2 border-blue-400 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue
              </button>
            </form>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Didn't receive the email?{" "}
                <button
                  onClick={handleResend}
                  className="text-blue-500 hover:text-blue-600 font-medium underline-offset-2 hover:underline"
                >
                  Click to resend
                </button>
              </p>

              <button
                onClick={handleBackToLogin}
                className="flex items-center justify-center w-full text-gray-600 hover:text-gray-800 font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset
