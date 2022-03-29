import { combineReducers } from 'redux';
import MarketReducer from './MarketReducer';
import UserProfileReducer from './UserProfileReducer';

export default combineReducers({
	userProfile: UserProfileReducer,
	marketData: MarketReducer
});
