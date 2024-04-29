import React from "react"
import Footer from "./Footer"
import Navigation from "./Navigation"
import Spinner from "components/Spinner"

const GuestLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col justify-between font-sans text-gray-900 antialiased bg-gradient-to-r from-primary via-secondary to-tertiary">
    <Navigation />
    <main className="py-20 md:py-24 sm:px-6 lg:px-8 ">
      {children}
      {/* Spinner */}
      <Spinner/>
    </main>
    {/* Footer */}
    <Footer />
  </div>
)

export default GuestLayout
