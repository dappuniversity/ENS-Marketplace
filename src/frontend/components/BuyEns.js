import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const BuyEns = ({ marketplace, ENSContract }) => {
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    if (marketplace !== '') {
      allListing();
    }
  }, [marketplace]);

  const allListing = async () => {
    setLoading(true);
    try {
      const itemCount = await marketplace.itemCount();
      let items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i);

        if (item.listed) {
          const itemId = item.itemId.toString();
          const price = item.price.toString();
          //add all these to an array and save in state
          items.push({
            price: price,
            name: item.name,
            itemId: itemId,
            seller: item.seller,
          });
        }
      }
      setLoading(false);
      //   console.log(items);
      setAllListings(items);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const buyListing = async (item) => {
    setBuyLoading(true)
    try {
      const tx = await marketplace.buyENS(item.itemId, {
        value: item.price,
      });
      await tx.wait();
      alert('Congrats! You have bought the ENS', item.name);
      setBuyLoading(false);
      allListing();
    } catch (error) {
      setBuyLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
        <h2 className='text-center mb-5'>Explore and Buy ENS</h2>
      {loading ? (
        <Loading val='Loading...'/>
      ) : allListings.length === 0 ? (
        <div>There are currently no ENS for Sale</div>
      ) : (
        <div className='row' >
        {allListings.map((item, i) => (
        <div className='col-lg-4 col-md-6 col-sm-6 mb-4' key={i}>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>{item.name}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>
                Price: {item.price / 10 ** 18} ETH
              </h6>
              <button
                className='btn btn-primary'
                onClick={() => buyListing(item)}
              >
                {buyLoading ? (
            <span>
              <span
                className='spinner-border spinner-border-sm me-2'
                role='status'
                aria-hidden='true'
              ></span>
              <span>Processing..</span>
            </span>
          ) : (
            <span>Buy This ENS</span>
          )}
              </button>
            </div>
          </div>
          </div>
        )
        )}
        </div>
      )}
    </div>
  );
};

export default BuyEns;
