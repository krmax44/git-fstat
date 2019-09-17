import { expect } from 'chai';
import gitFstat from '..';
import 'mocha';

describe('basic file stats', () => {
	it('should return the correct stats', async () => {
		const stats = await gitFstat('fixtures/Test File.md', __dirname);

		expect(stats).to.eql({
			createdAt: new Date('Tue, 17 Sep 2019 10:31:32 +0200'),
			modifiedAt: new Date('Tue, 17 Sep 2019 10:31:57 +0200'),
			changes: 2
		});
	});
});
