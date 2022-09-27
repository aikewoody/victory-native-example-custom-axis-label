import * as React from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, View } from 'react-native';

type TProps = {
  roundDown?: boolean;
  setWidth: (width: number) => void;
  width: number;
};

export function MeasureWidth(props: TProps) {
  const onLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      const propsWidth = props.roundDown ? Math.floor(props.width) : props.width;
      const layoutWidth = props.roundDown ? Math.floor(event.nativeEvent.layout.width) : event.nativeEvent.layout.width;
      if (layoutWidth !== propsWidth) {
        props.setWidth(layoutWidth);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.setWidth, props.width],
  );
  return <View onLayout={onLayout} style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    height: 0,
    // @todo: check if this is needed
    position: 'absolute',
    width: '100%',
  },
} as const);
