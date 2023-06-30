import LogifierPage from './pageobjects/logifier.page.ts';

describe('A simple test to check if a given input matches with computed logifier', () => {
	describe('Logifier component should', () => {
		it('show up on startup', async () => {
			await expect(LogifierPage.root).toBeDisplayed();
		});

		const number = Math.floor(Math.random() * 100) % 10;
		it(`display expected results on input (${number})`, async () => {
			await LogifierPage.enterInput(number);
			const results = await LogifierPage.results;
			expect(results.length).toBe(10);
			for (const index of results.keys()) {
				const ntimes = 1 + index;
				const expected = `${number} * ${ntimes} = ${number * ntimes}`;
				expect(await results[index].getText()).toEqual(expected);
			}
		});
	});
});
