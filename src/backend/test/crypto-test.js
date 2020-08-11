const CryptoUtils = require('./../utils/CryptoUtil')


// CryptoUtils.generateToken(1, "admin", 3600000);
// originVarchar"1@admin@1596788099013
// Token:vstu3+0fPN4bbyMIB4z+dtRrGVbIlEGqPXh/nbO/cfE=

// console.log(CryptoUtils.parseToken("vstu3+0fPN4bbyMIB4z+dtRrGVbIlEGqPXh/nbO/cfE="));

// Calculate a rolling hash.

// console.log(CryptoUtils.generate32Key('uTKrmSoT'));

let p = CryptoUtils.cryptPwd('admin', '123456', 'uTKrmSoT')
console.log(p)

//49468c59dae59a2d862e6ad231a6b9ab
//49468c59dae59a2d862e6ad231a6b9ab
