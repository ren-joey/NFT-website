import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import WhiteCard from "src/components/ui/WhiteCard";
import Web3LoginService from "../Web3LoginService";

const UserBalance = () => {
    const { user } = useMoralis();

    useEffect(() => {
        console.log(user);
    }, [user]);

    const body = (
        <div>
            <div className="text-gray-800 text-sm mb-2">
                {user && `YOUR ADDRESS: ${user.id}`}
            </div>

            <Web3LoginService />
        </div>
    );

    return (
        <WhiteCard body={body} />
    );
};

export default UserBalance;