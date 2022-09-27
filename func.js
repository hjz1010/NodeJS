function someFunc (someParam) {
	if (!someParam)	{
		throw new Error('에러가 발생했습니다')
	}
	// ... someFucn 로직 ...
	return someParam
};


async function someAsyncFunc (someParam) {
	if (!someParam)	{
		throw new Error('에러가 발생했습니다')
	}
	// ... someAsyncFucn 로직 ...
	return someParam
};

module.exports = { someFunc, someAsyncFunc }