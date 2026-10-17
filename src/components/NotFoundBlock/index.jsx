import styles from './NotFoundBlock.module.scss'
import { Link } from 'react-router-dom'

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
        <div>
            4<span>😕</span>4
        </div>
        <h1>Ничего не найдено</h1>
        <p className={styles.description}>К большому разочарованию данная страница не найдена в нашем Интернет-магазине</p>
        <Link to='/'>
        <button className='button'>Вернуться на главную</button>
        </Link>
    </div>
  )
}

export default NotFoundBlock