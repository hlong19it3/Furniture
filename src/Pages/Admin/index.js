import { useParams } from 'react-router-dom';
import { UserPage } from './UsersPage';
import { OrderPage } from './OrdersPage';
import { CategoryPage } from './CategoriesPage';
import { CommentPage } from './CommentsPage';
import { ProductPage } from './ProductsPage';
import { Manufacturer } from './ManufacturersPage';

function AdminPages() {
  const { adminRoute } = useParams();

  if (adminRoute === 'users') return <UserPage />;
  else if (adminRoute === 'products') return <ProductPage />;
  else if (adminRoute === 'categories') return <CategoryPage />;
  else if (adminRoute === 'manufacturers') return <Manufacturer />;
  else if (adminRoute === 'orders') return <OrderPage />;
  else if (adminRoute === 'comments') return <CommentPage />;
  return <></>;
}

export default AdminPages;
