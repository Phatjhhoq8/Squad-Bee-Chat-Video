import React, {useContext} from 'react';
import {RtcContext} from '../../agora-rn-uikit';
import {LocalContext} from '../../agora-rn-uikit';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import icons from '../assets/icons';
import ColorContext from '../components/ColorContext';

function LocalVideoMute() {
  const {primaryColor} = useContext(ColorContext);
  const {dispatch} = useContext(RtcContext);
  const local = useContext(LocalContext);

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch({
          type: 'LocalMuteVideo',
          value: [local.video],
        });
      }}>
      <Image
        style={[styles.icon, {tintColor: primaryColor}]}
        source={{uri: local.video ? icons.videocam : icons.videocamOff}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 22,
    marginHorizontal: 3,
    tintColor: $config.PRIMARY_COLOR,
  },
});

export default LocalVideoMute;
