import { spawn } from 'child_process';

interface GitFileStats {
	createdAt: Date;
	modifiedAt: Date;
	changes: number;
}

/**
 * @param file Relative path to file
 * @param cwd Current working directory.
 * @default cwd process.cwd()
 */
export default async function gitFstat(
	file: string,
	cwd?: string
): Promise<GitFileStats> {
	return new Promise((resolve, reject) => {
		if (!cwd) {
			cwd = process.cwd();
		}

		const changes: Date[] = [];

		const gitProcess = spawn('git', ['log', '--format=%aD', '--follow', file], {
			cwd
		});

		gitProcess.on('error', err => {
			gitProcess.kill();

			reject(new Error(`Could not run Git command: ${err}`));
		});

		gitProcess.stdout.on('data', (data: Buffer) => {
			const dates = data.toString().split('\n');

			for (const item of dates) {
				const date = Date.parse(item);
				if (!isNaN(date)) {
					changes.unshift(new Date(date));
				}
			}
		});

		gitProcess.on('close', code => {
			if (code !== 0) {
				reject(new Error('Git log finished with non-zero exit code'));
			}

			const createdAt = changes[0];
			const modifiedAt = changes[changes.length - 1];

			resolve({
				createdAt,
				modifiedAt,
				changes: changes.length
			});
		});

		gitProcess.stderr.on('data', err => {
			console.log(err);
			gitProcess.kill();

			reject(new Error(`Git error: ${err}`));
		});
	});
}

if (typeof module !== 'undefined') {
	module.exports = gitFstat;
	module.exports.default = gitFstat;
	module.exports.gitFstat = gitFstat;
}
