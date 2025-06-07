import { BrowserRouter, Route, Routes } from "react-router";
import { CoctailViewPage } from "./pages/coctailViewPage";
import { NotFoundPage } from "./pages/notFoundPage";
import { Provider } from "react-redux";
import { store } from "./store";
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='app-wrapper'>
          <Routes>
            <Route path="/" element={<CoctailViewPage />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>

    </Provider>
  )
}

export default App
