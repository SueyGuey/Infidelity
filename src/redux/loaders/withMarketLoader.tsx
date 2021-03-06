/**
 * withMarketLoader.tsx
 * Higher order component which wraps the component with a loading spinner.
 * This is used to load the market data from the backend.
 * The relevant data is passed to the wrapped component as props.
 */

import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../redux-config/hooks';
import Loadable from '../redux-config/loadable';
import userPool from '../../authentication/userPool';
import LoadingAnimation from './loading';
import ErrorPage from '../../components/errorPage';
import { useNavigate } from 'react-router-dom';
import { fetchMarketData, fetchTradeable, searchMarket } from '../actions/MarketActions';
import { MarketState } from '../reducers/MarketReducer';
import { Tradeable } from '../../datamodels/Portfolio';
import { useEffect } from 'react';

//Loads the tradeable
export interface WithMarketLoaderProps {
	marketData: Tradeable[];
	searchResults: Tradeable[];
	searchQuery: string;
	// viewing: Tradeable;
	getTradeable: (symbol: string) => any;
	searchMarket: (query: string) => any;
}

export default function withMarketLoader<PropType>(
	ReactComponent: React.ComponentType<PropType & WithMarketLoaderProps>
): React.FC<PropType> {
	return function ComponentWithMarket(props: PropType): JSX.Element {
		const dispatch = useAppDispatch();

		const state = useAppSelector((state: any) => state.marketData);

		const marketData: Loadable<Tradeable[]> = state.marketData;
		const searchResults: Loadable<Tradeable[]> = state.searchResults;
		// const viewing: Loadable<Tradeable> = state.viewing;

		useEffect(() => {
			if (!marketData.data) {
				dispatch(fetchMarketData());
			}
		}, [dispatch]);

		//handle cases of whether we can find query or not

		let status = 'loading';
		if (marketData.status == 'error' || searchResults.status == 'error') {
			status = 'error';
		} else if (marketData.status == 'success' && searchResults.status == 'success') {
			status = 'success';
		}

		switch (status) {
			case 'loading':
				return <LoadingAnimation />;
			case 'error':
				return <ErrorPage message={marketData.errorMessage} />;
			case 'success':
				return (
					<ReactComponent
						marketData={marketData.data as Tradeable[]}
						searchResults={searchResults.data as Tradeable[]}
						searchQuery={state.searchQuery}
						searchMarket={(query: string) => dispatch(searchMarket(query))}
						getTradeable={(symbol: string) => dispatch(fetchTradeable(symbol))}
						// viewing={viewing.data as Tradeable}
						{...props}
					/>
				);
			default:
				return <></>;
		}
	};
}
