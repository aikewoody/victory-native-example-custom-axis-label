import * as React from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { VictoryLabelProps } from 'victory-core';

import { Text } from '~/components/atoms';
import { sizes } from '~/constants';
import { colors } from '~/constants/colors';

type TLayout = {
  height: number;
  width: number;
};

const labelHorizontalMargin = sizes.m;

export function AxisLabelPolar(props: VictoryLabelProps) {
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
      const id = typeof props.id === 'string' || typeof props.id === 'number' ? String(props.id) : null;

      let left = x;
      let top = y - layout.height / 2;

      if (typeof id === 'string') {
        if (id.startsWith('chart-axis-1')) {
          left -= layout.width / 2;
          top += layout.height;
        } else if (id.startsWith('chart-axis-2')) {
          left += labelHorizontalMargin;
          top -= layout.height / 4;
        } else if (id.startsWith('chart-axis-3')) {
          left -= layout.width / 2;
          top -= layout.height;
        } else if (id.startsWith('chart-axis-4')) {
          left -= layout.width + labelHorizontalMargin;
          top -= layout.height / 4;
        } else if (id.startsWith('chart-axis-5')) {
          left -= layout.width / 2;
          top += layout.height;
        }
      }

      return {
        color: colors.white,
        left,
        position: 'absolute',
        top,
      };
    }
    return null;
  }, [layout, x, y, props.id]);

  console.log(style && { ...style });

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
