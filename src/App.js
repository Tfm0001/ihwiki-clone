
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.js';
import FooterBar from './components/FooterBar.js';
import data from './db.json'

import { getCategoryEmoji, upperFirstLetter, getRefLink, sliceString } from 'src/helpers/utils.js';
import HoverImage from './assets/hover-on-card.png';

const App = () => {
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-undef
  const [store] = useState(data);
  const [filteredStore, setFilteredStore] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [quickViewData, setQuickViewData] = useState('');
  

  const handleQuickViewData = (item) => {
    setQuickViewData(item);
  };

  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
  const filterStore = useCallback((category) => {
    category = category.toLowerCase();

    if (category === 'all') {
      setFilteredStore(store);
      return;
    }

    if (activeCategory === category) {
      setActiveCategory('');
      setFilteredStore(store);
      return;
    }

    const filtered = store.filter((item) => {
      let tempCategories = item.categories.map((element) => element.toLowerCase());

      if (tempCategories.includes(category)) {
        setActiveCategory(category);
        return item;
      }

      return null;
    });

    setFilteredStore(filtered);
  });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const allCategories = data
      .map((element) => element.categories)
      .flat(1)
      .map((element) => element.toLowerCase())
      .sort((a, b) => a.localeCompare(b));
    setCategories([...new Set(allCategories)]);
    filterStore('all');

    if (sessionStorage.getItem('visit') === null) {
      analyticsData('vp');
    } else {
      analyticsData('p');
    }

    sessionStorage.setItem('visit', 'ih');
  }, [filterStore, store]);

  useEffect(() => {
    const filtered = store.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStore(filtered);
  }, [search, store]);

  const analyticsData = async (valueToSend) => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/update?toUpdate=${valueToSend}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_SECRET}`,
        },
      }
    );
  };

  return (
    <div className="bg-slate-50">
      <NavBar onSearchKey={searchChange} />

      <div className="h-full m-2 bg-slate-50">
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 p-3 m-2 xs:justify-start xs:text-sm">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => filterStore(category)}
              className={
                category === activeCategory
                  ? 'grayscale-0 rounded-full border-2 border-solid px-2.5 py-1.5 -m-[4px] font-semibold bg-white'
                  : 'rounded-full border-2 border-dashed px-2.5 py-1.5 -m-[4px] hover:border-solid font-semibold hover:grayscale-0 bg-white grayscale'
              }
            >
              {getCategoryEmoji(category)} {upperFirstLetter(category)}
            </button>
          ))}
        </div>

        <div className="flex flex-row">
          <div className="grid grid-cols-3 gap-3 overflow-hidden md:w-3/4 md:grid-cols-3 lg:grid-cols-4 min-w-min xs:grid-cols-1 auto-cols-min auto-rows-min">
            {filteredStore.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg items-start bg-white px-5 py-1.5 justify-start block overflow-hidden h-auto hover:sm:shadow-lg hover:shadow-md"
                onMouseOver={() => handleQuickViewData(item)}
                onMouseLeave={() => setQuickViewData('')}
              >
                <h4 className="my-2 text-base font-semibold text-primary">
                  {item.name}
                </h4>
                <p className="mb-5 text-sm">{sliceString(item.description)}</p>
                <div className="flex flex-row flex-wrap items-center justify-between m-0.5">
                  <div className="flex gap-2 p-1 border rounded-lg">
                    {item.categories.map((category, index) => (
                      <span key={index}>{getCategoryEmoji(category)}</span>
                    ))}
                  </div>

                  <div className="border rounded-lg">
                    <span>{getCategoryEmoji(item.pricing)}</span>
                  </div>
                  <a href={getRefLink(item.external_link)} target="_blank" rel="noopener noreferrer">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                    >
                      <path
                        fill="#000000"
                        fillRule="evenodd"
                        d="M18.885 2a1 1 0 00-1-1h-6a1 1 0 100 2h3.586L9.178 9.293a1 1 0 101.414 1.414l6.293-6.293V8a1 1 0 102 0V2zM3.009 3a2.012 2.012 0 00-1.998 2.218c.148 1.453.374 3.978.374 5.782 0 1.746-.212 4.17-.36 5.642a2.028 2.028 0 002.218 2.218c1.473-.148 3.896-.36 5.642-.36 1.804 0 4.33.226 5.782.374a2.012 2.012 0 002.218-1.998V12a1 1 0 10-2 0v4.878l-.003.003a.018.018 0 01-.006.003h-.006c-1.451-.147-4.068-.384-5.985-.384-1.857 0-4.37.222-5.842.37h-.008a.034.034 0 01-.012-.008.033.033 0 01-.008-.012.01.01 0 010-.002v-.006c.148-1.473.37-3.985.37-5.842 0-1.917-.237-4.534-.385-5.985v-.006l.004-.006A.016.016 0 013.007 5h4.878a1 1 0 000-2H3.009z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed hidden right-5 md:w-1/5 h-fit md:flex md:flex-col">
            <h3 className="mb-5 text-lg font-light">Quick View:</h3>

            <div className="p-2 border-4 border-white rounded-lg md:shadow-xl">
              {quickViewData === '' ? (
                <div className="flex flex-col items-center gap-5 p-4">
                  <p className="text-lg font-light">Hover on a card to see full details</p>
                  <img src={HoverImage} alt="hover" className="w-[200px] h-[200px]" />
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 p-2">
                  <h3 className="text-lg font-normal">{quickViewData.name}</h3>
                  <p className="text-base font-light tracking-tight">
                    {quickViewData.description}
                  </p>
                  <p className="flex gap-2 font-light">
                    Tier:
                    <span className="flex gap-2">
                      {quickViewData.pricing} {getCategoryEmoji(quickViewData.pricing)}
                    </span>
                  </p>
                  <p className="flex gap-2 font-light">
                    Categories:
                    {quickViewData.categories.map((category, index) => (
                      <span key={index}>
                        {category} {getCategoryEmoji(category)}
                      </span>
                    ))}
                  </p>
                  {quickViewData.external_link && (
                                        <p className="text-sm font-light">External link available</p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                    
                          <FooterBar />
                        </div>
                      );
                    };
                    
                    export default App;


                    