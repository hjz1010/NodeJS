const sendProducts = (res) => {
    res.end(
        JSON.stringify({
            product : [{
                id: 1,
                productName: "node",
                description: "node.js is awesome"
            },{
                id: 2,
                productName: "express",
                description: "express is a server-side framework for node.js"
            }]
        })
    )
}

module.exports = { sendProducts }