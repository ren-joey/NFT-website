import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutB from "src/components/AboutB/AboutB";
import BgEffects from "src/components/BgEffects";
import FirstArea from "src/components/FirstArea/FirstArea";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Roadmap from "src/components/Roadmap/Roadmap";
import 'src/views/FrontPage.scss';

const FrontPage = () => {
    gsap.registerPlugin(ScrollTrigger);

    return (
        <div className="wrapper">
            <Header />

            <div className="container">
                <FirstArea />

                <AboutB />

                <Roadmap />
            </div>

            <Footer />

            <BgEffects />

            {/* <div className="preview"></div> */}
        </div>
    );
}

export default FrontPage;