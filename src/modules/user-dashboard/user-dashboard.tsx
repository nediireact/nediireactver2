import React, {
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';
import StrongText from 'src/modules/strong-text/strong-text';
import 'src/modules/user-dashboard/user-dashboard.scss';

const UserDashboardItemCard = (props: any): React.ReactElement => {
  return (
    <div className='UserDashboard__item-card col s6'>
      <Link to={props.to} className='white hoverable'>
        <i className={`material-icons UserDashboard__item-card-icon ${props.color}-text`}>
          {props.icon}
        </i>
        <span className={`UserDashboard__item-card-label ${props.color}-text text-darken-2 truncate`}>
          {props.label}
        </span>
      </Link>
    </div>
  );
};

const UserDashboard = (): React.ReactElement => {
  const userData = useSelector((state: any) => state.user);
  const stands = userData.favoriteStands || [];
  const items = userData.favoriteItems || [];
  const cartItems = userData.cart || [];

  useEffect(() => {
    const w: any = window;
    w.scrollTo(0, 0);
  });

  return (
    <div className='col s12 m8 UserDashboard'>
      <StrongText text='Panel de usuario' fullWidth={true} align='left' />
      <p>Informacion general de la cuenta y estadisticas.</p>
      <div className='row'>
        <UserDashboardItemCard icon='store' color='blue'
          to='/mi-cuenta/favoritos'
          label={`${stands.length} Empresas favoritas`} />
        <UserDashboardItemCard icon='favorite' color='red'
          to='/mi-cuenta/favoritos'
          label={`${items.length} elemetos favoritos`} />
        <UserDashboardItemCard icon='payment' color='indigo'
          to='/mi-cuenta/pagos'
          label={`${0} formas de pago`} />
        <UserDashboardItemCard icon='recent_actors' color='green'
          to='/mi-cuenta/direcciones'
          label={`${0} direcciones de entrega`} />
        <UserDashboardItemCard icon='shopping_cart' color='deep-purple'
          to='/mi-cuenta/carrito'
          label={`${cartItems.length} elementos en el carrito`} />
        <UserDashboardItemCard icon='access_time' color='teal'
          to='/mi-cuenta/ordenes'
          label={`${0} ordenes pasadas`} />
      </div>
      <HorizontalSpace size='x-small' />
      <StrongText text='Panel de vendedor' fullWidth={true} align='left' />
      <p>Informacion y estadisticas del perfil de vendedor.</p>
      <div className='row'>
        <UserDashboardItemCard icon='store' color='blue'
          to='/mi-cuenta/empresas'
          label={`${0} Empresas`} />
        <UserDashboardItemCard icon='attach_money' color='green'
          to='/mi-cuenta/ventas'
          label={`${0} ventas`} />
        <UserDashboardItemCard icon='watch' color='red'
          to='/mi-cuenta/productos'
          label={`${0} productos`} />
        <UserDashboardItemCard icon='business' color='indigo'
          to='/mi-cuenta/servicios'
          label={`${0} servicios`} />
        <UserDashboardItemCard icon='directions_car' color='teal'
          to='/mi-cuenta/vehiculos'
          label={`${0} vehiculos`} />
        <UserDashboardItemCard icon='local_pizza' color='deep-orange'
          to='/mi-cuenta/platillos'
          label={`${0} platillos`} />
        <UserDashboardItemCard icon='home' color='deep-purple'
          to='/mi-cuenta/inmuebles'
          label={`${0} inmuebles`} />
      </div>
    </div>
  );
};

export default UserDashboard;
