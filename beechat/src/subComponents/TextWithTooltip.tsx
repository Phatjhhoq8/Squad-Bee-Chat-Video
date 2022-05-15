import React from 'react';
import {Text} from 'react-native';
import mobileAndTabletCheck from '../utils/mobileWebTest';
import TextWithToolTipNative from './TextWithTooltip.native';

const TextWithToolTip = (props: any) => {
  return (
    <div style={style.containerStyle} title={props.value}>
      <Text numberOfLines={1} textBreakStrategy="simple" style={[props.style]}>
        {props.value}
      </Text>
    </div>
  );
};

const style = {
  containerStyle: {
    display: 'flex',
  },
};

export default mobileAndTabletCheck() ? TextWithToolTipNative : TextWithToolTip;
