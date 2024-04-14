import Constants from 'expo-constants';

const appVersion: string = Constants.expoConfig.version;
const version: string = '2.0.0';

export let update: boolean = appVersion !== version ? true : false;