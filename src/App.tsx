import React from 'react';
import './App.css';
import MainLayout from './containers/MainLayout';
import Router from './containers/routers';

function App() {
    return (
        <div className="App">
            <MainLayout>
                <Router />
            </MainLayout>
        </div>
    );
}

export default App;
