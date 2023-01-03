import { toFormData } from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from '~/components/Modal';
import CustomAxios, { baseURL } from '~/config/api';
import useDebounce from '~/hooks/useDebounce';
import { Image } from '~/components/Image';

const limit = 5;

function ProductPage() {
  const [toggleModalCreate, setToggleModalCreate] = useState(false);
  const [toggleModalEdit, setToggleModalEdit] = useState(false);

  //edit id
  const [editPreviewId, setEditPreviewId] = useState(0);

  // form create or edit
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturerProduct] = useState(1);
  const [category, setCategoryProduct] = useState(1);
  const [fileImage, setFileImage] = useState();

  if (fileImage) fileImage.preview = URL.createObjectURL(fileImage);

  const [categories, setCategory] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  //search
  const [searchValue, setSearchValue] = useState('');

  // init
  const [products, setProduct] = useState([]);
  const debounced = useDebounce(searchValue, 600);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [offSet, setOffSet] = useState(0);
  const [total, setTotal] = useState(0);

  const totalPage = Math.ceil(total / limit);

  useEffect(() => {
    let page = [];
    for (let i = 0; i < totalPage; i++) {
      page.push(i);
    }
    setPages(page);

    // eslint-disable-next-line
  }, [products]);

  useEffect(() => {
    getProducts();
    getCategories();
    getManufacturers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!debounced.trim()) {
      getProducts();
    } else {
      searchProduct(debounced);
    }
    // eslint-disable-next-line
  }, [debounced, offSet]);

  const tokens = JSON.parse(localStorage.getItem('userInfo'));

  const getProducts = async () => {
    const res = await CustomAxios.get('/api/v1/products/', {
      headers: { 'x-accesstoken': tokens.accessToken },
      params: {
        limit: limit,
        offset: offSet,
      },
    });
    setProduct(res.data.rows);
    setTotal(res.data.count);
  };
  const getCategories = async () => {
    const res = await CustomAxios.get('/api/v1/categories/all', {
      headers: { 'x-accesstoken': tokens.accessToken },
    });
    setCategory(res.data);
  };
  const getManufacturers = async () => {
    const res = await CustomAxios.get('/api/v1/manufacturers/', {
      headers: { 'x-accesstoken': tokens.accessToken },
    });

    setManufacturers(res.data);
  };

  const deleteProduct = async (id) => {
    try {
      await CustomAxios.delete(`/api/v1/products/${id}`, { headers: { 'x-accesstoken': tokens.accessToken } });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const searchProduct = async (value) => {
    try {
      const res = await CustomAxios.get(`/api/v1/products/search/${value}`, {
        headers: { 'x-accesstoken': tokens.accessToken },
      });

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePaging = (currentPosition) => {
    setOffSet(currentPosition * limit);
    setCurrentPage(currentPosition);
  };
  const handlePreNext = (status) => {
    if (status === 'pre') {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
        pages.forEach((page) => {
          if (page === currentPage) {
            setOffSet((currentPage - 1) * limit);
          }
        });
      }
    } else {
      if (currentPage < total / limit - 1) {
        setCurrentPage(currentPage + 1);
        pages.forEach((page) => {
          if (page === currentPage) {
            setOffSet((currentPage + 1) * limit);
          }
        });
      }
    }
  };
  const handleSubmitCreate = () => {
    const form = toFormData({
      name,
      price,
      salePrice,
      color,
      description,
      manufacturerId: manufacturer,
      categoryId: category,
      url: fileImage,
    });
    try {
      CustomAxios.post('/api/v1/products/create', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
    fileImage && URL.revokeObjectURL(fileImage.preview);
    setName('');
    setPrice(0);
    setSalePrice(0);
    setColor('');
    setDescription('');
    setManufacturerProduct(1);
    setCategoryProduct(1);
    setFileImage();
    setToggleModalCreate(false);
    getProducts();
  };
  const handleEdit = async (id) => {
    try {
      const productRes = await CustomAxios.get(`/api/v1/products/${id}`, {
        headers: { 'x-accesstoken': tokens.accessToken },
      });
      const res = productRes.data;

      setName(res.name);
      setPrice(res.price);
      setColor(res.color);
      setSalePrice(res.salePrice);
      setDescription(res.description);
      setManufacturerProduct(res.manufacturerId);
      setCategoryProduct(res.categoryId);
    } catch (error) {
      console.log(error);
    }
    setEditPreviewId(id);
    setToggleModalEdit(true);
  };
  const handleSubmitEdit = () => {
    const form = toFormData({
      name,
      price,
      salePrice,
      color,
      description,
      manufacturerId: manufacturer,
      categoryId: category,
      url: fileImage,
    });
    try {
      CustomAxios.put(`/api/v1/products/${editPreviewId}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
    fileImage && URL.revokeObjectURL(fileImage.preview);
    setName('');
    setPrice(0);
    setSalePrice(0);
    setColor('');
    setDescription('');
    setManufacturerProduct(1);
    setCategoryProduct(1);
    setFileImage();
    setToggleModalEdit(false);
    getProducts();
  };
  return (
    <div className=" flex  flex-1 justify-center items-center p-10">
      {toggleModalCreate && (
        <Modal
          inputs={[
            {
              lable: 'Name',
              value: name,
              setValue: setName,
              placeHolder: 'Product Name',
            },
            {
              lable: 'Price',
              value: price,
              setValue: setPrice,
            },
            {
              lable: 'Sale Price',
              value: salePrice,
              setValue: setSalePrice,
            },
            {
              lable: 'Color',
              value: color,
              setValue: setColor,
              placeHolder: 'Product Color',
            },
            {
              lable: 'Description',
              value: description,
              setValue: setDescription,
              placeHolder: 'Description',
            },
            {
              lable: 'Image',
              setValue: setFileImage,
              type: 'file',
              name: 'url',
              preview: fileImage ? fileImage.preview : null,
            },
            {
              lable: 'Manufacturer',
              value: manufacturers,
              setValue: setManufacturerProduct,
              type: 'droplist',
              from: 'manufacturer',
              selectTitle: 'Select Manufacturer',
            },
            {
              lable: 'Category',
              value: categories,
              setValue: setCategoryProduct,
              type: 'droplist',
              from: 'categoryChildren',
              selectTitle: 'Select Category',
            },
          ]}
          toggleModal={() => {
            fileImage && URL.revokeObjectURL(fileImage.preview);
            setName('');
            setPrice(0);
            setColor('');
            setSalePrice(0);
            setDescription('');
            setManufacturerProduct(1);
            setCategoryProduct(1);
            setFileImage();
            setToggleModalCreate(false);
          }}
          onCLickSubmit={handleSubmitCreate}
        />
      )}
      {toggleModalEdit && (
        <Modal
          inputs={[
            {
              lable: 'Name',
              value: name,
              setValue: setName,
            },
            {
              lable: 'Price',
              value: price.toLocaleString(),
              setValue: setPrice,
            },
            {
              lable: 'Sale Price',
              value: salePrice.toLocaleString(),
              setValue: setSalePrice,
            },
            {
              lable: 'Color',
              value: color,
              setValue: setColor,
            },
            {
              lable: 'Description',
              value: description,
              setValue: setDescription,
            },
            {
              lable: 'Image',
              setValue: setFileImage,
              type: 'file',
              name: 'url',
              preview: fileImage ? fileImage.preview : null,
            },
            {
              lable: 'Manufacturer',
              value: manufacturers,
              setValue: setManufacturerProduct,
              type: 'droplist',
              from: 'manufacturer',
              defaultValue: manufacturer,
              selectTitle: 'Select Manufacturer',
            },
            {
              lable: 'Category',
              value: categories,
              setValue: setCategoryProduct,
              type: 'droplist',
              defaultValue: category,
              from: 'categoryChildren',
              selectTitle: 'Select Category',
            },
          ]}
          action="edit"
          toggleModal={() => {
            fileImage && URL.revokeObjectURL(fileImage.preview);
            setToggleModalEdit(false);
            setName('');
            setPrice(0);
            setColor('');
            setSalePrice(0);
            setFileImage();
            setDescription('');
            setManufacturerProduct(1);
            setCategoryProduct(1);
          }}
          onCLickSubmit={handleSubmitEdit}
        />
      )}
      <div className="w-full h-5/6 relative shadow-md sm:rounded-lg  ">
        <div className="flex justify-between">
          <div className="mb-3 xl:w-96 justify-start">
            <div className="mb-3 xl:w-96">
              <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
                <input
                  value={searchValue}
                  onChange={handleSearch}
                  type="search"
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
              </div>
            </div>
          </div>
          <div className=" justify-end">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
              <button
                onClick={() => setToggleModalCreate(true)}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Manufacturer
              </th>
              <th scope="col" className="py-3 px-6">
                Category
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Sale Price
              </th>
              <th scope="col" className="py-3 px-6">
                Color
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">
                  <Image
                    src={baseURL + '/' + product.ImageProducts[0].url}
                    alt="product but error"
                    className={'w-20 h-17'}
                  />
                </td>
                <td className="py-4 px-6">
                  {product.Manufacturer.manufacturerName ? product.Manufacturer.manufacturerName : ''}
                </td>
                <td className="py-4 px-6">{product.Category.type}</td>
                <td className="py-4 px-6">{product.price.toLocaleString()} VND</td>
                <td className="py-4 px-6">{product.salePrice.toLocaleString()} VND</td>
                <td className="py-4 px-6">{product.color}</td>
                <td className="py-4 px-6">{product.description.slice(0, 20)}</td>
                <td className="py-4 px-6">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  &ensp;
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav className="flex justify-between items-center pt-4 text-base" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {offSet + 1 + '-' + (offSet + limit > total ? total : offSet + limit)}{' '}
            </span>
            of <span className="font-semibold text-gray-900 dark:text-white">{total}</span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => handlePreNext('pre')}
                className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            {pages.map((position) => (
              <li key={position}>
                <button
                  onClick={() => handlePaging(position)}
                  className={
                    currentPage === position
                      ? ' text-blue-600 bg-blue-50  py-2 px-3 leading-tight hover:bg-blue-100 hover:text-blue-700 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      : 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }
                >
                  {position + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePreNext('next')}
                className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProductPage;
