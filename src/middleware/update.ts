import Constants from 'expo-constants';

const appVersion: string = Constants.expoConfig.version;
const version: string = '0.1.0';

export let update: boolean = appVersion !== version ? true : false;