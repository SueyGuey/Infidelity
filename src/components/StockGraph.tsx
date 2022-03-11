import React, { ReactElement} from 'react';
import '../css/StockGraph.css';
// @ts-ignore
import { tsvParse } from  "d3";
// @ts-ignore
import { timeParse } from "d3";

// @ts-ignore
import { TypeChooser } from "react-stockcharts/lib/helper";

import Chart from './Chart';

// @ts-ignore
function parseData(parse) {
	// @ts-ignore
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}


class StockGraph extends React.Component {
	componentDidMount() {
		getData().then(data => {
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<TypeChooser>
				{
				// @ts-ignore
				type => <Chart type={type} data={this.state.data} />}
			</TypeChooser>
		)
	}
}

export default StockGraph;