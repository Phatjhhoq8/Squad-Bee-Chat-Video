import React, {useState, useContext, useEffect, useCallback} from 'react';
import {RtcContext, ClientRole} from '../../agora-rn-uikit';
import DeviceContext from './DeviceContext';

interface Props {
  userRole: ClientRole;
}

const DeviceConfigure: React.FC<Props> = (props: any) => {
  const [selectedCam, setSelectedCam] = useState('');
  const [selectedMic, setSelectedMic] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const rtc = useContext(RtcContext);

  const refreshDevices = useCallback(async () => {
    rtc.RtcEngine.getDevices(function (devices: any) {
      console.log('set devices');
      setDeviceList(devices);
      for (const i in devices) {
        if (devices[i].kind === 'videoinput') {
          setSelectedCam(devices[i].deviceId);
          break;
        }
      }
      for (const i in devices) {
        if (devices[i].kind === 'audioinput') {
          setSelectedMic(devices[i].deviceId);
          break;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCam.length !== 0) {
      rtc.RtcEngine.changeCamera(
        selectedCam,
        () => {},
        (e: any) => console.log(e),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCam]);

  useEffect(() => {
    if (selectedCam.length !== 0) {
      rtc.RtcEngine.changeMic(
        selectedMic,
        () => {},
        (e: any) => console.log(e),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMic]);

  useEffect(() => {
    // See if device is empty
    const deviceIdIsEmpty = deviceList.find(
      (device) => device?.deviceId === '',
    );
    // If stream exists and deviceIds are empty, check for devices again
    if (
      rtc?.RtcEngine?.localStream &&
      Object.keys(rtc?.RtcEngine?.localStream).length !== 0 &&
      (deviceIdIsEmpty || deviceList.length === 0)
    ) {
      refreshDevices();
    }
  }, [rtc]);

  return (
    <DeviceContext.Provider
      value={{
        selectedCam,
        setSelectedCam,
        selectedMic,
        setSelectedMic,
        deviceList,
        setDeviceList,
      }}>
      {true ? props.children : <></>}
    </DeviceContext.Provider>
  );
};

export default DeviceConfigure;
