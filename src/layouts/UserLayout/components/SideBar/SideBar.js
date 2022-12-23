import Tippy from '@tippyjs/react';
import { useContext, useEffect, useState } from 'react';
import { RiFilterOffFill } from 'react-icons/ri';

import { Wrapper } from '~/components/SideBarContentWrapper';
import CustomAxios from '~/config/api';
import { FilterContext } from '~/contexts/FilterContextProvider';
import { clearFilter, setCategory, setColor, setManufacturer } from '~/reducers/filterReducer';
import SubCategory from './SubCategory';

function SideBar() {
  // const tokens = JSON.parse(localStorage.getItem('userInfo'));
  const [stateFilter, dispatchFilter] = useContext(FilterContext);
  // console.log(stateFilter);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [manufacturers, setManufacturers] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [showSubCategory, setShowSubCategory] = useState(-1);

  // const [color, setColor] = useState('');

  const getCategoriesAll = async () => {
    const res = await CustomAxios.get('/api/v1/categories/all', {});
    setCategories(res.data);
  };

  const getSubCategoriesByParentCategoryId = async (parentCategoryId) => {
    const result = await CustomAxios.get(`/api/v1/categories/parent/${parentCategoryId}`);
    setSubCategories(result.data);
  };

  const getManufacturersAll = async () => {
    const res = await CustomAxios.get('/api/v1/manufacturers/all');

    setManufacturers(res.data);
  };

  const getAllColors = async () => {
    const res = await CustomAxios.get('/api/v1/products/all-colors');
    setAllColors(res.data);
  };

  useEffect(() => {
    getCategoriesAll();
    getManufacturersAll();
    getAllColors();
    getSubCategoriesByParentCategoryId();
    // eslint-disable-next-line
  }, []);

  const handleSubcategory = (id) => {
    dispatchFilter(setCategory(id));
  };
  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded ">
      <div className="divide-y divide-gray-200 space-y-5">
        <div className="w-full h-6 flex items-center my-3 px-2">
          <div className="flex-1 flex justify-end items-center">
            {(stateFilter.categoryId !== 0) | (stateFilter.manufacturerId !== 0) | (stateFilter.color !== '') ? (
              <Tippy content="Clear filter" placement="right">
                <div
                  onClick={() => dispatchFilter(clearFilter())}
                  className="flex-[0.1]  p-1 rounded-full cursor-pointer flex justify-center items-center text-slate-200 bg-slate-500 hover:bg-slate-600 hover:text-white"
                >
                  <RiFilterOffFill />
                </div>
              </Tippy>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Wrapper title={'CATEGORIES'} className="m-0">
          <div className="space-y-2">
            {categories.map((category, index) => {
              return (
                !category.categoryId && (
                  <div className="flex items-center  cursor-pointer" key={category.id}>
                    <div
                      className="flex items-center  cursor-pointer"
                      onClick={() => dispatchFilter(setCategory(category.id))}
                    >
                      <input
                        type="radio"
                        name="cat-1"
                        id={`cat-${category.id}`}
                        className="text-primary focus:ring-0 rounded-sm"
                        checked={stateFilter.categoryId === category.id ? true : false}
                        readOnly
                      />
                      <div
                        htmlFor={`cat-${category.id}`}
                        className="text-gray-600 ml-3 cusror-pointer"
                        onMouseEnter={() => {
                          setShowSubCategory(category.id);
                          getSubCategoriesByParentCategoryId(category.id);
                        }}
                      >
                        {category.type}
                      </div>
                    </div>
                    <SubCategory
                      title={category.type}
                      contents={subCategories}
                      showSubCategory={showSubCategory === category.id}
                      setShowSubCategory={setShowSubCategory}
                      onClick={handleSubcategory}
                      checked={stateFilter.categoryId}
                    />
                  </div>
                )
              );
            })}
          </div>
        </Wrapper>

        <Wrapper className="pt-4" title={'Manufacturers'}>
          <div className="space-y-2">
            {manufacturers.map((manufacturer, index) => (
              <div
                className="flex items-center cursor-pointer"
                key={manufacturer.id}
                onClick={() => dispatchFilter(setManufacturer(manufacturer.id))}
              >
                <input
                  type="radio"
                  name="brand-1"
                  id={`brand-${manufacturer.id}`}
                  className="text-primary focus:ring-0 rounded-xl cursor-pointer"
                  checked={stateFilter.manufacturerId === manufacturer.id ? true : false}
                  readOnly
                />
                <div htmlFor={`brand-${manufacturer.id}`} className="text-gray-600 ml-3 cusror-pointer">
                  {manufacturer.manufacturerName}
                </div>
              </div>
            ))}
          </div>
        </Wrapper>

        {/* <Wrapper className="pt-4" title={'Price'}>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              name="min"
              id="min"
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
              placeholder="min"
            />
            <span className="mx-3 text-gray-500">-</span>
            <input
              type="text"
              name="max"
              id="max"
              className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
              placeholder="max"
            />
          </div>
        </Wrapper> */}

        <Wrapper className="pt-4" title={'Color'}>
          <div className="flex items-center gap-2">
            {allColors.map((color, index) => (
              <div key={index} className="color-selector" onClick={(e) => dispatchFilter(setColor(e.target.value))}>
                <input
                  value={color}
                  type="radio"
                  name="color"
                  id={`color-${color}`}
                  className="hidden"
                  checked={stateFilter.color === color ? true : false}
                  readOnly
                />
                <label
                  htmlFor={`color-${color}`}
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                  style={{ backgroundColor: color }}
                ></label>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

export default SideBar;
