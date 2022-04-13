import React, { ReactElement, useEffect } from 'react';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../TopNavBar';
import stockImage1 from '../../images/stock-image-stocks.jpg';
import stockImage2 from '../../images/stock-image-2-upgraph.jpg';
import stockImage3 from '../../images/stock-image-wallstreet.jpg';
import '../../css/InfoPages-css/featuresPage.css';

export default function FeaturePage() {
	useEffect(() => {
		document.body.style.overflowY = 'auto';
	}, []);
	return (
		<div className="featurePage">
			<img className="backgroundWhole featureImg" src={stockImage2} />
			<TopNavBar />
			<h1 className="featureText main one">FEATURES</h1>
			<h1 className="featureText main two ">-&-</h1>
			<h1 className="featureText main three">How to Use Them</h1>
			{/* <div className="featureItem">
				<img className="featureImage" src={stockImage1}></img>
				<h1 className="featureText label">TITLE</h1>
				<p className="featureText">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing
					commodo elit at imperdiet dui accumsan. Urna condimentum mattis pellentesque id
					nibh tortor id aliquet lectus. Dolor sit amet consectetur adipiscing elit duis.
					<br />
					<br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing
					commodo elit at imperdiet dui accumsan. Urna condimentum mattis pellentesque id
					nibh tortor id aliquet lectus. Dolor sit amet consectetur adipiscing elit duis.
				</p>
			</div> */}
			<div className="featureItem">
				<img className="featureImage" src={stockImage1}></img>
				<h1 className="featureText label">What is ____?</h1>
				<p className="featureText">
					Confused about what a Dividend is? What are Stocks, really? Need information
					about trends? what makes a good time to hold and a good time to sell? What are
					Options? At infidelity we provide this information in the User Manual, with
					helpful resources to learn not just about how to trade, but what you are
					trading.
					<br />
					<br />
					To Access the User Manual, see your Dashboard Menu, located on the side of your
					screen, and simply click on the user manual. Find what you are looking for from
					there. We can't include absolutely everything, so we've also linked to helpful
					resources and materials you can use.
				</p>
			</div>
			<div className="featureItem">
				<img className="featureImage" src={stockImage1}></img>
				<h1 className="featureText label">Create Portfolios</h1>
				<p className="featureText">
					Want to try out more than one strategy for your trading? Or emulate having
					several Portfolios? At Infidelity you can have multiple portfolios, each with a
					different balalnce and composition. Portfolios will not interact with eachother
					in any way. All stocks purchased and sold in one portfolio only affects that
					portfolio's assets.
					<br />
					<br />
					To Create A New Portfolio: On the top of your user Dashboard where you can
					select which portfolio you wish to be currently active, there is a '+' button.
					Click that button, enter your Portfolio's name, and starting balance, and you're
					good to go!
				</p>
			</div>
			<div className="featureItem">
				<img className="featureImage" src={stockImage1}></img>
				<h1 className="featureText label">Create Watchlists</h1>
				<p className="featureText">
					Watchlists! It's important to be able to track stocks that you're interested in
					the most in buying or selling. Or just to watch the progress of a stock that's
					been talked about in news or just in conversation. Any stock can be added to any
					watchlist you have. Just got to get around to making some!
					<br />
					<br />
					To Create A Watchlist: On the Side-Menu in either your User dashboard or stock
					pages, you can select the '+' sign next to the "My Watchlists" item. Enter the
					Watchlist's name, hit Create and you're good to go. Now you can add any Stock to
					your watchlist to see and go to quickly!
				</p>
			</div>
			<div className="featureItem">
				<img className="featureImage" src={stockImage1}></img>
				<h1 className="featureText label">Search for Stock</h1>
				<p className="featureText">
					Okay, but how does one go about <em>finding</em> the stocks they want to buy or
					sell? To search for a stock , in either the Search page or on your Dashboard,
					there is a search column.
					<br />
					<br />
					To search for a stock simply enter the stock ticker or letters that may be in it
					into the search bar. All results matching your query should appear. Click on any
					result to be brought to that stock's specific page. Happy trading!
				</p>
			</div>
			<div className="featureItem">
				<img className="featureImage" src={stockImage1}></img>
				<h1 className="featureText label">Buy & Sell Assets</h1>
				<p className="featureText">
					The most core functionality when it comes to being able to simulate your
					portfolio. Having stock in the first place. To Buy or Sell a stock, simply go to
					the stock page, either by searching for it or by quickly accessing it on your
					Dashboard's displayed watchlist.
					<br />
					<br />
					Once on the stock's page you'll see a Buy/Sell section on the bottom right
					corner. Click on the 'buy' or 'sell' buttons to begin setting up the
					corresponding transaction. Enter the number of stocks you wish to buy or sell,
					and so long as the purchase or sale is valid, hit the 'Buy' or 'Sell' button on
					the pop-up transaction zone and it's done! You can now close the pop up by
					clicking the 'Keep Trading' button or the 'X' button. You can always back out by
					closing the pop up via the 'X' button in the corner.
				</p>
			</div>
			<div className="featureItem">
				<img className="featureImage" src={stockImage1}></img>
				<h1 className="featureText label">Stock Information</h1>
				<p className="featureText">
					Stock Information! How are you going to make an informed decision to buy a stock
					if you don't know anything about it? On the stock's page or on any quick-info
					mini card (seen in your watchlist or search result) is the price per stock. Some
					quick information to see how things are going in the now.
					<br />
					<br />
					However, on a stock's specific page lies additional information, such as it's
					yearly high and low, daily high and low, volume, market cap, percent
					de/increases etc. This basic information provides a quick non-overwhelming
					overview of the health of a stock. For more detailed information feel free to
					access additional resources provided in the User Manual or any you may have
					yourself! And remember, it's always good practice to take any current events
					surrounding your possible purchase or sale into account.
				</p>
			</div>
		</div>
	);
}
