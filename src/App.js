import React from 'react';
import MenuBar from './Menu/MenuBar.js'
import MenuDrawer from './Menu/MenuDrawer.js'
import SelectedView from './SelectedView.js'

function App() {
  const [selectedOption, setSelectedOption] = React.useState("");
  const possibleOptions = ["Employees", "Projects", "Assign employee"];

  return (
    <>
      <MenuBar selectedItem={possibleOptions[selectedOption]} />
      <MenuDrawer setSelectedOption={setSelectedOption} />
      <SelectedView setSelectedOption={setSelectedOption} selectedOption={selectedOption}></SelectedView>
    </>
  );
}

export default App;
