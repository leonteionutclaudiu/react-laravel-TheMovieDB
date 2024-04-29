function Footer() {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="bg-gradient-to-r from-primary via-secondary to-tertiary py-6 text-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-between items-center">
            <div className="text-white mb-4 md:mb-0">© {currentYear} The Movie DB. Toate drepturile rezervate.</div>
            <div className="flex items-center">
              <a href="https://www.linkedin.com/in/leonte-ionut-claudiu/" target="_blank" className="text-gray-300 hover:text-white mr-4">Realizat de Leonte Ionut-Claudiu</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

export default Footer
