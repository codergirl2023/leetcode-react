import Appbar from "./components/Appbar.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx";
import Landing from "./components/Landing.jsx";
import ProblemSet from "./components/ProblemSet.jsx";
import Problem from "./components/Problem.jsx";
import './App.css'
import CompanyWiseQuestionsList from "./components/CompanyWiseQuestionsList.jsx";
function App() {

    return (
        <>
            <Appbar/>

            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/problemSet/all" element={<ProblemSet/>}/>
                <Route path="/problemSet/:problemId" element={<Problem/>}/>
                <Route path="/companyWiseQuestions" element={<CompanyWiseQuestionsList/>}/>
            </Routes>
        </>
    );
}

export default App;
