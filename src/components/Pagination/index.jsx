import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slices/filterSlice";


const Pagination = () => {
  
  const { pageInitObj } = useSelector((state) => state.filterReducer)
  
  const dispatch = useDispatch()

  const numberOfRenderedPages = (pageInitObj.allItemsFromServer / pageInitObj.limitItemsOnPage)
  

  const iconArrowRight = numberOfRenderedPages !== 1 && <div className={styles.iconArrow}>
                                                                <svg className={styles.iconArrowSVG} fill="currentColor" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id={styles.iconArrowColorID} clipRule="evenodd" d="M4 40.8361C8.89307 34.8632 13.2383 31.4739 17.0356 30.6682C20.8329 
                                                                    29.8625 24.4483 29.7408 27.8818 30.303V41L44 23.5453L27.8818 7V17.167C21.5333 17.2172 16.1362 
                                                                    19.4948 11.6905 24C7.24474 28.5052 4.68126 34.1172 4 40.8361Z" 
                                                                    fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeLinejoin="round" strokeWidth="0.8"/>
                                                                </svg>
                                                        </div>

  const iconArrowLeft = numberOfRenderedPages !== 1 &&  <div className={styles.iconArrow}>
                                                            <svg className={styles.iconArrowSVG} id={styles.iconArrowRotateID} fill="currentColor" width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                                                <path id={styles.iconArrowColorID} clipRule="evenodd" d="M4 40.8361C8.89307 34.8632 13.2383 31.4739 17.0356 30.6682C20.8329 
                                                                29.8625 24.4483 29.7408 27.8818 30.303V41L44 23.5453L27.8818 7V17.167C21.5333 17.2172 16.1362 
                                                                19.4948 11.6905 24C7.24474 28.5052 4.68126 34.1172 4 40.8361Z" 
                                                                fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeLinejoin="round" strokeWidth="0.8"/>
                                                            </svg>
                                                        </div>

  
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel={iconArrowRight}
    previousLabel={iconArrowLeft}
    onPageChange={(event) => {
      dispatch(setPage({...pageInitObj, pageCount: event.selected + 1}))
    }} // Номер страницы, который мы меняем мышкой, это число отправляется потом на сервер
    pageRangeDisplayed={1}
    pageCount={Math.ceil(pageInitObj.allItemsFromServer / pageInitObj.limitItemsOnPage)} // Количество страниц
    renderOnZeroPageCount={null}
    forcePage={pageInitObj.pageCount - 1} // Вот в этом параметре можно передать текующую страницу на которой мы находимся, чтобы она подсвечивалась активным классом 'select'
  />
  )
}

export default Pagination
