import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href={"/"} className="logo">
          <Image src={"/icons/logo.png"} alt="Logo" width={25} height={25} />

          <p>Dev Event</p>
        </Link>

        <ul className="md:space-x-10">
          <Link href={"/"}>Events</Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>CreateEvent</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
