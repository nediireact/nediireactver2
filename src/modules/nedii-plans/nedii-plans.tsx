import React, {
  useEffect,
  useState
} from 'react';
import APISDK from 'src/api/api-sdk/api-sdk';

const NediiPlanItem = (props: any): React.ReactElement => {
  const item = props.item;
  return (
    <>
    {
      item && item.id ?
        <div className='col s6 m4 l3'>
          {item.id} {item.attributes.name}
        </div> : null
    }
    </>
  );
};

const NediiPlans = (): React.ReactElement => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    APISDK.GetNediiPlans()
      .then((data: any) => {
        setPlans(data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [APISDK]);

  return (
    <div className='row'>
    {
      plans.map((i: any, index: number) => {
        return <NediiPlanItem item={i} key={index} />;
      })
    }
    </div>
  );
};

export default NediiPlans;
