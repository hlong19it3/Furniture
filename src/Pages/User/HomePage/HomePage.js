import { useEffect, useState } from 'react';
import { Image } from '~/components/Image';
import CustomAxios, { baseURL } from '~/config/api';

function UserPage() {
  const tokens = JSON.parse(localStorage.getItem('userInfo'));
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    getAllProduct();
  }, []);
  const getAllProduct = async () => {
    const product = await CustomAxios.get('/api/v1/products/', {
      headers: { 'x-accesstoken': tokens.accessToken },
      params: {
        limit: 1000,
        offset: 0,
      },
    });
    setAllProduct(product.data.rows);
  };
  return (
    <>
      <div class="col-span-3">
        <div class="flex items-center mb-4">
          <select
            name="sort"
            id="sort"
            class="w-44 text-l text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
          >
            <option value="">Default sorting</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="latest">Latest product</option>
          </select>

          <div class="flex gap-2 ml-auto">
            <div class="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
              <i class="fa-solid fa-grip-vertical"></i>
            </div>
            <div class="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
              <i class="fa-solid fa-list"></i>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-6">
          {allProduct.map((product) => {
            let imageUrl;
            if (product.ImageProducts[0]) {
              imageUrl = baseURL + '/' + product.ImageProducts[0].url;
            } else {
              imageUrl = '';
            }
            return (
              <div
                key={product.id}
                class="bg-white shadow rounded overflow-hidden flex flex-col justify-between items-center"
              >
                <div class="relative flex flex-col items-center">
                  {/* <img src={imageUrl} alt="product 1" class="w-full" /> */}
                  <Image src={imageUrl} alt="product but error" className={'w-5/6 h-60'} />
                  <div
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <a
                      href="##"
                      class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      title="view product"
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                    <a
                      href="##"
                      class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      title="add to wishlist"
                    >
                      <i class="fa-solid fa-heart"></i>
                    </a>
                  </div>
                </div>
                <div class="pt-4 pb-3 px-4">
                  <a href="##">
                    <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                      {product.name}
                    </h4>
                  </a>
                  <div className="flex flex-col mb-1 ">
                    <p class="text-base font-regular">{product.Category.type}</p>

                    <p class="text-base  font-regular">{product.Manufacturer.manufacturerName}</p>
                  </div>
                  <div class="flex items-baseline mb-1 space-x-2">
                    <p class="text-xl text-primary font-semibold">{product.salePrice.toLocaleString() + ' VND'}</p>
                    <p class="text-sm text-gray-400 line-through">{product.price.toLocaleString() + ' VND'}</p>
                  </div>
                  <div class="flex items-center">
                    <div class="flex gap-1 text-sm text-yellow-400"></div>
                  </div>
                </div>
                <a
                  href="##"
                  class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                >
                  Add to cart
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UserPage;
