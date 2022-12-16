import { useState, useEffect, useContext } from 'react';
import { Wrapper } from '~/components/SideBarContentWrapper';
import CustomAxios from '~/config/api';
import { FilterContext } from '~/contexts/FilterContextProvider';
import { setCategory, setColor, setManufacturer } from '~/reducers/filterReducer';
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
    const result = await CustomAxios.get(`/api/v1/categories/${parentCategoryId}`);
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

  const handleSubmitManufacturer = async (manufacturerId) => {
    try {
      await CustomAxios.get(`/api/products/get-by-manufacturerId/${manufacturerId}`);
    } catch (error) {
      console.log(error);
    }
    setManufacturers();
  };
  return (
    <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
      <div className="divide-y divide-gray-200 space-y-5">
        <Wrapper title={'CATEGORIES'}>
          <div className="space-y-2">
            {categories.map((category, index) => {
              return (
                !category.categoryId && (
                  <div className="flex items-center" key={category.id}>
                    <input
                      type="radio"
                      name="cat-1"
                      id="cat-1"
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      onClick={() => dispatchFilter(setCategory(category.id))}
                    />
                    <label
                      htmlFor="cat-1"
                      className="text-gray-600 ml-3 cusror-pointer"
                      onMouseEnter={() => {
                        setShowSubCategory(category.id);
                        getSubCategoriesByParentCategoryId(category.id);
                      }}
                    >
                      {category.type}
                    </label>
                    <SubCategory
                      title={category.type}
                      contents={subCategories}
                      showSubCategory={showSubCategory === category.id}
                      setShowSubCategory={setShowSubCategory}
                    />
                    <div className="ml-auto text-gray-600 text-sm">(15)</div>
                  </div>
                )
              );
            })}
          </div>
        </Wrapper>

        <Wrapper className="pt-4" title={'Manufacturers'}>
          <div className="space-y-2">
            {manufacturers.map((manufacturer, index) => (
              <div className="flex items-center" key={manufacturer.id}>
                <input
                  // onChange={handleSubmitManufacturer}
                  onClick={() => dispatchFilter(setManufacturer(manufacturer.id))}
                  type="radio"
                  name="brand-1"
                  id="brand-1"
                  className="text-primary focus:ring-0 rounded-xl cursor-pointer"
                />
                <label htmlFor="brand-1" className="text-gray-600 ml-3 cusror-pointer">
                  {manufacturer.manufacturerName}
                </label>
                {/* <div className="ml-auto text-gray-600 text-sm">(15)</div> */}
              </div>
            ))}
          </div>
        </Wrapper>

        <Wrapper className="pt-4" title={'Price'}>
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
        </Wrapper>

        <Wrapper className="pt-4" title={'Color'}>
          <div className="flex items-center gap-2">
            {allColors.map((color, index) => (
              <div key={index} className="color-selector">
                <input
                  value={color}
                  onClick={(e) => dispatchFilter(setColor(e.target.value))}
                  type="radio"
                  name="color"
                  id={`color-${color}`}
                  className="hidden"
                />
                <label
                  htmlFor={`color-${color}`}
                  className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                  style={{ backgroundColor: color }}
                ></label>
              </div>
            ))}

            {/* <div className="color-selector">
              <input type="radio" name="color" id="black" className="hidden" />
              <label
                htmlFor="black"
                className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                style={{ backgroundColor: '#000' }}
              ></label>
            </div>
            <div className="color-selector">
              <input type="radio" name="color" id="white" className="hidden" />
              <label
                htmlFor="white"
                className="border border-gray-200 rounded-sm h-6 w-6  cursor-pointer shadow-sm block"
                style={{ backgroundColor: ' #fff' }}
              ></label>
            </div> */}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

export default SideBar;
