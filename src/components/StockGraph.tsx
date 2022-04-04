import React, { ReactElement} from 'react';
import { tsvParse, csvParse, timeParse } from  "d3";
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

function getData(symbol: string) {
	const filename = symbol === "GE" ? "GE_full.tsv" :
		symbol === "AAPL" ? "AAPL_full.tsv" : "MSFT.tsv";
	const url = `https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/${filename}`;
	const promiseMSFT = fetch(url)
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

class StockGraph extends React.Component<{symbol: string}, any> {
	componentDidMount() {
		getData(this.props.symbol).then(data => {
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}

		return (
			<Chart type = {"svg"} data={this.state.data} />
		)
	}
}

export default StockGraph;