/**
 * StockDashBottom.tsx
 * Contains the stock information for a particular tradeable
 * Includes info such as 52-week high, 52-week low, etc
 */

import React, { ReactElement } from 'react';
import '../css/DashBottom.css';
import '../css/home.css';
import { Tradeable } from '../datamodels/Portfolio';
import withUserProfileLoader, {
	WithUserProfileLoaderProps,
} from '../redux/loaders/withUserProfileLoader';
import BuySell from './BuySell';

type StockDashBottomProps = {
	item: Tradeable;
} & WithUserProfileLoaderProps;

/**
 * This is the Stock Dashboard's bottom component, containing the Stock Information area giving a quick
 * overview of some basic stock information the user may want to know and also includes
 * Buy/Sell information area (panel: see BuySell.tsx , and BuySellPopup.tsx). Where a user should
 * be able to purchase and sell stocks on completion of feature.
 */
function StockDashBottom(props: StockDashBottomProps): ReactElement {
	return (
		<div className="dashBottomContain">
			<div className="dashBottom">
				<span className="bottomSpan stockInformation">
					<div className="spanCap">
						<p>Stock Information</p>
					</div>
					<div className="stockInformationItems">
						<span className="stockInfo-span">
							<p className="stockInfoTitle">
								52-week High: <p className="stockValue blue">$###.##</p>
							</p>
							<p className="stockInfoTitle">
								52-week Low: <p className="stockValue blue">$###.##</p>
							</p>
							<p className="stockInfoTitle">
								52-week Range: <p className="stockValue blue">$###.##</p>
							</p>
							<p className="stockInfoTitle">
								Average Volume:<p className="stockValue blue">###.##</p>
							</p>
						</span>
						<span className="stockInfo-span">
							<p>
								Day-High: <p className="stockValue blue">$###.##</p>
							</p>
							<p>
								Day-Low: <p className="stockValue blue">$###.##</p>
							</p>
							<p>
								Market Cap: <p className="stockValue blue">$###.##</p>
							</p>
							<p>
								Current Volume:<p className="stockValue blue">###.##</p>
							</p>
						</span>
					</div>
				</span>
				<BuySell item={props.item} />
			</div>
		</div>
	);
}

// export default interface Stock {
//     ticker: string;
//     price: number;
//     change: number;
//     changePercent: number;
//     volume: number;
//     avgVolume: number;
//     marketCap: number;
//     peRatio: number;
//     week52High: number;
//     week52Low: number;
// }

export default withUserProfileLoader(StockDashBottom);
