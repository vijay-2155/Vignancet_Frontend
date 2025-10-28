import vignansLogo from "../assets/images.png"; 

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-xl bg-white bg-opacity-10 px-6 py-3 shadow-lg backdrop-blur-md backdrop-filter">
        <div className="flex-shrink-0">
          <img
            src={vignansLogo}
            alt="Vignan's Institute of Information Technology"
            className="h-10 sm:h-12" 
          />
        </div>
      </div>
    </nav>
  );
}
