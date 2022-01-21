import wNumb from 'wnumb';

const moneyFormat = wNumb({
  mark: '.',
  thousand: ',',
  prefix: '$',
  decimals: 2
});

const getMoneyFormat = ( value: any ): string => {
  return moneyFormat.to(Number(value));
};

export default getMoneyFormat;
