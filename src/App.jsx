import Homepage from "./components/Homepage";

function App() {
  const myprofile = "https://avatars.githubusercontent.com/u/87885588?v=4";
  return (
    <>
      <Homepage myprofile={myprofile} />
    </>
  );
}

export default App;
