import { useMoralis } from "react-moralis";
import { blackDescription, blackTitle, whiteCard } from "src/components/ui/uiClassName";
import LoginService from "./LoginService";

const UserBalance = () => {
    const {
        user,
        account,
        isAuthenticated
    } = useMoralis();

    return (
        <div className={whiteCard}>
            <div>
                {
                    isAuthenticated ?(
                        <div className={`${blackDescription} mb-4`}>
                            {user && `YOUR ID: ${user.id}`}
                            <br />
                            {account && `YOUR ADDRESS: ${account}`}
                        </div>
                    ) : (
                        <div className={`${blackTitle} mb-4`}>
                            請登入您的 Metamask 錢包
                        </div>
                    )
                }

                <LoginService />
            </div>
        </div>
    );
};

export default UserBalance;