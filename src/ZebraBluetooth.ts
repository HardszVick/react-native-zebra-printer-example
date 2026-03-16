import {
  NativeModules,
  Permission,
  PermissionsAndroid,
  Platform,
} from 'react-native';
const { ZebraBluetooth } = NativeModules;

class permissions {
  private permissions: Permission[] = [
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
  ];
  constructor() {}

  public havePermissionAndroid = async () => {
    const responses = await Promise.all(
      this.permissions.map(p => {
        return PermissionsAndroid.check(p);
      }),
    );

    return responses.every(r => r);
  };

  public havePermissionIOS = () => {};
}

export default class Zebra {
  private permission = new permissions();

  public havePermission = () => {
    if (Platform.OS === 'android')
      return this.permission.havePermissionAndroid();

    if (Platform.OS === 'ios') return this.permission.havePermissionIOS();

    return true;
  };

  public getConnectedDevices = async () => {
    return ZebraBluetooth.getConnectedDevices();
  };

  public getDevices = async () => {
    return ZebraBluetooth.scanDevices();
  };

  public print = async (macAdress: string, text: string) => {
    return await ZebraBluetooth.printTest(macAdress, text);
  };

  public isConnected = async (macAdress: string) => {
    return ZebraBluetooth.isConnected(macAdress);
  };
}
