import DataContext from "./DataContext";
import Comp1 from "./Comp1";

function Parent() {

  const data = {
    name: "Rahul",
    role: "Developer",
    age: 22
  };

  return (
    <DataContext.Provider value={data}>
      <h2>Parent Component</h2>
      <Comp1 />
    </DataContext.Provider>
  );
}

export default Parent;
