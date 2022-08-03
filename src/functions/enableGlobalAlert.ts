import { AlertData } from 'src/@types/viewVariables';
import { EventBus } from 'src/bus';

const enableGlobalAlert = (alertData: Omit<AlertData, 'id'>) => {
    EventBus.$emit(
        'global-alert',
        alertData
    );
};

export default enableGlobalAlert;