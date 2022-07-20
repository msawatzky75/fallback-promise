/**
 * Executes a promise, and if it fails, runs a fallback promise
 * @param primary promise to run first
 * @param secondary fallback promise/function to run if primary fails
 * @param timeout time to wait for primary to execute before running secondary
 */
export async function FallbackPromise<T extends any>(
	primary: () => Promise<T>,
	secondary: () => Promise<T> | T,
	timeout: number = 5000
) {
	// promise that resolves primary or rejects after timeout
	// rejects if timeout is reached or if primary rejects
	const p = new Promise<T>((resolve, reject) => {
		const timeoutId = setTimeout(reject, timeout, "Timed out");
		primary().then((r) => {
			clearTimeout(timeoutId);
			resolve(r);
		}, reject);
	});

	return p.catch(secondary);
}
export default FallbackPromise;
