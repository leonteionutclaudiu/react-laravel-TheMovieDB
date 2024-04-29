const AuthCard = ({ logo, children }) => (
  <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
    <div className="w-fit mx-auto">{logo}</div>
      {children}
    </div>
  </div>
)

export default AuthCard
