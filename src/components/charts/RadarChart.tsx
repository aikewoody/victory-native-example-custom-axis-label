import * as React from 'react';
import { View } from 'react-native';
import type { VictoryChartProps } from 'victory-chart';
import type { PaddingProps } from 'victory-core';
import { VictoryArea, VictoryChart, VictoryGroup, VictoryPolarAxis, VictoryTheme } from 'victory-native';

import { AxisLabelPolar } from '~/components/charts/AxisLabelPolar';
import { TickLabelPolar } from '~/components/charts/TickLabelPolar';
import { MeasureWidth } from '~/components/measures';
import { colors } from '~/constants';
import { common } from '~/utils';

type TConfig = {
  invisible?: boolean;
};

type TDict = { [key: string]: number };

type TData = (TDict | undefined)[];

export type TPropsRadarChart = {
  animate?: boolean;
  configs?: (TConfig | undefined)[];
  colorScale?: string[];
  data: TData;
  padding?: PaddingProps;
  style?: VictoryChartProps['style'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tickValues?: any[];
};

type TAreaData = {
  x: string;
  y: number;
}[];

function getMaxima(data?: TData) {
  const groupedData =
    data &&
    data[0] &&
    common.getKeysTyped(data[0]).reduce((memo, key) => {
      // eslint-disable-next-line no-param-reassign
      memo[key] = data.map((dict) => (dict && dict[key]) || 0);
      return memo;
    }, {} as { [key: string]: number[] });

  return (
    groupedData &&
    common.getKeysTyped(groupedData).reduce((memo, key) => {
      // @ts-expect-error this is a safe key
      memo[key] = Math.max(...groupedData[key]); // eslint-disable-line no-param-reassign
      return memo;
    }, {} as { [key: string]: number })
  );
}

function processData(data?: TData): TAreaData[] | undefined {
  const maxByGroup = getMaxima(data);

  return data
    ?.filter((dict) => dict)
    .map((dict) =>
      Object.keys(dict as TDict).map((key) => ({
        x: key,
        y: ((dict as TDict)[key] || 0) / ((maxByGroup && maxByGroup[key]) || 1),
      })),
    );
}

const colorScale = [colors.gray2, colors.primary];

const domain = { y: [0, 1] };

const styleInvisible = {
  data: {
    fillOpacity: 0,
    strokeWidth: 0.4,
  },
} as const;

const styleGroup = { data: { fillOpacity: 1, strokeWidth: 0 } } as const;

const stylePolarAxis = {
  axis: { stroke: 'none' },
  axisLabel: { padding: 0 },
  grid: { opacity: 0.5, stroke: 'grey', strokeWidth: 0.25 },
} as const;

const tickValues = [1, 0.75, 0.5, 0.25, 0];

const circularGridElement = <View />;
const axisLabelElement = <AxisLabelPolar />;
const tickLabelElement = <TickLabelPolar />;

export function RadarChart(props: TPropsRadarChart) {
  const [width, setWidth] = React.useState(0);

  const maxima = React.useMemo(() => getMaxima(props.data), [props.data]);
  const processedData = React.useMemo(() => processData(props.data), [props.data]);

  return (
    <View>
      <MeasureWidth setWidth={setWidth} width={width} />
      {width ? (
        // Setting the angles is needed to make the chart start horizontal
        <VictoryChart
          polar
          animate={props.animate}
          // @ts-expect-error
          domain={domain}
          endAngle={306}
          padding={props.padding}
          startAngle={-54}
          style={props.style}
          theme={VictoryTheme.material}
          width={width}
        >
          <VictoryGroup colorScale={props.colorScale || colorScale} style={styleGroup}>
            {processedData?.map((areaData: TAreaData, index: number) => (
              <VictoryArea
                data={areaData}
                // eslint-disable-next-line react/no-array-index-key
                key={`victory-area-${index}`}
                style={props.configs && props.configs[index]?.invisible ? styleInvisible : undefined}
              />
            ))}
          </VictoryGroup>
          {maxima &&
            common.getKeysTyped(maxima).map((key, index) => (
              <VictoryPolarAxis
                dependentAxis
                axisLabelComponent={axisLabelElement}
                axisValue={index + 1}
                circularGridComponent={circularGridElement}
                // eslint-disable-next-line react/no-array-index-key
                key={`victory-polar-axis-${index}`}
                label={`${key}`}
                labelPlacement="vertical"
                style={stylePolarAxis}
                // eslint-disable-next-line react/jsx-no-bind
                tickFormat={(tick) => Math.round(tick * (maxima[key] || 0))}
                tickLabelComponent={tickLabelElement}
                tickValues={props.tickValues || tickValues}
              />
            ))}
        </VictoryChart>
      ) : null}
    </View>
  );
}
