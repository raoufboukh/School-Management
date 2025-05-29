import { store } from "@/redux/store/store";
import { Provider } from "react-redux";

const LayoutWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>;
};

export default LayoutWrapper;
