import React, {
  useState
} from 'react';
import 'src/modules/check-filter/check-filter.scss';

interface FilterInterface {
  name?: string;
  items: Array<any>;
  filter: string;
  join?: boolean;
  updateItems: Function;
}

const CheckFilter = (props: FilterInterface): React.ReactElement => {
  const [items, setItems]: Array<any> = useState([]);
  const filter: string = props.filter;
  const join: boolean = props.join ? props.join : false;

  const updateAddOnFilter = (e: any) => {
    const itemsCopy: Array<any> = [...items];
    const value: Number = Number(e.target.value);
    const add: boolean = e.target.checked ? true : false;
    if ( add ) {
      itemsCopy.push(value);
    } else if (itemsCopy.includes(value)) {
      itemsCopy.splice(itemsCopy.indexOf(value), 1);
    }
    setItems(itemsCopy);
    let filterValues = '';
    if ( join ) {
      filterValues = itemsCopy.length ? `&filter[${filter}__in]=${itemsCopy.join(',')}` : '';
    } else {
      itemsCopy.forEach((i: Number) => {
        filterValues += `&filter[${filter}]=${i}`;
      });
    }
    return props.updateItems({
      type: filter,
      value: filterValues
    });
  };

  return (
    <div className='CheckFilter'>
      <span className='CheckFilter__name'>{props.name}</span>
      {
        props.items && props.items.length ?
        props.items.map((i: any, index: number) => {
          return (
            <label key={index} className='grey-text text-darken-4'>
              <input type='checkbox' value={i.id} onChange={updateAddOnFilter} />
              <span>{i.attributes.name}</span>
            </label>
          );
        }) : null
      }
    </div>
  );
};
export default CheckFilter;
