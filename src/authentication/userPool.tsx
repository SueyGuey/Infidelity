import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';

const poolData: ICognitoUserPoolData = {
	UserPoolId: 'us-east-1_dxaGZOwSL',
	ClientId: 'ou61pmkijo991s9h4ceu0t0tt',
};

export default new CognitoUserPool(poolData);
