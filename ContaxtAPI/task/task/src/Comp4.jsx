import { useContext } from "react";
import DataContext from "./DataContext";

function Comp4() {

  const data = useContext(DataContext);

  return (
    <>
      <h3>Component 4 (Access)</h3>
      <p>Name: {data.name}</p>
      <p>Role: {data.role}</p>
      <p>Age: {data.age}</p>
    </>
  );
}

export default Comp4;
