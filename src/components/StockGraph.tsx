import React, { ReactElement} from 'react';
import '../css/StockGraph.css';

import { tsvParse, timeParse } from  "d3";
import { TypeChooser } from "react-stockcharts/lib/helper";

import Chart from './Chart';
import { type } from 'os';

function parseData(parse: any) {
	return function(d: any) {
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

function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

class StockGraph extends React.Component<any, any> {
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
				{(type: any) => <Chart type = {type} data={this.state.data} />}
			</TypeChooser>
		)
	}
}

export default StockGraph;