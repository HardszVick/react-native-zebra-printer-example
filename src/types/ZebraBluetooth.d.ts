import 'react-native';

type TBluetoothDevice = {
  name: string;
  mac: string;
};

declare module 'react-native' {
  interface NativeModulesStatic {
    ZebraBluetooth: {
      getConnectedDevices(): Promise<TBluetoothDevice[]>;
      scanDevices(): Promise<TBluetoothDevice[]>;
      connect(macAddress: string): Promise<boolean>;
      print(macAddress: string, data: string): Promise<void>;
      printTest(macAddress: string, data: string): Promise<void>;
      isConnected(macAddress: string): Promise<boolean>;
    };
  }
}
