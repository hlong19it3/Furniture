import { Link } from 'react-router-dom';
import { FaFacebook, FaFacebookMessenger, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import configFile from '~/config';
import images from '~/assets/images';

function Footer() {
  return (
    <footer className="bg-slate-800 pt-16 border-t border-gray-100 flex flex-col">
      <div>
        <div className="container grid grid-cols-3 border-b pb-2  border-slate-500">
          <div className="col-span-1 space-y-8 mr-2">
            <div className="flex flex-col">
              <img src={images.logoDefault} alt="logo" className="w-28 rounded " />
            </div>
            <div className="flex space-x-6">
              <a href="##" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-facebook-square"></i>
              </a>
              <a href="##" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-instagram-square"></i>
              </a>
              <a href="##" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-twitter-square"></i>
              </a>
              <a href="##" className="text-gray-400 hover:text-gray-500">
                <i className="fa-brands fa-github-square"></i>
              </a>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Infomation</h3>
                <div className="mt-4 space-y-4">
                  <Link href="##" className="text-base text-gray-500 hover:text-slate-400 block">
                    About Us
                  </Link>
                  <Link href="##" className="text-base text-gray-500 hover:text-slate-400 block">
                    Policy and Privacy
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Pages</h3>
                <div className="mt-4 space-y-4">
                  <Link to={configFile.routes.profile} className="text-base text-gray-500 hover:text-slate-400 block">
                    Profile
                  </Link>
                  <Link
                    to={configFile.routes.orderHistory}
                    className="text-base text-gray-500 hover:text-slate-400 block"
                  >
                    Orders History
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 ">
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Payment method</h3>
                <div className="mt-4 space-y-4 flex-1 flex flex-col justify-evenly ">
                  <div className="flex flex-1">
                    <div className="flex w-16 h-9 object-cover p-1 bg-white rounded-lg mr-1">
                      <img src="https://cf.shopee.vn/file/d4bbea4570b93bfd5fc652ca82a262a8" alt="visa" />
                    </div>
                    <div className="flex w-16 h-9 object-cover p-1 bg-white rounded-lg ">
                      <img src="	https://cf.shopee.vn/file/a0a9062ebe19b45c1ae0506f16af5c16" alt="mastercard" />
                    </div>
                  </div>
                  <div className="flex flex-1">
                    <div className="flex w-16 h-9 object-cover p-1 bg-white rounded-lg mr-1">
                      <img src="https://cf.shopee.vn/file/5e3f0bee86058637ff23cfdf2e14ca09" alt="0%" />
                    </div>
                    <div className="flex w-16 h-9 object-cover p-1 bg-white rounded-lg ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
                        alt="cash"
                        className="flex-1 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-evenly items-center">
                <img
                  className="w-24"
                  src="https://shopfront-cdn.tekoapis.com/common/da-dang-ky.png"
                  alt="img-bocongthuong"
                />
                <img
                  className="w-24"
                  src="https://images.dmca.com/Badges/dmca-badge-w100-2x1-02.png?ID=53b44883-ed2a-434d-902b-5adce10aafd5"
                  alt="img-dmca"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4 flex text-base text text-gray-400">
        <div className="flex flex-col flex-[0.5]">
          <h2 className="text-xl font-bold">Limited liability company with two members</h2>
          <div>© 2022-2023 Furniture Online Store</div>
        </div>
        <div className="flex flex-col flex-[0.5]">
          <div className="flex flex-1">
            <span className="font-bold mr-3">Address: </span>
            <span className="">Viet Nam - Korean University of Information and Communication Technology </span>
          </div>
          <div className="flex flex-1">
            <span className="font-bold mr-3">Email: </span>
            <a href="mailto:cskh@furnitureonlinestore.com">cskh@furnitureonlinestore.com</a>
          </div>
          <div className="flex flex-1">
            <span className="font-bold mr-3">Phone: </span>
            <a href="tel:+84123459999" className="">
              (+84) 123459999
            </a>
          </div>
          <div className="flex flex-1 mt-1 text-xl">
            <a href="##">
              <FaFacebook className="mr-2" />
            </a>
            <a href="##">
              <FaFacebookMessenger className="mr-2" />
            </a>
            <a href="##">
              <FaInstagram className="mr-2" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
