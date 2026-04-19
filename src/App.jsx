import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [Userdata, setUserdata] = useState([]);
  const [index, setIndex] = useState(1); //helps in setting the index number

  //gets the data asyncronisuly
  const getdata = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=10`,
    );
    setUserdata(response.data); //making the set user data above one fill it with the data comming from the api
  };
  //automatically calls the data using effect
  useEffect(
    function () {
      getdata(); //calls the function
    },
    [index],
  );
  //helps in making the data print if there is no data then loading will print
  let printUserData = "Loading...";
  if (Userdata.length > 0) {
    printUserData = Userdata.map(function (elem, idx) {
      return (
        <div key={idx}>
          <a href={elem.url}>
            <div className="h-50 w-60 flex rounded overflow-hidden">
              <img
                className="object-cover h-full"
                src={elem.download_url}
                alt=""
              />
            </div>
            <h2 className="text-white font-bold text-xl">{elem.author}</h2>
          </a>
        </div>
      );
    });
  }
  return (
    <div className="bg-black overflow-auto h-screen w-full p-5">
      <div className=" flex flex-wrap justify-center items-center m-4 p-3 text-white gap-4">
        {printUserData}
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          className="h-20 w-30 bg-amber-500 rounded active:scale-90 text-black cursor-pointer font-bold text-xl"
          onClick={() => {
            if (index > 1) setIndex(index - 1);

            setUserdata([]); //helps in making the usedata empty
          }} //calls the previous one
        >
          Prev
        </button>
        <button
          className="h-20 w-30 bg-amber-500 rounded active:scale-90 text-black cursor-pointer font-bold text-xl"
          onClick={() => {
            setIndex(index + 1);
            setUserdata([]);
          }} //calls thenext one
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
