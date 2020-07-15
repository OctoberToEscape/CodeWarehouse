//验证邮箱
export const isEmail = (data: string): boolean => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(data) ? true : false;
};

//验证邮政编码
export const isZipCode = (data: number): boolean => {
    const reg = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;
    return reg.test(String(data)) ? true : false;
};

//验证手机号
export const isTelephone = (data: number): boolean => {
    const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
    return reg.test(String(data)) ? true : false;
};

//验证固定号码(座机)
export const isLandline = (data: number): boolean => {
    const reg = /^\d{3}-\d{8}$|^\d{4}-\d{7,8}$/;
    return reg.test(String(data)) ? true : false;
};

//验证是否是个网址url
export const isUrl = (data: string): boolean => {
    const reg = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    return reg.test(data) ? true : false;
};

//验证身份证号合法性（15位和18位）
export const isCardID = (data: number): boolean => {
    const reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
    return reg.test(String(data)) ? true : false;
};

//验证护照（包含香港、澳门）
export const isPassport = (data: string | number): boolean => {
    const reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
    return reg.test(String(data)) ? true : false;
};

//密码强度验证(最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符)
export const passwordPower = (data: string | number): boolean => {
    const reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
    return reg.test(String(data)) ? true : false;
};

//验证QQ号格式
export const isQQ_number = (data: number): boolean => {
    const reg = /^[1-9][0-9]{4,10}$/;
    return reg.test(String(data)) ? true : false;
};

//验证银行卡号(10到30位, 覆盖对公/私账户)
export const isBanCard = (data: number): boolean => {
    const reg = /^[1-9]\d{9,29}$/;
    return reg.test(String(data)) ? true : false;
};

//验证统一社会信用代码
export const is_Unified_social_credit_code = (
    data: string | number
): boolean => {
    const reg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
    return reg.test(String(data)) ? true : false;
};
