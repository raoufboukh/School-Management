"use client";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";
import Navbar from "./Navbar/Navbar";
import AuthenticatedLayout from "./AuthenticatedLayout";

const LayoutWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </Provider>
  );
};

export default LayoutWrapper;
