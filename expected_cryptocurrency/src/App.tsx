import React from 'react';
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainScreen from "./mainScreen/MainScreen";
import NotFound from "./NotFound/NotFound";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainScreen/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
