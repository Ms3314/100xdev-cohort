export function Autheticated (req , res , next)  {
    const cookie = req.cookies 
    console.log(cookie)
    if (cookie === undefined) {
        res.status(500).json({
            "err" : "You are not authtenticated"
        })
    }
    else {
        next()
    }
}

