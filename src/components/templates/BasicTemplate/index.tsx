import Header from 'src/components/molecules/Header'
import Footer from 'src/components/molecules/Footer'

const BasicTemplate = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex justify-center items-center absolute top-0 left-0 bottom-0 right-0 min-h-screen bg-cover bg-center max-h-screen overflow-hidden z-[-1]">
        <div className="bg-blue-900/20 w-96 h-96 blur-3xl backdrop-blur rounded-xl"></div>
      </div>

      <Header />

      <div className="container flex-col justify-center items-center">
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default BasicTemplate
