import React from "react";

const Pagination = ({ next, previous }) => {
  return (
    <div>
      {previous && <button onClick={previous}>Vorige</button> }
      {next &&<button onClick={next}>Volgende</button> }
    </div>
  );
};

export default Pagination;
