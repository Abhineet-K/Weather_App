

const Weather = ({ weatherData }) => {
  return (
    <div>
      {weatherData.weather ? (
        <div className="w-[316px] sm:w-[700px] h-[460px] sm:h-[440px] bg-gray-400 shadow-lg rounded-xl ml-auto mr-4 sm:mr-auto my-3 relative px-10 py-4 top-[10%]">
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <div className="sm:w-1/2 sm:my-4 mx-auto flex justify-between items-center p-1 ">
              <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-32 h-full ">
                <div className="shadow-lg shadow-white rounded-lg px-4 py-2 flex gap-3 sm:gap-0 sm:flex-col  ">
                  <p className="text-xl sm:text-4xl ">
                    {weatherData.name},&nbsp;
                    {weatherData.sys.country}
                  </p>
                  <span className='block sm:hidden text-lg font-semibold'>|</span>
                  <p className="text-sm pt-1 sm:w-auto sm:text-2xl">
                    {weatherData.weather[0].description}
                  </p>
                </div>
                <div className="relative block sm:hidden ">
                  <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" className=" px-4 sm:py-0 sm:scale-150 shadow-lg shadow-white rounded-lg sm:mt-8 sm:mr-7 " />
                </div>
                <div className="shadow-lg shadow-white rounded-lg px-4 py-2 text-5xl sm:text-7xl">
                  <h1 className=" font-semibold">
                    {weatherData.main.temp.toFixed()}&nbsp;&deg;C
                  </h1>
                </div>
              </div>
            </div>

            <div className=" w-[290px] sm:w-1/2 flex flex-col justify-center sm:justify-between sm:items-end -ml-10 sm:mr-auto">
              <div className="relative hidden sm:block ">
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" className=" scale-150 shadow-lg shadow-white rounded-lg mt-8 sm:mr-7 " />
              </div>
              {weatherData.name !== undefined ? (
                <div className=" w-[270px] sm:w-auto flex flex-col justify-evenly gap-y-2 mb-4 ml-auto text-base sm:text-lg mt-6 sm:mt-24 rounded-lg shadow-lg shadow-white px-4 sm:px-6 py-4">
                  <div className="flex justify-between gap-x-8">
                    <p className=" font-semibold">Feels Like:</p>
                    <p className="font-bold w-20 text-left">
                      {weatherData.main.feels_like.toFixed()}&nbsp;&deg;C
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p className="font-semibold ">Humidty:</p>
                    <p className="font-bold w-20 text-left">
                      {weatherData.main.humidity.toFixed()}&nbsp;&#37;
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p className="font-semibold ">Wind Speed:</p>
                    <p className="font-bold w-20 text-left">
                      {weatherData.wind.speed.toFixed()}&nbsp;KPH
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p className="font-semibold ">Pressure:</p>
                    <p className="font-bold w-20 text-left">
                      {weatherData.main.pressure}&nbsp;hPa
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Weather