import { useDispatch, useSelector } from 'react-redux'
import { setCategoriesID } from '../redux/slices/filterSlice'
import { setPage } from '../redux/slices/filterSlice'

function Categories() {
  const { categoryID, pageInitObj } = useSelector(state => state.filterReducer)
  const dispatch = useDispatch()

  const onClickCategory = (index) => {
    dispatch(setCategoriesID(index))
    dispatch(setPage({...pageInitObj, pageCount: 1}))
  }
  
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
      <div className="categories">
        <ul>
          {categories.map((elementCategory, index) => <li 
                                                                                                key={index} 
                                                                                                className={categoryID === index ? 'active' : ''} 
                                                                                                onClick={() => onClickCategory(index)}
                                                                                            >
                                                                                              {elementCategory}
                                                                                            </li>)}
        </ul>
      </div>
    )
  }

export default Categories