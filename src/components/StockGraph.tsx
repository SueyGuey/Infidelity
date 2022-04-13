/**
 * StockGraph.tsx
 * This is for fetching and parsing in data which will be then passed into Chart component from Chart.tsx
 */

import React, { ReactElement } from 'react';
import { tsvParse, csvParse, timeParse } from 'd3';
import Chart from './Chart';
import { type } from 'os';

//the data model which we will be graphing
function parseData(parse: any) {
	return function (d: any) {
		d.date = parse(d.date);
		d.close = +d.close;
		d.volume = +d.volume;
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;

		return d;
	};
}

const parseDate = timeParse('%m/%d/%Y');

//reads in static data from a csv
function getData(symbol: string) {
	const filename =
		symbol === 'GE' ? 'GE_full.tsv' : symbol === 'AAPL' ? 'AAPL_full.tsv' : 'MSFT.tsv';
	const url = `https://raw.githubusercontent.com/SueyGuey/stockdata/main/SPY.csv`;
	const promise = fetch(url)
		.then((response) => response.text())
		.then((data) => csvParse(data, parseData(parseDate)));
	return promise;
}

class StockGraph extends React.Component<{ symbol: string }, any> {
	componentDidMount() {
		getData(this.props.symbol).then((data) => {
			this.setState({ data });
		});
	}
	render() {
		//placeholder text when loading the graph
		if (this.state == null) {
			return <div>Loading...</div>;
		}
		console.log(this.state.data);
		//graph of svg type and passing in data
		return <Chart type={'svg'} data={this.state.data} />;
	}
}

export default StockGraph;
