import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({logo, connectWallet, account, loading}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">ENS Marketplace</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/' className="nav-link">List</Link>
        </li>
        <li className="nav-item">
          <Link to='/buyens' className="nav-link">Buy ENS</Link>
        </li>
      </ul>
      <form className="d-flex">
      {account == null ? (
        <button className='btn btn-primary' onClick={connectWallet}>
          {loading ? (
            <span>
              <span
                className='spinner-border spinner-border-sm me-2'
                role='status'
                aria-hidden='true'
              ></span>
              <span>Connecting..</span>
            </span>
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
      ) : (
        <button type="button" className="btn btn-outline-primary" disabled>{account.slice(0, 7) + '....' + account.slice(34, 42)}</button>
      )}
      </form>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
