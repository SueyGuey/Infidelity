import { ReactElement } from 'react';
import '../css/PitchRectangles.css';
import one from '../images/pitchOne.png';
import two from '../images/pitchTwo.png';
import three from '../images/pitchThree.png';

export default function PitchRectangles(): ReactElement {
	return (
		/**MAIN DIV-- CONTAINS ALL RECTANGLE SPANS*/

		<div className="parent">
			{/* == Pitch 01 -- "Save Your Dollars" == */}
			<span className="pitches pitchRectangleOne">
				<img src={one} className="pitchImages" />
				<div className="rectangleText">
					<h2 className="rectangleTextHeader">Save Your Dollars</h2>
					<p className="rectangleTextParagraph">
						Infidelity doesn’t do trades with real money. All money in your account or
						in your stocks, shares, options, crypto-- are traded in our currency. No
						need to worry about your personal finances if a trade isn’t going your way.
					</p>
				</div>
			</span>

			{/* == Pitch 02 -- "Almost the Real Market" == */}
			<span className="pitches pitchRectangleTwo">
				<img src={two} className="pitchImages" />
				<div className="rectangleText">
					<h2 className="rectangleTextHeader">Almost the Real Market</h2>
					<p className="rectangleTextParagraph">
						The values you see are in near-real-time, and are constantly updated. No
						awkward jumps, and no severely outdated data. This is essential to the
						authentic trading experience.{' '}
					</p>
				</div>
			</span>

			{/* == Pitch 03 -- "Just Like the Simulations" == */}
			<span className="pitches pitchRectangleThree">
				<img src={three} className="pitchImages" />
				<div className="rectangleText">
					<h2 className="rectangleTextHeader">Just Like the Simulations!</h2>
					<p className="rectangleTextParagraph">
						Remember, Infidelity is a market trading simulator. Fine-tune your
						strategies, your portfolio composition-- try new things and see what
						happens. Develop your tradesense on your own, without losing your money.{' '}
					</p>
				</div>
			</span>
		</div>
		/* End of Pitch Rectangles Main Span */
	);
}
