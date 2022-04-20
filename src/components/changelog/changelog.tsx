import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import fetchData from 'src/components/utils/fetch-data';
import {
  ParallaxHeaderImage,
  HorizontalSpace,
  SubTitle,
  StrongText
} from 'rrmc';
import { useSelector } from 'react-redux';
import * as M from 'materialize-css';
import {
  DateParser,
  GetMoneyFormat
} from 'rrmc';
import 'src/components/changelog/changelog.scss';
import {
  getIcon,
  getType
} from 'src/components/changelog/helpers';

const headerPictureFile = '/assets/login.jpg';

const TaskItem = ( props: any ): React.ReactElement => {
  const tableRef: any = useRef(null);

  useEffect(() => {
    M.Collapsible.init(tableRef.current, {});
  }, [M]);

  return (
    <ul className='collapsible' ref={tableRef}>
    {
      props.items.data.map((i: any, index: number) => {
        return (
          <li key={index}>
            <div className='collapsible-header ChangeLog__header'>
              <i className={`material-icons ChangeLog__icon--${i.attributes.task_type}`}>
                {getIcon(i.attributes.task_type)}
              </i>
              <div className='ChangeLog__task-name'>
                <span>{i.attributes.task_name}</span>
                <span className='hide-on-small-only'> ({i.attributes.hours} hora{i.attributes.hours !== 1 ? 's' : ''})</span>
              </div>
              <span className='ChangeLog__user-name hide-on-small-only'>
                {i.relationships.user.data.attributes.first_name}
              </span>
            </div>
            <div
              className='collapsible-body ChangeLog__description'>
                <div>
                  <b>Autor:</b> {i.relationships.user.data.attributes.first_name} {i.relationships.user.data.attributes.last_name}
                </div>
                <div>
                  <b>Tipo de tarea:</b> {getType(i.attributes.task_type)}
                </div>
                <div>
                  <b>Tiempo de desarrollo:</b> {i.attributes.hours} hora{i.attributes.hours !== 1 ? 's' : ''}
                </div>
                <div><b>Comentarios:</b></div>
                <div dangerouslySetInnerHTML={{
                  __html: i.attributes.description
                }}></div>
              </div>
          </li>
        );
      })
    }
    </ul>
  );
};

