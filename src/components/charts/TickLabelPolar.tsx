import * as React from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { VictoryLabelProps } from 'victory-core';

import { Text } from '~/components/atoms/Text';
import { colors } from '~/constants/colors';

type TLayout = {
  height: number;
  width: number;
};

export function TickLabelPolar(props: VictoryLabelProps) {
  const [layout, setLayout] = React.useState<TLayout>();

  const onTextLayout = React.useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      const height = Math.round(event.nativeEvent.lines[0]?.height || 0);
      const width = Math.round(event.nativeEvent.lines[0]?.width || 0);
      if (height !== layout?.height || width !== layout.width) {
        setLayout({ height, width });
      }
    },
    [layout],
  );

  const x = Math.round(props.x || 0);
  const y = Math.round(props.y || 0);

  const style = React.useMemo<ViewStyle | null>(() => {
    if (layout?.width && layout.height) {
      return {
        color: colors.white,
        left: x - (layout.width || 0) / 2,
        position: 'absolute',
        top: y - (layout.height || 0) / 2,
      };
    }
    return null;
  }, [layout, x, y]);

  return (
    <Text onTextLayout={onTextLayout} style={style || styles.textInvisible}>
      {typeof props.text === 'string' || typeof props.text === 'number' || Array.isArray(props.text)
        ? props.text
        : undefined}
    </Text>
  );
}

const styles = StyleSheet.create({
  textInvisible: {
    color: colors.transparent,
    opacity: 0,
  },
} as const);
