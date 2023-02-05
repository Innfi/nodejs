describe('typing', () => {	
	interface Element {
		date: string;
		comment: string;
		repo: string[];
	};

	interface Nested {
		name: string;
		userId: number;
		commitHistory: Element[]
	};

	it('deepPartial', () => {
		type DeepPartial<T> = T extends object ? 
		{
			[P in keyof T]?: DeepPartial<T[P]>;
		} :
		T;

		const partialNested: DeepPartial<Nested> = {
			name: 'innfi',
			commitHistory: [
				{ date: '2021-01-01', repo: ['innfi'] },
				{ comment: 'initial commit', repo: ['ennfi'] },
			]
		};

		expect(partialNested).toBeDefined();
	});

	it('partial entity with function', () => {
		type PartialEntity<T> = {
			[P in keyof T]? : T[P] | ((T1: string|number) => string);
		};

		interface NestedWithMethods extends Nested {
			dummyHandler(): string;
		}

		const partial: PartialEntity<NestedWithMethods> = {
			name: 'innfi',
			userId: 1234,
			commitHistory: [],
			dummyHandler: (input: string): string => { return `innfi: ${input}`; },
		};

		expect(partial).toBeDefined();
	});
});

// type QueryDeepPartialEntity<T> = _QueryDeepPartialEntity<ObjectLiteral extends T ? unknown : T>;
//   type _QueryDeepPartialEntity<T> = {
// 	 [P in keyof T]?: (T[P] extends Array<infer U> ? Array<_QueryDeepPartialEntity<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<_QueryDeepPartialEntity<U>> : _QueryDeepPartialEntity<T[P]>) | (() => string);
// };