import React from 'react';
import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainScreen from "./mainScreen/MainScreen";
import NotFound from "./NotFound/NotFound";
import {useCookies} from "react-cookie";

const App = () => {
    const [cookies,setCookie, ] = useCookies(['coinUuid']);
    setCookie(cookies.coinUuid.uuid, 'Qwsogvtv82FCd')
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
