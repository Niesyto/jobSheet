import React from 'react';
import MenuBar from './MenuBar.js'
import MenuDrawer from './MenuDrawer.js'

function App() {
  const [selectedOption, setSelectedOption] = React.useState("");
  return (
    <>
      <MenuBar selectedItem={selectedOption}/>
      <MenuDrawer setSelectedOption={setSelectedOption}/>
    </>
  );
}

export default App;
