import axios from 'axios';
import Moralis from 'moralis';
import { useContext, useEffect, useMemo, useState } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { blackTitle, cyanBtn, whiteCard } from "src/components/ui/uiClassName";
import { ContractContext } from '../ContractService/ContractContext';
import moralisConfig from "../moralisConfig";
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