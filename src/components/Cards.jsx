import { useState, useRef, useCallback } from "react";
import Card from "./Card.jsx";
import useMessages from "../hooks/useMessages.jsx";

const Cards = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } =
    useMessages(pageNum);
  const intObserver = useRef();

  const lastMessageRef = useCallback(
    (message) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((messages) => {
        if (messages[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (message) intObserver.current.observe(message);
    },
    [isLoading, hasNextPage]
  );

  if (isError) return <p className="center">Error: {error.message}</p>;

  console.log("results, Cards.jsx", results);
  const content = results.map((message, i) => {
    if (results.length === i + 1) {
      return <Card ref={lastMessageRef} key={message.id} message={message} />;
    }
    return <Card message={message} key={message.id} />;
  });

  return (
    <>
      {content}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </>
  );
};

export default Cards;
