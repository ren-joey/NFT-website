import DeviceDetector from "device-detector-js";

const userAgent =  window.navigator.userAgent;
const deviceDetector = new DeviceDetector();

export default deviceDetector.parse(userAgent);