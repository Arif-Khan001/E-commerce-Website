import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

/*
  Topbar shows:
  - Social icons
  - Shipping message
  - Contact number
*/
const Topbar = () => {
  return (
    <div className="bg-rabbit-red text-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">

        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" aria-label="Facebook">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Instagram">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Twitter">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Message */}
        <div className="text-sm text-center flex-1">
          We ship worldwide — fast and reliable shipping!
        </div>

        {/* Phone */}
        <div className="hidden md:block text-sm">
          <a href="tel:+1234567890" className="hover:underline">
            +1 (234) 567-890
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
