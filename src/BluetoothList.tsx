import { View, Button } from 'react-native';
import Zebra from './ZebraBluetooth';

const BluetoothList = () => {
  const macAdress = 'AC:3F:A4:15:5E:D5';
  const z = new Zebra();

  const getDevices = async () => {
    const hasPermission = await z.havePermission();
    if (!hasPermission) {
      return;
    }
    const devices = await z.getDevices();
    console.log(devices);
  };

  const getDevicesConnected = async () => {
    const devices = await z.getConnectedDevices();
    console.log(devices);
  };

  const connect = async () => {
    const connected = await z.isConnected(macAdress);
    console.log(connected);
  };

  const print_zpl = async () => {
    const ZPL_HELLO_WORLD = `
        ^XA
        ^CF0,60
        ^FO50,50
        ^FDHello World^FS
        ^XZ
    `;
    await z.print(macAdress, ZPL_HELLO_WORLD);
  };

  const print_cdl = async () => {
    const CDL_HELLO_WORLD =
      '! 0 200 200 400 1\r\n' + 'TEXT 4 0 50 50 Hello World\r\n' + 'PRINT\r\n';

    await z.print(macAdress, CDL_HELLO_WORLD);
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 10 }}>
      <Button onPress={getDevices} title="Devices" />
      <Button onPress={getDevicesConnected} title="Devices Connected" />
      <Button onPress={connect} title="Connect" />
      <Button onPress={print_zpl} title="Print ZPL" />
      <Button onPress={print_cdl} title="Print CDL" />
    </View>
  );
};

export default BluetoothList;
