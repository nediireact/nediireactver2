import React, {
  useRef,
  useEffect,
  useState
} from 'react';
import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';

const PriceComponent = (props: any): React.ReactElement => {
  const sliderRef: any = useRef(null);
  const [slider, setSlider]: any = useState(null);
  const maxPrice = props.maxPrice;

  const onChangeSlider = (e: any) => {
    const meals = props.items;
    console.log('>>>>> e', e, meals, slider);
    // slider.set(0, 400);
    // let max = 0;
    // for (let i = 0; i < meals.length; i++) {
    //   const element = meals[i];
    //   const final_price = element.attributes.final_price;
    //   console.log('final_price:', i, final_price);
    //   max += Number(final_price);
    // }
    // max += 10;
    // props.setMaxPrice(max);
  };

  useEffect(() => {
    console.log('>>>>> meals', props.items, maxPrice);
    const sl = noUiSlider.create(sliderRef.current, {
      start: [0, 10], connect: true, step: 1, orientation: 'horizontal', // 'horizontal' or 'vertical'
      range: { 'min': 0, 'max': 10 },
      format: wNumb({
        decimals: 0
      })
    });
    sl.set([0, 400]);
    sl.on('change', onChangeSlider);
    setSlider(sl);
  }, [noUiSlider]);

  return (
    <>
      <span className='StandFilters__name'>Rango de precio</span>
      <span>0 - {maxPrice}</span>
      <div className='StandFilters__price' ref={sliderRef}></div>
    </>
  );
};

export default PriceComponent;
