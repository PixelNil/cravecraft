import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-500 tracking-tighter">
          CraveCraft<span className="text-black">.</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-orange-500 font-medium">Home</Link>
          <Link to="/favorites" className="hover:text-orange-500 font-medium">Favorites</Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;