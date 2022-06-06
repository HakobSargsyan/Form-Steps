import FormFlow from "./components/FormFlowContainer";
import PageNotFound from "./components/PageNotFound";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Navigate to="/flow/1" /> } />
                <Route path="/flow" element={<FormFlow />}>
                    <Route path="/flow:step" element={<FormFlow />}></Route>
                </Route>
                <Route path="/404" element={<PageNotFound />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
