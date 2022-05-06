import { scrollToFaq } from 'src/animation/scrollToTrigger';
import 'src/components/Shared/Buttons/SharedFaqButton.scss';

const SharedFaqButton = () => <div className="faq-button" onClick={() => scrollToFaq()}>FAQ</div>;

export default SharedFaqButton;