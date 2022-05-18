import { useContext } from "react";
import SharedAlert from "src/components/Shared/SharedAlert";
import { LangContext } from "src/Context/LangContext";

const BasicAlert = () => {
    const lang = useContext(LangContext);

    return (
        <SharedAlert
            id="basic"
            content={
                <div>
                    若您有填寫資料將不紀錄<br />
                    確定返回?
                </div>
            }
            btnList={[
                { text: lang.CANCEL, type: 'gray' },
                { text: lang.CONFIRM }
            ]}
        />
    );
};

export default BasicAlert;