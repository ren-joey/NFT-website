import 'src/components/FirstArea/Counter.scss';

const Counter = () => (
    <div className="counter-area">
        <div className="row">
            <div className="col">
                <div className="counter">
                    <div className="digit">20</div>
                    <div className="digit-shadow">20</div>
                    <div className="unit">days</div>
                </div>
            </div>

            <div className="col">
                <div className="counter">
                    <div className="digit idx-2">23</div>
                    <div className="digit-shadow">23</div>
                    <div className="unit">hours</div>
                </div>
            </div>

            <div className="col">
                <div className="counter">
                    <div className="digit idx-3">59</div>
                    <div className="digit-shadow">59</div>
                    <div className="unit">minutes</div>
                </div>
            </div>

            <div className="col">
                <div className="counter font-a4-speed">
                    <div className="digit idx-4">59</div>
                    <div className="digit-shadow">59</div>
                    <div className="unit">seconds</div>
                </div>
            </div>
        </div>
    </div>
)

export default Counter;