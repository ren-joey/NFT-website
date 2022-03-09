import { useMoralis } from "react-moralis";
import { blackDescription, whiteCard } from "src/components/ui/uiClassName";
import LoginService from "./LoginService";

const UserBalance = () => {
    const {
        user,
        account
    } = useMoralis();

    return (
        <div className={whiteCard}>
            <div>
                <div className={blackDescription}>
                    {user && `YOUR ID: ${user.id}`}
                    <br />
                    {account && `YOUR ADDRESS: ${account}`}
                </div>

                <LoginService />
            </div>
        </div>
    );
};

export default UserBalance;