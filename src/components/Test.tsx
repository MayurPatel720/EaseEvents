/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import MyLayout from "../layout/MainLayout";
import axios from "axios";

const fetchPosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
};

const Test = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <MyLayout>
        <h2 className="mb-6 text-2xl">Fetching Data:</h2>
        <ul>
          {isPending ? (
            <p>Loading...</p>
          ) : (
            data.map((post: any, index: 1) => (
              <li className="font-normal" key={post.id}>
                {index + 1} {post.title}
              </li>
            ))
          )}
        </ul>
      </MyLayout>
    </>
  );
};

export default Test;
