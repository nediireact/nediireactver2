import React, {
  useState,
  useEffect
} from 'react';
import {
  useLocation
} from 'react-router-dom';
import SystemCheck from 'src/modules/system-check/system-check';
import NavBar from 'src/modules/nav-bar/nav-bar';
import DefaultNavButtons from 'src/modules/nav-bar/default-nav-buttons';
import Footer from 'src/modules/footer/footer';
import SystemConfigurationLoader from 'src/modules/system-configuration-loader/system-configuration-loader';
import SearchResults from 'src/modules/search-results/search-results';
import fetchData from 'src/modules/utils/fetch-data';

const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const SearchResultsPage = (): React.ReactElement => {
  const [sectionMenu, setSectionMenu]: any = useState([]);
  const [items, setitems]: any = useState([]);
  const params: any = useQuery();

  const updateQuery = ( queryParameter?: string ) => {
    setitems([]);
    const query: string = queryParameter ? queryParameter : params.get('q');
    const commonFields = 'name,img_picture,slug,stand,price,final_price,discount,short_description';
    const commonURL = `stand&filter[search]=${query}&fields[Stand]=name,slug`;
    const urls = [
      `products/?include=${commonURL}&fields[Product]=${commonFields}`,
      `services/?include=${commonURL}&fields[Service]=${commonFields}`,
      `meals/?include=${commonURL}&fields[Meal]=${commonFields}`,
      `real-estates/?include=${commonURL}&fields[RealEstate]=${commonFields}`,
      `vehicles/?include=model,model.make,${commonURL}&fields[Vehicle]=${commonFields},model,year&fields[Make]=name`,
      `expos?fields[Expo]=name,img_picture,slug,real&filter[search]=${query}`,
      `groups/?fields[Group]=name,img_picture,slug&filter[search]=${query}`,
      `stands/?&fields[Stand]=name,slug,img_logo,img_cover,ratings&fields[StandRating]=rating&filter[search]=${query}`
    ];
    const promises: any[] = [];
    urls.forEach((i: string) => {
      promises.push(new Promise((res) => {
        fetchData(i)
        .then((response: any) =>{
          res(response);
        });
      }));
    });

    Promise.all(promises)
      .then((data: any) => {
        const results: Array<any> = [];
        data.forEach((i: any) => {
          i.data.forEach((j: any) => {
            results.push(j);
          });
        });
        setitems(results);
      })
      .catch((err: any) => {
        console.log('error:', err);
      });
  };

  useEffect(() => {
    updateQuery();
  }, [fetchData]);

  return (
    <>
      <NavBar sectionMenu={sectionMenu} updateQuery={updateQuery} />
      <DefaultNavButtons setSectionMenu={setSectionMenu} />
      <SearchResults items={items} />
      <Footer />
      <SystemConfigurationLoader home={true} />
      <SystemCheck />
    </>
  );
};

export default SearchResultsPage;
