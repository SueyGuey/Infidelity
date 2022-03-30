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

export interface WithMarketLoaderProps {
	marketData: Tradeable[];
	getTradeable: (symbol: string) => any;
	searchMarket: (query: string) => any;
}

export default function withMarketLoader<PropType>(
	ReactComponent: React.ComponentType<PropType & WithMarketLoaderProps>
): React.FC<PropType> {
	return function ComponentWithMarket(props: PropType): JSX.Element {
		const dispatch = useAppDispatch();

		const marketData: Loadable<Tradeable[]> = useAppSelector<MarketState>(
			(state: any) => state.marketData
		).marketData;

		useEffect(() => {
			if (!marketData.data) {
				dispatch(fetchMarketData());
			}
		}, [dispatch]);

		switch (marketData.status) {
			case 'loading':
				return <LoadingAnimation />;
			case 'error':
				return <ErrorPage message={marketData.errorMessage} />;
			case 'success':
				return <ReactComponent
						marketData={marketData.data as Tradeable[]}
						searchMarket={(query: string) => dispatch(searchMarket(query))}
						getTradeable={(symbol: string) => dispatch(fetchTradeable(symbol))}
						{...props}
					/>;
			default:
				return <></>;
		}
	};
}
