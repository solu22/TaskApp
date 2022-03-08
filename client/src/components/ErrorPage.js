import React from 'react'
import { useLocation } from 'react-router-dom'

const ErrorPage = () => {
    let location = useLocation()
    return (
        <div>
            <h1>Page Not Found <code>{location.pathname}</code></h1>
        </div>
    )
}

export default ErrorPage
