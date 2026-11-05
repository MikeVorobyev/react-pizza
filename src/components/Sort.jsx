import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupSort } from '../redux/slices/filterSlice'

const popupList = [
  { name: 'популярности', sort: 'rating', id: 0 }, 
  { name: 'цене', sort: 'price', id: 1 }, 
  { name: 'алфавиту', sort: 'title', id: 2 }
]

function Sort() {
  const sortRef = useRef()
  const dispatch = useDispatch()
  
  // Состояние из Redux.
  const popupSort = useSelector(state => state.filterReducer.popupSort)

  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false)

  const onClickListItem = (item) => {
    // Обновляем Redux и сбрасываем направление сортировки на возрастание
    dispatch(setPopupSort({ ...item, rotateSortSVG: '' }))
    setIsVisiblePopup(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Проверка sortRef.current на случай, если компонент уже размонтирован
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisiblePopup(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <abbr title={popupSort.rotateSortSVG === 'rotate_180' ? 'По убыванию' : 'По возрастанию'}>
          <svg 
            onClick={() => dispatch(setPopupSort({
              ...popupSort, 
              rotateSortSVG: popupSort.rotateSortSVG === 'rotate_180' ? '' : 'rotate_180'
            }))} 
            className={`sort__label_SVG ${popupSort.rotateSortSVG}`} 
            width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor"
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 
              0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 
              0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            />
          </svg>
        </abbr>

        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>
          {popupSort.name}
        </span>
      </div>

      <div className="sort__popup">
        <ul>
          {isVisiblePopup && popupList.map((item) => (
            <li 
              className={popupSort.id === item.id ? 'active' : ''} 
              key={item.id} 
              onClick={() => onClickListItem(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sort