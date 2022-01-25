import 'src/components/Shared/SocialButton.scss';

interface Props {
    className: string,
    name: string
}

const SocialButton = ({ className, name }: Props) => (
    <div className={`link-btn ${className}`}>
        <div className={`icon ${className}`}></div>
        <div className="text">
            {name}
        </div>
    </div>
);

export default SocialButton;