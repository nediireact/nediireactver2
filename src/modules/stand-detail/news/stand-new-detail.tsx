import React, {
  useEffect,
  useState } from 'react';
import {
  useNavigate,
  useParams } from 'react-router';
import fetchData from 'src/modules/utils/fetch-data';
import StandParallaxHeaderImage from 'src/modules/stand-detail/stand-parallax-header-image';
import StandNewsDetailContent from 'src/modules/stand-detail/stand-news-detail-content/stand-news-detail-content';
import HorizontalSpace from 'src/modules/horizontal-space/horizontal-space';

const newsData = {
  attributes: {
    created: '',
    description: '',
    img_picture: '',
    name: '',
    slug: ''
  },
  relationships: {
    stand: {
      data: {
        attributes: {
          name: '',
          img_logo: '',
          restaurant: false,
          slogan: ''
        }
      }
    }
  }
};

const StandNewDetail = (): React.ReactElement => {
  const navigate = useNavigate();
  const params: any = useParams();
  const [news, setnews]: any = useState(newsData);
  const url = `stand-news?filter[slug]=${params.standNewsId}&include=stand`;

  useEffect(() => {
    fetchData(url)
      .then((response: any) => {
        console.log(response);
        if ( response.data.length === 0 ) {
          console.log('Error, noticia no existe');
        } else {
          const newsData = response.data[0];
          if (!newsData) return navigate('/');
          console.log('newsData', newsData);
          setnews(newsData);
        }
      })
      .catch((error) => {
        console.log('Hubo un error', url, error);
      });
  }, [fetchData]);

  return (
    <>
      <StandParallaxHeaderImage
        image={news.relationships.stand.data.attributes.img_cover}
        size='medium'
        title={news.relationships.stand.data.attributes.name}
        logo={news.relationships.stand.data.attributes.img_logo}
        restaurant={news.relationships.stand.data.attributes.restaurant}
        slogan={news.relationships.stand.data.attributes.slogan} />
      <HorizontalSpace size='medium' />
      <StandNewsDetailContent
        image={news.attributes.img_picture}
        name={news.attributes.name}
        created={news.attributes.created}
        description={news.attributes.description} />
    </>
  );
};

export default StandNewDetail;
