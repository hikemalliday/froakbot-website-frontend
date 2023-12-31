import React from "react";

const Card = React.forwardRef(({ message }, ref) => {
  const messageArray = message.message.split("\n");
  const cardBody = (
    <>
      <div className="message-date">{message.date}</div>
      <div className="card">
        {messageArray.map((line) => {
          return (
            <>
              {line}
              <br />
            </>
          );
        })}
      </div>
    </>
  );

  const content = ref ? (
    <article ref={ref}>{cardBody}</article>
  ) : (
    <article>{cardBody}</article>
  );

  return content;
});

export default Card;
