import { useContext } from 'react';
import { LangContext } from 'src/Context/LangContext';
import 'src/components/Statement.scss';

const Statement = () => {
    const lang = useContext(LangContext);

    return (
        <div className="statement-wrapper">
            <div className="fp-container">
                <div className="statement-title">
                    { lang.STATEMENT_TITLE }
                </div>
                <div className="statement-content">
                    <p>{ lang.STATEMENT_CONTENT_1 }</p>
                    <p>{ lang.STATEMENT_CONTENT_2 }</p>
                    <p>{ lang.STATEMENT_CONTENT_3 }</p>
                    <p>{ lang.STATEMENT_CONTENT_4 }</p>
                </div>
            </div>
        </div>
    );
};

export default Statement;