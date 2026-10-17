
import { Link } from 'react-router-dom'
import emptyCartIMG from '../assets/img/empty-cart.png'

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        
        <p>
            Вероятней всего, Вы ещё не заказывали пиццу.<br />
            Для того, чтобы заказать пиццу, перейдите на главную страницу.
        </p>

        <img src={emptyCartIMG} alt="Empty cart" />

        <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
        </Link>
    </div>
  )
}

export default CartEmpty