import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';

function UserLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start">
        <SideBar />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
