import { useEffect, useState } from 'react';
import { Modal } from '~/components/Modal';
import CustomAxios from '~/config/api';
import useDebounce from '~/hooks/useDebounce';

const limit = 5;

function CategoryPage() {
  const [toggleModalCreate, setToggleModalCreate] = useState(false);
  const [toggleModalEdit, setToggleModalEdit] = useState(false);

  //edit id
  const [editPreviewId, setEditPreviewId] = useState(0);
  // const [categorySelect, setCategorySelect] = useState(1);

  // form create or edit
  const [type, setType] = useState('');
  const [parentCategory, setParentCategory] = useState([]);
  const [parentCategoryId, setParentCategoryId] = useState();

  const [categories, setCategory] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const debounced = useDebounce(searchValue, 600);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [offSet, setOffSet] = useState(0);
  const [total, setTotal] = useState(0);

  const totalPage = Math.ceil(total / limit);
  console.log(pages);

  useEffect(() => {
    let page = [];
    for (let i = 0; i < totalPage; i++) {
      page.push(i);
    }
    setPages(page);

    // eslint-disable-next-line
  }, [categories]);

  useEffect(() => {
    getCategories();
    getCategoriesAll();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!debounced.trim()) {
      getCategories();
    } else {
      searchCategory(debounced);
    }
    // eslint-disable-next-line
  }, [debounced, offSet]);

  const tokens = JSON.parse(localStorage.getItem('userInfo'));

  const getCategories = async () => {
    const res = await CustomAxios.get('/api/v1/categories/', {
      headers: { 'x-accesstoken': tokens.accessToken },
      params: {
        limit: limit,
        offset: offSet,
      },
    });

    setCategory(res.data.rows);
    setTotal(res.data.count);
  };
  const getCategoriesAll = async () => {
    const res = await CustomAxios.get('/api/v1/categories/all-parents', {
      headers: { 'x-accesstoken': tokens.accessToken },
    });

    setParentCategory(res.data);
  };

  const deleteCategory = async (id) => {
    try {
      await CustomAxios.delete(`/api/v1/categories/${id}`, { headers: { 'x-accesstoken': tokens.accessToken } });
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const searchCategory = async (value) => {
    try {
      const res = await CustomAxios.get(`/api/v1/categories/search/${value}`, {
        headers: { 'x-accesstoken': tokens.accessToken },
      });
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchCategory = (e) => {
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

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    try {
      CustomAxios.post(
        '/api/v1/categories/create',
        {
          type,
          parentCategoryId,
        },
        {
          headers: { 'x-accesstoken': tokens.accessToken },
        },
      );
    } catch (error) {
      console.log(error);
    }
    setType('');
    setParentCategoryId();
    getCategories();
    setToggleModalCreate(false);
  };
  const handleEdit = async (id) => {
    try {
      const categoryRes = await CustomAxios.get(`/api/v1/categories/${id}`, {
        headers: { 'x-accesstoken': tokens.accessToken },
      });
      const res = categoryRes.data;

      setType(res.type);
      // setParentCategoryId(res.Category.id);
      setParentCategoryId(res.categoryId);
    } catch (error) {
      console.log(error);
    }
    setEditPreviewId(id);
    setToggleModalEdit(true);
  };
  const handleSubmitEdit = async () => {
    try {
      await CustomAxios.put(
        `/api/v1/categories/${editPreviewId}`,
        {
          type,
          parentCategoryId,
        },
        {
          headers: { 'x-accesstoken': tokens.accessToken },
        },
      );
    } catch (error) {
      console.log(error);
    }
    setType('');
    setParentCategoryId(0);
    setToggleModalEdit(false);
    getCategories();
  };
  return (
    <div className=" flex  flex-1 justify-center items-center p-10">
      {toggleModalCreate && (
        <Modal
          inputs={[
            {
              lable: 'Type',
              value: type,
              setValue: setType,
              placeHolder: 'Type',
            },
            {
              lable: 'Parent Category Id',
              value: parentCategory,
              setValue: setParentCategoryId,
              type: 'droplist',
              from: 'categoryParent',
              selectTitle: 'Select Parent Category',
            },
          ]}
          toggleModal={() => {
            setToggleModalCreate(false);
          }}
          onCLickSubmit={handleSubmitCreate}
        />
      )}
      {toggleModalEdit && (
        <Modal
          inputs={[
            {
              lable: 'Type',
              value: type,
              setValue: setType,
            },
            {
              lable: 'Parent Category Id',
              value: parentCategory,
              setValue: setParentCategoryId,
              defaultValue: parentCategoryId,
              type: 'droplist',
              from: 'categoryParent',
              selectTitle: 'Select Parent Category',
            },
          ]}
          action="edit"
          toggleModal={() => {
            setToggleModalEdit(false);
            setType('');
            setParentCategoryId(1);
          }}
          onCLickSubmit={handleSubmitEdit}
        />
      )}
      <div className=" w-full h-5/6 relative shadow-md sm:rounded-lg ">
        <div className="flex justify-between">
          <div className="mb-3 xl:w-96 justify-start">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
              <input
                value={searchValue}
                onChange={handleSearchCategory}
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
            </div>
          </div>
          <div className=" justify-end">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
              <button
                onClick={() => setToggleModalCreate(true)}
                type="button"
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
                Category Id
              </th>
              <th scope="col" className="py-3 px-6">
                Type
              </th>
              <th scope="col" className="py-3 px-6">
                Parent Category Id
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6">{category.id}</td>
                <td className="py-4 px-6">{category.type}</td>
                <td className="py-4 px-6">{category.categoryId ? category.categoryId : 'Main category'}</td>
                <td className="py-4 px-6">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(category.id)}
                  >
                    Edit
                  </button>
                  &ensp;
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            ;
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

export default CategoryPage;
