type JSON = string | number | boolean | null | JSON[] | { [key: string]: JSON };

export type JSONData<T> = {
	[P in keyof T]: Exclude<T[P], undefined> extends JSON
		? T[P]
		: Exclude<T[P], undefined> extends Set<infer X> | Array<infer X>
		? Array<JSONData<X>>
		: Exclude<T[P], undefined> extends Date
		? string
		: Exclude<T[P], undefined> extends (...args: any) => any
		? never
		: Exclude<T[P], undefined> extends { [key: string]: any }
		? JSONData<T[P]>
		: unknown | undefined;
};

export type FetchError = {
	error: string;
	path?: string;
	status?: number;
	timestamp?: string;
};
