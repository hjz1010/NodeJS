const sendProducts = (req, res) => {
    res.json({     // express를 사용하므로 JSON.stringify 함수를 사용할 필요없이
                   // response 객체의 json 메소드를 활용합니다.
        products: [
            {
                id: 1,
                title: 'node',
                description: 'node.js is awesome'
            },{
                id: 2,
                productName: "express",
                description: "express is a server-side framework for node.js"
            }
        ]
    })
}

module.exports = { sendProducts }