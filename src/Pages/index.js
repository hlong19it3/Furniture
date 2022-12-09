import { useParams } from 'react-router-dom';
import { UserPage } from './Admin/UsersPage';
import { OrderPage } from './Admin/OrdersPage';
import { CategoryPage } from './Admin/CategoriesPage';
import { CommentPage } from './Admin/CommentsPage';
import { ProductPage } from './Admin/ProductsPage';

function AdminPages() {
  const { adminRoute } = useParams();

  if (adminRoute === 'users') return <UserPage />;
  else if (adminRoute === 'products') return <ProductPage />;
  else if (adminRoute === 'categories') return <CategoryPage />;
  else if (adminRoute === 'orders') return <OrderPage />;
  else if (adminRoute === 'comments') return <CommentPage />;
  return <></>;
}

export default AdminPages;
