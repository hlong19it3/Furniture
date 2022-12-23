import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';

function UserLayout({ children }) {
  const pathName = window.location.pathname;
  const [showSideBar, setShowSideBar] = useState();

  useEffect(() => {
    if (pathName !== '/') {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  }, [pathName]);
  return (
    <div className="flex flex-col">
      <Header />
      {showSideBar === true ? (
        <div className="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start">
          <SideBar />
          {children}
        </div>
      ) : (
        children
      )}
      <Footer />
    </div>
  );
}

export default UserLayout;
