import React, { useState } from "react";
import AboutB from "src/components/AboutB";
import FirstArea from "src/components/FirstArea";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Roadmap from "src/components/Roadmap";
import 'src/views/FrontPage.scss';

const FrontPage = () => (
    <div className="wrapper">

        <div className="container">
            <Header />

            <FirstArea />

            <AboutB />

            <Roadmap />

            <Footer />
        </div>

        {/* [DEV] */}
        <div className="preview"></div>
    </div>
);

export default FrontPage;