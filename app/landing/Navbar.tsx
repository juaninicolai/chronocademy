// import Link from "next/link";
// import Image from "next/image";
//
// export default function Navbar() {
//   return (
//     <nav>
//       <div className={"flex justify-between px-28"}>
//         <div>
//           <Link href={"/"}>
//             <Image
//               src="/logo.svg"
//               alt="chronocademy logo"
//               className="h-[76px]"
//               width={140}
//               height={76}
//             />
//           </Link>
//         </div>
//         <div
//           id={"nav-links"}
//           className={"flex space-x-4 items-center text-primary-blue-500"}
//         >
//           <Link href={"#how-it-works"}>How it works</Link>
//           <Link href={"#faqs"}>FAQ</Link>
//           <Link href={"#about-us"}>About us</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Using react-icons for burger menu

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
      <nav className="bg-white shadow-md">
        <div className="flex justify-between items-center px-6 sm:px-28 py-4">
          {/* Logo */}
          <div>
            <Link href={"/"}>
              <Image
                  src="/logo.svg"
                  alt="chronocademy logo"
                  className="h-[56px] sm:h-[76px]"
                  width={120}  // Adjust width and height for responsiveness
                  height={56}
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div
              id="nav-links"
              className="hidden sm:flex space-x-6 items-center text-primary-blue-500"
          >
            <Link href={"#how-it-works"}>How it works</Link>
            <Link href={"#faqs"}>FAQ</Link>
            <Link href={"#about-us"}>About us</Link>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="sm:hidden flex items-center">
            <button
                onClick={toggleMenu}
                className="text-primary-blue-500 focus:outline-none"
            >
              {menuOpen ? (
                  <AiOutlineClose size={28} />
              ) : (
                  <AiOutlineMenu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
            <div className="sm:hidden px-6 pb-4 space-x-4 bg-white text-primary-blue-500">
              <Link href={"#how-it-works"} onClick={toggleMenu}>
                How it works
              </Link>
              <Link href={"#faqs"} onClick={toggleMenu}>
                FAQ
              </Link>
              <Link href={"#about-us"} onClick={toggleMenu}>
                About us
              </Link>
            </div>
        )}
      </nav>
  );
}