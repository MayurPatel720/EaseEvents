/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  const user = useSelector((store: any) => store.auth.user);

  return (
    <>
      <MainLayout>
        <p>Home</p>
        {user && (
          <>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
