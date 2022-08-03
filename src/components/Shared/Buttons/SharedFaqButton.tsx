import { scrollToFaq } from 'src/animation/scrollToTrigger';
import 'src/components/Shared/Buttons/SharedFaqButton.scss';

interface Props {
    onClick?: () => void
}

const SharedFaqButton = ({ onClick }: Props) => (
    <div
        className="faq-button"
        onClick={
            () => onClick ? onClick() : scrollToFaq()
        }
    >
        FAQ
    </div>
);

export default SharedFaqButton;