import PortfolioTable from "./PortfolioTable";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPortfolio } from "../../store/portfolio";

export default function PortfolioPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const portfolio = useSelector((state) => state.portfolio);
  const assets = useSelector((state) => state.assets);
  const dispatch = useDispatch();
  const [totalWorth, setTotalWorth] = useState(0);

  useEffect(() => {
    dispatch(getPortfolio(sessionUser));
  }, []);

  let tempTotal = 0;
  for (let key in portfolio) {
    if (key !== "meta") {
      const currentPrice = assets[key].quote.USD.price;
      const amount = portfolio[key].quantityOfAsset;
      tempTotal += currentPrice * amount;
    }
  }

  return (
    <>
      <h5>Total Portfolio Worth: {tempTotal}</h5>
      <PortfolioTable />
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getPortfolio } from "../../store/portfolio";

// export default function PortfolioDisplay() {
//   const sessionUser = useSelector((state) => state.session.user);
//   const portfolio = useSelector((state) => state.portfolio);
//   const assets = useSelector((state) => state.assets);
//   const dispatch = useDispatch();
//   const [totalWorth, setTotalWorth] = useState(0);

//   useEffect(() => {
//     dispatch(getPortfolio(sessionUser));
//   }, []);

//   let tempTotal = 0;
//   for (let key in portfolio) {
//     if (key !== "meta") {
//       const currentPrice = assets[key].quote.USD.price;
//       const amount = portfolio[key].quantityOfAsset;
//       tempTotal += currentPrice * amount;
//     }
//   }

//   return <h5>Total Portfolio Worth: {tempTotal}</h5>;
// }