const DEV_MODE = 1
const PRODUCT_MODE = 2

const CONFIG_MODE = DEV_MODE

export const SERVICE_API_URL = (
    CONFIG_MODE==DEV_MODE?
    "https://preprod-coreapi.travelcarma.com/api":
    "https://preprod-coreapi.travelcarma.com/api"       //To do: replace with real service url
);
export const SERVICE_FILE_URL = (
    CONFIG_MODE==DEV_MODE?
    "http://192.168.1.112:8080":
    "http://www.meridians2.com:7000"       //To do: replace with real service url
);
export const APPLICATION_ID = 'b05f2a0cff97a1ba8eb3a3ec6ffb10e20651c1c7e5817312b553ecd584e0ce77'
