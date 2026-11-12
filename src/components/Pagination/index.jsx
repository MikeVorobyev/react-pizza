import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/slices/filterSlice";

const Pagination = () => {
  
  const { pageInitObj } = useSelector((state) => state.filterReducer)
  const dispatch = useDispatch()
  const numberOfRenderedPages = (pageInitObj.allItemsFromServer / pageInitObj.limitItemsOnPage)
  
  const iconArrowRight = numberOfRenderedPages !== 1 && (
    <div className={styles.iconArrow}>
      <svg className={styles.iconArrowSVG} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3L9 10L2 17" stroke="#fe5f1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 3L14 10L7 17" stroke="#fe5f1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )

  const iconArrowLeft = numberOfRenderedPages !== 1 && (
    <div className={styles.iconArrow}>
      <svg className={styles.iconArrowSVG} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3L7 10L14 17" stroke="#fe5f1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 3L2 10L9 17" stroke="#fe5f1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel={iconArrowRight}
      previousLabel={iconArrowLeft}
      onPageChange={(event) => {
        dispatch(setPage({...pageInitObj, pageCount: event.selected + 1}))
      }}
      pageRangeDisplayed={1}
      pageCount={Math.ceil(pageInitObj.allItemsFromServer / pageInitObj.limitItemsOnPage)}
      renderOnZeroPageCount={null}
      forcePage={pageInitObj.pageCount - 1}
    />
  )
}

export default Pagination