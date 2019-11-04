import React from 'react';
import MenuBar from './MenuBar.js'
import MenuDrawer from './MenuDrawer.js'
import SelectedView from './SelectedView.js'

function App() {
  const [selectedOption, setSelectedOption] = React.useState("");
  const possibleOptions = ["Employees", "Projects"];

  return (
    <>
      <MenuBar selectedItem={possibleOptions[selectedOption]}/>
      <MenuDrawer setSelectedOption={setSelectedOption}/>
      <SelectedView setSelectedOption={setSelectedOption} selectedOption={selectedOption}></SelectedView>
    </>
  );
}

export default App;
