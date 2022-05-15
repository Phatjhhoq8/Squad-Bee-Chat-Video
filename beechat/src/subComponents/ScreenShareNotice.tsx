import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import chatContext from '../components/ChatContext';
/**
 *
 * @param uid - uid of the user
 * @returns This component display overlay message "Screen sharing is active now" if user started sharing the screen.
 * why its needed : To prevent screensharing tunneling effect
 *
 */
function ScreenShareNotice({uid}: any) {
  const {userList, localUid} = useContext(chatContext);

  return uid === 1 ? (
    <View style={styles.screenSharingMessageContainer}>
      <Text style={styles.screensharingMessage}>
        {userList[localUid]?.name + "'s screen share is active."}
      </Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  screenSharingMessageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 15,
  },
  screensharingMessage: {
    alignSelf: 'center',
    fontSize: 20,
    color: $config.SECONDARY_FONT_COLOR,
  },
});

export default ScreenShareNotice;
