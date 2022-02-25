import { useMoralis } from "react-moralis";
import { blackTitle, whiteCard } from "src/components/ui/uiClassName";
import LoginService from "./LoginService";

const UserBalance = () => {
    const { user } = useMoralis();

    return (
        <div className={whiteCard}>
            <div>
                <div className={blackTitle}>
                    {user && `YOUR ADDRESS: ${user.id}`}
                </div>

                <LoginService />
            </div>
        </div>
    );
};

export default UserBalance;