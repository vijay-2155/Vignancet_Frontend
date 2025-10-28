import vignansLogo from "../assets/images.png";

export default function Navbar({ fixed = true, center = false }) {
  const navClass = fixed ? "fixed top-0 left-0 right-0 z-50 p-4" : "relative w-full p-0";
  const justifyClass = center ? 'justify-center' : 'justify-between';
  const innerClass = `mx-auto flex max-w-7xl items-center ${justifyClass} rounded-xl bg-white bg-opacity-10 px-6 py-3 shadow-lg backdrop-blur-md backdrop-filter`;
  return (
    <nav className={navClass}>
      <div className={innerClass}>
        <div className="flex-shrink-0">
          <img
            src={vignansLogo}
            alt="Vignan's Institute of Information Technology"
            className="h-10 sm:h-12 mx-auto"
          />
        </div>
      </div>
    </nav>
  );
}
