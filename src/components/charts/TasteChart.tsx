import * as React from 'react';

import type { TPropsRadarChart } from '~/components/charts/RadarChart';
import { RadarChart } from '~/components/charts/RadarChart';
import { colors, sizes } from '~/constants';
import type { TTasteProfile } from '~/types';

type TProps = Omit<TPropsRadarChart, 'configs' | 'data' | 'padding' | 'tickValues'> & {
  tasteProfile: TTasteProfile;
};

const tickValues = [1, 0.8, 0.6, 0.4, 0.2];

/* eslint-disable sort-keys-fix/sort-keys-fix */
const gridDataArray = tickValues.map((value) => ({
  bitter: value * 10,
  sour: value * 10,
  intensity: value * 10,
  fruity: value * 10,
  sweet: value * 10,
}));
/* eslint-enable sort-keys-fix/sort-keys-fix */

const colorScale = [...tickValues.map(() => colors.gray2), colors.primary];

const configs = [...tickValues.map(() => ({ invisible: true })), undefined];

const padding = {
  bottom: 0,
  left: sizes.xxxl,
  right: sizes.xxxl,
  top: sizes.s,
};

export function TasteChart(props: TProps) {
  const data = React.useMemo(() => [...gridDataArray, props.tasteProfile], [props.tasteProfile]);

  return (
    <RadarChart
      animate={props.animate}
      colorScale={colorScale}
      configs={configs}
      data={data}
      padding={padding}
      tickValues={tickValues}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
