import React from 'react';
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexScreen from "./IndexScreen/IndexScreen";
import MainScreen from "./mainScreen/mainScreen";
import NotFound from "./NotFound/NotFound";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<IndexScreen />}></Route>
                <Route path='/main' element={<MainScreen/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
