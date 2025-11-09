import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, authentication }) {
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    // ✅ if this page REQUIRES authentication but user is NOT logged in
    if (authentication && !authStatus) {
      navigate("/login")
    }

    // ✅ if this page should be accessed only when NOT logged in (like Login or Signup)
    else if (!authentication && authStatus) {
      navigate("/")
    }

    setLoader(false)
  }, [authentication, authStatus, navigate])

  if (loader) return <h1>Loading...</h1>
  return <>{children}</>
}

export default AuthLayout
