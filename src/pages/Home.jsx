import React from "react";
import axios from "axios";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/slices/filterSlice";
import { setPizzasOnBackEnd } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const { searchValue } = React.useContext(SearchContext);
  const { categoryID, popupSort, pageInitObj } = useSelector(state => state.filterReducer);
  const { pizzasOnBackEnd } = useSelector(state => state.pizzaReducer);
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [resError, setResError] = React.useState(true); // true = ошибки нет

  const orderFlag = popupSort.rotateSortSVG === 'rotate_180' ? 'desc' : 'asc';
  const search = searchValue ? `&title=${searchValue}` : '';

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const baseUrl = 'https://pizza-api.megamancartman01.workers.dev/';
      const url = categoryID === 0
        ? `${baseUrl}?page=${pageInitObj.pageCount}&limit=${pageInitObj.limitItemsOnPage}&sortBy=${popupSort.sort}&order=${orderFlag}${search}`
        : `${baseUrl}?category=${categoryID}&page=${pageInitObj.pageCount}&limit=${pageInitObj.limitItemsOnPage}&sortBy=${popupSort.sort}&order=${orderFlag}${search}`;

      const res = await axios.get(url);
      
      const responseData = res.data;
      const itemsArray = Array.isArray(responseData) ? responseData : (responseData?.items || []);
      const totalItems = responseData?.total !== undefined ? responseData.total : itemsArray.length;

      dispatch(setPizzasOnBackEnd(itemsArray));
      dispatch(setPage({ 
        pageCount: pageInitObj.pageCount, 
        limitItemsOnPage: pageInitObj.limitItemsOnPage, 
        allItemsFromServer: totalItems 
      }));
      
      setResError(true);
    } catch (err) {
      console.error("Ошибка загрузки пицц:", err);
      setResError(false);
    } finally {
      setIsLoading(false);
    }
  }, [categoryID, popupSort.sort, orderFlag, search, pageInitObj.pageCount, pageInitObj.limitItemsOnPage, dispatch]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      category: categoryID,
      page: pageInitObj.pageCount,
      sortBy: popupSort.sort,
    });
    navigate(`?${queryString}`);
  }, [categoryID, pageInitObj.pageCount, popupSort.sort, navigate]);

  React.useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [fetchData]);

  const skeletons = [...new Array(pageInitObj.limitItemsOnPage)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className={`content__items ${resError === false ? 'no-grid' : ''}`}>
        {isLoading 
          ? skeletons 
          : (resError === false 
              ? <p className="not-found">Пицца с таким названием не найдена, попробуйте поискать в другой категории или изменить запрос в поисковой строке</p> 
              : (Array.isArray(pizzasOnBackEnd) && pizzasOnBackEnd.length > 0 
                  ? pizzasOnBackEnd.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)
                  : <p className="not-found">Ничего не найдено</p>
                )
            )
        }
      </div>
      {resError === false ? null : <Pagination />}
    </>
  );
}

export default Home;