import jwt, { decode } from 'jsonwebtoken' ;


export function Autheticated (req , res , next)  {
    const cookies = Object.keys(req.cookies)[0];

    console.log(cookies , "this is the token in the cookie")
    if (cookies === undefined) {
        res.status(500).json({
            "err" : "You are not authtenticated"
        })
    }
    else {
        var decoded = jwt.verify(cookies, 'shhhhh');
        console.log(decoded)
        req.user = decoded
        next()
    }
}

