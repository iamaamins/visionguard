import { Outlet } from 'react-router';
import Navigation from './Navigation';

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
