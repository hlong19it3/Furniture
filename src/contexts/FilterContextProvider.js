import { createContext, useReducer } from 'react';
import { filterReducer, initFilter } from '~/reducers/filterReducer';

export const FilterContext = createContext();
function FilterContextProvider({ children }) {
  const [stateFilter, dispatchFilter] = useReducer(filterReducer, initFilter);
  return <FilterContext.Provider value={[stateFilter, dispatchFilter]}>{children}</FilterContext.Provider>;
}

export default FilterContextProvider;
