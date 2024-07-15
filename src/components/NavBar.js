import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onSearchKey }) => {
  const handleSearchChange = (event) => {
    onSearchKey(event.target.value);
  };

  return (
    <nav className="border-b w-full px-1.5 md:px-4 py-2.5 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex flex-row max-w-sm flex-nowrap">
          <div className="flex flex-row items-center object-cover flex-nowrap shrink-0">
            <Link to="/">
              <img
                src="/ihwiki.png"
                alt="ihwiki icon"
                className="w-[60px] h-[60px] mr-1"
                loading="lazy"
                quality="100"
                width="1800"
                height="1800"
              />
            </Link>
          </div>
          <input
            onChange={handleSearchChange}
            className="border-none bg-slate-200 hover:bg-slate-300 pl-3 p-2 rounded-[50px] m-1 w-full text-slate-600 text-md font-bold placeholder:text-slate-600 outline-none"
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="flex flex-row items-center flex-nowrap">
          <a
            href="https://blog-ihwiki.onrender.com/"
            className="px-2 py-1 mx-2 text-sm font-bold transition-transform duration-100 ease-out border rounded-md md:text-lg hover:scale-105 border-slate-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            blog
          </a>

          <a href="https://tally.so/r/nWRN7P" target="_blank" rel="noopener noreferrer">
            <svg
              className="w-9 h-9 p-1.5 m-1 rounded-md border-slate-900 border"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                  stroke="#1C274C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                ></path>
              </g>
            </svg>
          </a>

          <Link to="/about">
            <svg
              className="w-9 h-9 p-1.5 m-1 rounded-md border-slate-900 border"
              fill="#000000"
              width="64px"
              height="64px"
              viewBox="0 -0.06 33.834 33.834"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g transform="translate(-95.748 -577)">
                  <path
                    d="M110.965,592.309a2.38,2.38,0,0,1,.489-1.434,9.29,9.29,0,0,1,1.443-1.482,10.139,10.139,0,0,0,1.321-1.372,1.985,1.985,0,0,0,.368-1.2,1.956,1.956,0,0,0-1.983-2,2.073,2.073,0,0,0-1.419.543,3.575,3.575,0,0,0-.954,1.582l-2.152-.939a5.029,5.029,0,0,1,1.724-2.656,4.626,4.626,0,0,1,2.9-.927,4.968,4.968,0,0,1,2.287.531,4.168,4.168,0,0,1,1.651,1.495,3.974,3.974,0,0,1,.612,2.175,3.688,3.688,0,0,1-.538,1.965,8.8,8.8,0,0,1-1.639,1.865,13.862,13.862,0,0,0-1.358,1.322,1.536,1.536,0,0,0-.379,1,2.85,2.85,0,0,0,.1.667h-2.2A2.737,2.737,0,0,1,110.965,592.309Zm1.467,6.968a1.851,1.851,0,0,1-1.357-.543,1.831,1.831,0,0,1-.551-1.359,1.875,1.875,0,0,1,.551-1.372,1.835,1.835,0,0,1,1.357-.556,1.807,1.807,0,0,1,1.367.556,1.9,1.9,0,0,1,.535,1.372,1.885,1.885,0,0,1-.535,1.359A1.81,1.81,0,0,1,112.432,599.277Z"
                    fill="#4a00b4"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  ></path>
                  <circle
                    cx="3.801"
                    cy="3.801"
                    r="3.801"
                    transform="translate(95.748 577)"
                    fill="#4a00b4"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  ></circle>
                </g>
              </g>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
