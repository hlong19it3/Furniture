import { useEffect, useState } from 'react';
import CustomAxios from '~/config/api';
import useDebounce from '~/hooks/useDebounce';

const limit = 5;

function UserPage() {
  const [users, setUser] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [offSet, setOffSet] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const debounced = useDebounce(searchValue, 600);

  const totalPage = Math.ceil(total / limit);

  useEffect(() => {
    getUsers();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let page = [];
    for (let i = 0; i < totalPage; i++) {
      page.push(i);
    }
    setPages(page);

    // eslint-disable-next-line
  }, [users]);

  useEffect(() => {
    if (!debounced.trim()) {
      getUsers();
    } else {
      searchUser(debounced);
    }
    // eslint-disable-next-line
  }, [debounced, offSet]);

  const tokens = JSON.parse(localStorage.getItem('userInfo'));

  const getUsers = async () => {
    const res = await CustomAxios.get('/api/v1/users/', {
      headers: { 'x-accesstoken': tokens.accessToken },
      params: {
        limit: limit,
        offset: offSet,
      },
    });
    setUser(res.data.rows);
    setTotal(res.data.count);
  };
  const deleteUser = async (id) => {
    try {
      await CustomAxios.delete(`/api/v1/users/${id}`, { headers: { 'x-accesstoken': tokens.accessToken } });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const searchUser = async (value) => {
    try {
      const res = await CustomAxios.get(`/api/v1/users/search/${value}`, {
        headers: { 'x-accesstoken': tokens.accessToken },
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchUser = (e) => {
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

  return (
    <div className=" flex flex-1 justify-center items-center p-10 ">
      <div className=" w-full h-5/6 relative shadow-md sm:rounded-lg ">
        <div className="flex justify-between">
          <div className="mb-2 xl:w-96 justify-start">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
              <input
                value={searchValue}
                onChange={handleSearchUser}
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search User"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
            </div>
          </div>
        </div>
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                First name
              </th>
              <th scope="col" className="py-3 px-6">
                Last name
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6">{user.firstName}</td>
                <td className="py-4 px-6">{user.lastName}</td>
                <td className="py-4 px-6">{user.address}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.phone}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => deleteUser(user.id)}
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

export default UserPage;
