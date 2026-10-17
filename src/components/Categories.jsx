import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoriesID } from '../redux/slices/filterSlice'
import { setPage } from '../redux/slices/filterSlice'


function Categories() {

  const { categoryID, pageInitObj } = useSelector(state => state.filterReducer)
  const dispatch = useDispatch()

  const onCliclCategory = (index) => {
    dispatch(setCategoriesID(index))
    dispatch(setPage({...pageInitObj, pageCount: 1}))
  }
  
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


    return (
      <div className="categories">
        <ul>
          {categories.map((elementCategory, index) => <li className={categoryID === index ? 'active' : ''} onClick={() => onCliclCategory(index)} key={index}>{elementCategory}</li>)}
        </ul>
      </div>
    )
  }



  // <li className={activeIndex === 0 ? 'active' : ''} onClick={() => onClickCategory(0)}>Все</li>
  // <li className={activeIndex === 1 ? 'active' : ''} onClick={() => onClickCategory(1)}>Мясные</li>
  // <li className={activeIndex === 2 ? 'active' : ''} onClick={() => onClickCategory(2)}>Вегетарианская</li>
  // <li className={activeIndex === 3 ? 'active' : ''} onClick={() => onClickCategory(3)}>Гриль</li>
  // <li className={activeIndex === 4 ? 'active' : ''} onClick={() => onClickCategory(4)}>Острые</li>
  // <li className={activeIndex === 5 ? 'active' : ''} onClick={() => onClickCategory(5)}>Закрытые</li>

export default Categories