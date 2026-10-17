import React, { useEffect, useRef } from 'react'
import qs from 'qs'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupSort } from '../redux/slices/filterSlice'

const popupList = [
  {name: 'популярности', sort: 'rating', id: 0}, 
  {name: 'цене', sort: 'price', id: 1}, 
  {name: 'алфавиту', sort: 'title', id: 2}
]

function Sort() {
  const sortRef = useRef()
  const searchStringParams1 = qs.parse(window.location.search.substring(1))

  let popupListFromSearchName = ''
  let popupListFromSearchId  = 0


  if (Object.keys(searchStringParams1).length !== 0) {
    const popupListFromSearch = popupList.filter((item) => item.sort === searchStringParams1.sortBy)
    popupListFromSearchName = popupListFromSearch[0].name
    popupListFromSearchId = popupListFromSearch[0].id
    }




  const dispatch = useDispatch()
  const popupSort = useSelector(state => state.filterReducer.popupSort)


  const [isVisiblePopup, setIsVisiblePopup] = React.useState(false)

  const onClickListItem = (item) => {
    dispatch(setPopupSort(item))
    setIsVisiblePopup(!isVisiblePopup)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {                     // Навесили слушатель событий на весь документ body, проверили наличие sortRef.current в массиве созданном composedPath() и
      if(!event.composedPath().includes(sortRef.current)) {     // для состояния setIsVisiblePopup переписали значение на false. Когда состояние false, окно popup исчезвет
        setIsVisiblePopup(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {                                                      // return () => {} Это блок кода созданный специально длядействия пр иразмонтировании компонента, например тут мы
      document.body.removeEventListener('click', handleClickOutside)    // удаляем слушатель событий для document.body
    }
  },[])

    return (
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <abbr title={popupSort.rotateSortSVG.includes('rotate_180') ? 'По убыванию' : 'По возрастанию'}>
            <svg 
              onClick={() => popupSort.rotateSortSVG.includes('rotate_180') ? dispatch(setPopupSort({...popupSort, rotateSortSVG: ''})): dispatch(setPopupSort({...popupSort, rotateSortSVG: 'rotate_180'}))} 
              className={`sort__label_SVG ${popupSort.rotateSortSVG}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 
                  0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 
                  0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="currentColor"
                />
            </svg>
          </abbr>

          <b>Сортировка по:</b>
          <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>{popupListFromSearchName === '' ? popupSort.name : popupListFromSearchName}</span>   {/* Можно вместо  categoryPopup поставить popupList[selectedPopup] */}
        </div>

        <div className="sort__popup">
          <ul>
             {isVisiblePopup 
                  ? popupList.map((item, id) => <li className={popupListFromSearchId === id ? 'active' : ''} key={id} onClick={() => onClickListItem({...item, id: id, rotateSortSVG: ''})}>{item.name}</li>) 
                  : ''}
          </ul>
        </div>
      </div>
    )
}

export default Sort