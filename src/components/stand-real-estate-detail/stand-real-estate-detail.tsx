import React, {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router';
import APISDK from 'src/api/api-sdk';
import GenericItemDetail from 'src/components/generic-item-detail';

const StandRealEstateDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();
  const [item, setItem]: any = useState({});

  useEffect(() => {
    APISDK.GetRealEstateBySlug(params.realEstateId)
      .then((response: any) => {
        setItem(response);
      })
      .catch(() => {
        return navigate('/');
      });
  }, [APISDK]);

  return (
    <>
      {
        item && item.id ? <GenericItemDetail item={item}/> : null
      }
    </>
  );
};

 export default StandRealEstateDetail;