const ChangeLog = (): React.ReactElement => {
  const system = useSelector((state: any) => state.system);
  const prefix = system.platform.prefix;
  const headerPictureURL = `${prefix}${headerPictureFile}`;
  const [items, setitems]: any = useState([]);
  let subTotalOfProject = 0;
  let discountAmountOfProject = 0;
  let totalOfProject = 0;
  let ivaOfProject = 0;
  let totalToPayOfProject = 0;

  useEffect(() => {
    fetchData('sprints/?include=tasks,tasks.user&page[size]=100')
      .then((response: any) =>{
        setitems(response);
      });
  }, [fetchData]);

  return (
    <>
      <ParallaxHeaderImage
        image={headerPictureURL}
        gradientOpacity='0.2'
        size='x-small'
        title='Change Log' />
      <HorizontalSpace size='medium' />
      <div className='container ChangeLog'>
      {
        items && items.data ?
          <>
          {
            items.data.map((i: any, index: number) => {
              if ( !i.relationships.tasks.data.length ) return null;
              let totalTime = 0;
              const pricePerHour = i.attributes.price_per_hour;
              const discount = i.attributes.discount;
              const developers: any = {};

              i.relationships.tasks.data.forEach((e: any) => {
                totalTime += e.attributes.hours;
                if ( e.relationships && e.relationships.user &&
                  e.relationships.user.data && e.relationships.user.data.id &&
                  !developers.hasOwnProperty(e.relationships.user.data.id) ) {
                  developers[e.relationships.user.data.id] = {
                    ...e.relationships.user.data,
                    hours: 0
                  };
                }
                if ( e.relationships && e.relationships.user &&
                  e.relationships.user.data && e.relationships.user.data.id ) {
                  developers[e.relationships.user.data.id].hours += Number(e.attributes.hours);
                }
              });

              const devArray = [];
              for (const key in developers) {
                if (Object.prototype.hasOwnProperty.call(developers, key)) {
                  const element = developers[key];
                  devArray.push(element);
                }
              }

              const subTotal = totalTime * pricePerHour;
              const discountAmount = (subTotal * (discount / 100));
              const total = subTotal - discountAmount;
              const iva = (total * 0.16);
              const totalToPay = total + iva;
              const hourRate = total / totalTime;
              subTotalOfProject += subTotal;
              discountAmountOfProject += discountAmount;
              totalOfProject += total;
              ivaOfProject += iva;
              totalToPayOfProject += totalToPay;

              return (
                <div key={index}>
                  <SubTitle
                    text={i.attributes.name}
                    fullWidth={true}
                    align='left' />
                  <span className='ChangeLog__data-item grey-text text-darken-3'>
                    De {DateParser(i.attributes.date_start)} a {DateParser(i.attributes.date_end)}
                  </span>
                  <hr />
                  <span className='ChangeLog__data-item grey-text text-darken-3'>
                    Horas de desarrollo: <b className='indigo-text'>{totalTime} horas</b>
                  </span>
                  <span className='ChangeLog__data-item grey-text text-darken-3'>
                    Costo por hora: ${pricePerHour}.00 MXN
                  </span>
                  <span className='ChangeLog__data-item grey-text text-darken-3'>
                    Subtotal del sprint: {GetMoneyFormat(subTotal)} MXN
                  </span>
                  <span className='ChangeLog__data-item grey-text text-darken-3'>
                    Descuento: {discount}% ({GetMoneyFormat(discountAmount)} MXN)
                  </span>
                  <span className='ChangeLog__data-item grey-text text-darken-3'>
                    Total del sprint: {GetMoneyFormat(total)} MXN
                  </span>
                  <span className='ChangeLog__data-item grey-text text-darken-3'>
                    IVA: {GetMoneyFormat(iva)} MXN
                  </span>
                  <hr />
                  <span className='ChangeLog__data-item grey-text text-darken-3'>
                    <b>Total a pagar:</b> <b className='green-text'>{GetMoneyFormat(totalToPay)} MXN</b>
                  </span>
                  <hr />
                  {
                    devArray.map((i: any, index: number) => {
                      return (
                        <span className='ChangeLog__data-item grey-text text-darken-3' key={index}>
                          {i.attributes.first_name} {i.attributes.last_name}: {i.hours} horas ({GetMoneyFormat(i.hours * hourRate)} MXN)
                        </span>
                      );
                    })
                  }
                  <hr />
                  {
                    i.attributes.comments ?
                      <div
                        className='grey-text text-darken-3'
                        dangerouslySetInnerHTML={{
                          __html: i.attributes.comments
                      }}></div> : <HorizontalSpace size='x-small' />
                  }
                  <TaskItem items={i.relationships.tasks} />
                  <HorizontalSpace size='small' />
                </div>
              );
            })
          }
          <hr />
          <StrongText text='Sumario' fullWidth={true} align='left' />
          <span className='ChangeLog__data-item grey-text text-darken-3'>
            Subtotal del proyecto: {GetMoneyFormat(subTotalOfProject)} MXN
          </span>
          <span className='ChangeLog__data-item grey-text text-darken-3'>
            Descuento total del proyecto: {GetMoneyFormat(discountAmountOfProject)} MXN
          </span>
          <span className='ChangeLog__data-item grey-text text-darken-3'>
            Total del proyecto: {GetMoneyFormat(totalOfProject)} MXN
          </span>
          <span className='ChangeLog__data-item grey-text text-darken-3'>
            IVA total del proyecto: {GetMoneyFormat(ivaOfProject)} MXN
          </span>
          <span className='ChangeLog__data-item grey-text text-darken-3'>
            <b>Total a pagar del proyecto: {GetMoneyFormat(totalToPayOfProject)} MXN</b>
          </span>
          <HorizontalSpace size='xxx-small' />
          <hr />
          </> : null
      }
      </div>
      <HorizontalSpace size='small' />
    </>
  );
};

export default ChangeLog;
