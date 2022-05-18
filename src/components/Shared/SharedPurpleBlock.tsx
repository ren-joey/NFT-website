import 'src/components/Shared/SharedPurpleBlock.scss';

interface Props {
    content: JSX.Element,
    className?: string
}

const SharedPurpleBlock = ({
    content,
    className = ''
}: Props) => (
    <div className={`mint-block ${className}`}>
        { content }

        <div className="angle left top"></div>
        <div className="angle left bottom"></div>
        {/* <div className="angle right top"></div> */}
        <div className="angle right bottom"></div>
    </div>
);

export default SharedPurpleBlock;