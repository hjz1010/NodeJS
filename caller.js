// const { someFunc, someAsyncFunc} = require('./func')

// async function caller () {
// 	const someValueWithParam = await someAsyncFunc(1);
// 	console.log('value: ', someValueWithParam);

// 	try {
// 		const someValueWithoutParma = await someAsyncFunc();
// 		console.log('value: ', someValueWithoutParams);
// 	}
// 	catch (err) {
// 		console.log('error: ', err.message);
// 	}

// 	console.log('여기는 언제나 실행됩니다')
// }

// caller();

const { someAsyncFunc } = require('./func')

async function caller () {
	const someValueWithParam = await  someAsyncFunc(1);
	console.log('value: ', someValueWithParam);

	someAsyncFunc()
		.then( (value) => { console.log(value)})
		.catch( (err) => { console.log(err) });


	console.log('여기는 언제나 실행됩니다')
}

caller();