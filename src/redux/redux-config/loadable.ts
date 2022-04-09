/**
 * loadable.ts
 * It contains the status of loading
 */

export default interface Loadable<T> {
	status: 'loading' | 'success' | 'error';
	data?: T;
	errorMessage?: string;
}
