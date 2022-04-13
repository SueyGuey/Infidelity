/**
 * loadable.ts
 * It contains the status of loading items fetched from the server.
 */

export default interface Loadable<T> {
	status: 'loading' | 'success' | 'error';
	data?: T;
	errorMessage?: string;
}
