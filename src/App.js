import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./pages/Header";
import RandomImageCards from "./pages/RandomImageCards";
import { getImages } from "./redux/reducers/randomImages";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getImages({ count: 15 }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <RandomImageCards />
    </>
  );
}

export default App;
