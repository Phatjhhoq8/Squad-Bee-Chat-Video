import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import ChatContext, {controlMessageEnum} from '../components/ChatContext';
import ColorContext from '../components/ColorContext';
import {BtnTemplate} from '../../agora-rn-uikit';

const RemoteVideoMute = (props: {
  uid: number;
  video: boolean;
  isHost: boolean;
}) => {
  const {isHost = false} = props;
  const {sendControlMessageToUid} = useContext(ChatContext);

  return String(props.uid)[0] !== '1' ? (
    <BtnTemplate
      disabled={!isHost}
      onPress={() => {
        sendControlMessageToUid(controlMessageEnum.muteVideo, props.uid);
      }}
      style={style.buttonIconCam}
      name={props.video ? 'videocam' : 'videocamOff'}
    />
  ) : (
    <></>
  );
};

const style = StyleSheet.create({
  buttonIconCam: {
    width: 25,
    height: 25,
  },
});

export default RemoteVideoMute;
