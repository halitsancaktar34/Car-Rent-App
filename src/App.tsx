import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
