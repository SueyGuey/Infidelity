import React from "react";
import PropTypes from "prop-types";

import { scaleTime, curveMonotoneX } from "d3";
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { createVerticalLinearGradient, hexToRGBA } from "react-stockcharts/lib/utils";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { ema } from "react-stockcharts/lib/indicator";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

/* There are a lot of imported components from react-stockcharts. 
To see default props, go to https://github.com/rrag/react-stockcharts */

/* This is the color gradient on the line on the graph */
const canvasGradient = createVerticalLinearGradient([
	{ stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
	{ stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
	{ stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

//Formating labels on numbers and dates
const dateFormat = timeFormat("%m/%d/%Y");
const numberFormat = format(".2f");

//Values in the text box
function tooltipContent(ys:any) {
	// @ts-ignore
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				{
					label: "Open",
					value: currentItem.open && numberFormat(currentItem.open)
				},
				{
					label: "High",
					value: currentItem.high && numberFormat(currentItem.high)
				},
				{
					label: "Low",
					value: currentItem.low && numberFormat(currentItem.low)
				},
				{
					label: "Close",
					value: currentItem.close && numberFormat(currentItem.close)
				}
			]
				.filter(line => line.value)
		};
	};
}

class AreaChart extends React.Component<any, any> {
	render() {
		const { data, type, width, ratio } = this.props;
		var containerHeight = document.getElementById('graph-container')?.offsetHeight;
		if(containerHeight == undefined){//should not occur unless graph has no div containing it.
			containerHeight = 0;
		}
		var thisHeight = containerHeight*0.90;
		const ema20 = ema()
			.id(0)
			.options({ windowSize: 20 })
			.merge((d: any, c:any) => {
				d.ema20 = c;
			})
			.accessor((d:any) => d.ema20);

		const ema50 = ema()
			.id(2)
			.options({ windowSize: 50 })
			.merge((d:any, c:any) => {
				d.ema50 = c;
			})
			.accessor((d:any) => d.ema50);

		return (
			<ChartCanvas ratio={ratio} width={width} height = {thisHeight}
				margin={{ left: 50, right: 30, top: 10, bottom: 30 }}
				seriesName="MSFT"
				data={data} type={type}
				xAccessor={(d:any) => d.date}
				xScale={scaleTime()}
				panEvent={false}
   				zoomEvent={false}
				xExtents={[new Date(2015, 0, 1), new Date(2016, 0, 2)]}
			>
				<Chart id={0} yExtents={(d:any) => d.close}>
					{/* This sets the gradient for the area under the line */}
					<defs>
						<linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
							<stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
							<stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
							<stop offset="100%"  stopColor="#4286f4" stopOpacity={0.8} />
						</linearGradient>
					</defs>
					<XAxis axisAt="bottom" orient="bottom" ticks={12} zoomEnabled = {false} />
					<YAxis axisAt="left" orient="left" zoomEnabled = {false}/>
					<AreaSeries
						yAccessor={(d:any) => d.close}
						fill="url(#MyGradient)"
						strokeWidth={2}
						interpolation={curveMonotoneX}
						canvasGradient={canvasGradient}
					/>
					{/* The text box for hover */}
					<HoverTooltip
						yAccessor={ema50.accessor()}
						tooltipContent={tooltipContent([
							{
								label: `${ema20.type()}(${ema20.options()
									.windowSize})`,
								value: (d:any) => numberFormat(ema20.accessor()(d)),
								stroke: ema20.stroke()
							},
							{
								label: `${ema50.type()}(${ema50.options()
									.windowSize})`,
								value: (d:any) => numberFormat(ema50.accessor()(d)),
								stroke: ema50.stroke()
							}
						])}
						fontSize={16}
						bgFill = "#0F00FF"
					/>
				</Chart>
			</ChartCanvas>
		);
	}
}

// @ts-ignore
AreaChart = fitWidth(AreaChart);

export default AreaChart;