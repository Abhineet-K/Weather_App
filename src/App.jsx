import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "./components/Weather";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidLocation, setIsInvalidLocation] = useState(false);

  const API_KEY = "aac4651b8d5b8370a7f5c5bc2dbaba0c";
  const SUGGESTION_API_URL =
    "https://wft-geo-db.p.rapidapi.com/v1/geo/places";

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(location);
    }
  };

  const fetchWeatherData = (location) => {
    if (location.length > 1) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${API_KEY}`)
        .then((response) => {
          setData(response.data);
          setSuggestions([])
        })
        .catch((error) => {
          setIsInvalidLocation(true)
          setSuggestions(false)
          setData({});
        });
    }
  };

  const fetchCitySuggestions = async (searchTerm) => {
    try {
      setIsLoading(true);
      const response = await axios.get(SUGGESTION_API_URL, {
        params: {
          minPopulation: '2000000',
          types: "CITY",
          namePrefix: searchTerm,
          limit: "8",
        },
        headers: {
          "X-RapidAPI-Key": "65cb31df54mshb8d444d0257dc79p11688fjsn6c5ec7f038c1",
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      });
      setSuggestions(response.data.data);
    } catch (error) {
      if (error) {

        setIsInvalidLocation(true)
        setSuggestions(false)
      }
      setSuggestions([]);
    } finally {
      setIsLoading(false);
      setIsInvalidLocation(false)
    }
  };

  useEffect(() => {
    if (location.trim() !== "" && location.length > 1) {
      fetchCitySuggestions(location);
    } else {
      setSuggestions([]);
    }
  }, [location]);

  const handleSelectCity = (cityName) => {
    setLocation(cityName);
    fetchWeatherData(cityName);
    setLocation("")
    setSuggestions([]);
  };


  return (
    <div className="w-full h-dvh relative bg-gray-800 flex justify-center">
      <div className="text-center py-4 sm:p-4 w-[320px] sm:w-auto">
        <div className="flex flex-col items-center gap-1">
          <input
            type="text"
            className="py-2 sm:py-3 px-3 sm:px-6 w-[310px] sm:w-[700px] text-base sm:text-lg rounded-3xl border border-gray-200 text-gray-800 font-semibold placeholder:text-gray-400 placeholder:font-medium focus:outline-none bg-gray-300 shadow-md "
            placeholder="Enter your city"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDownCapture={searchLocation}
          />
          <div className="w-[280px] sm:w-[670px]">
            {isInvalidLocation && <p className="text-gray-800 text-xs sm:text-lg  font-medium bg-red-300 absolute border-2 border-red-500 z-10 w-[280px] sm:w-[670px] rounded-md sm:rounded-lg shadow-md"> City Not Found <span className=" animate-bounce sm:px-2 sm:mx-2">===&rArr;</span>  Enter Valid City Name</p>}
            {isLoading && <p className="bg-gray-200 text-sm sm:text-lg font-medium absolute z-10 w-[280px] sm:w-[670px] rounded-md sm:rounded-lg border border-gray-200  shadow-md">Loading suggestions...</p>}
            {suggestions.length > 0 && (
              <ul className="bg-gray-200 text-sm sm:text-lg absolute z-10 w-[280px] sm:w-[670px] rounded-md sm:rounded-lg border border-gray-200  shadow-md p-1">
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer py-2 px-4 hover:bg-gray-300 text-start font-medium text-gray-700 ${index === 0 ? '' : 'border-t-2 border-gray-300'}`}
                    onClick={() => handleSelectCity(city.name)}
                  >
                    {city.name}, {city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Weather weatherData={data} />
      </div>
    </div >
  );
}

export default App;




















// import axios from "axios";
// import { useState } from "react";
// import Weather from "./components/Weather";

// function App() {
//   const [data, setData] = useState({});
//   const [location, setLocation] = useState("")

//   const API_KEY = "aac4651b8d5b8370a7f5c5bc2dbaba0c"
//   const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${API_KEY}`

//   const searchLocation = (event) => {
//     if (event.key === "Enter") {
//       axios.get(API_URL).then((response) => {
//         setData(response.data)
//         console.log(response.data)
//       })
//       setLocation("")
//     }
//   }

//   return (
//     <div className='w-full h-full relative'>
//       <div className="text-center p-4">
//         <div className="flex flex-col items-center ">
//           <input type="text" className="py-3 px-6 w-[700px] text-lg rounded-3xl border border-gray-200 text-gray-600 font-semibold placeholder:text-gray-400 placeholder:font-medium focus:outline-none bg-gray-300 shadow-md "
//             placeholder="Enter your city"
//             value={location}
//             onChange={(event) => setLocation(event.target.value)}
//             onKeyDownCapture={searchLocation}
//           />

//         </div>

//         <Weather weatherData={data} />
//       </div>
//     </div>
//   );
// }

// export default App;
