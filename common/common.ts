//手机号中间四位省略号
export const encryptPhone = (val: number): string => {
	return String(val).replace(/^(\d{3})(\d{4})(\d+)/, "$1****$3");
};

//秒转成 时:分:秒
export const realFormatSecond = (second: number): string => {
	if (second) {
		second = parseInt(String(second));
		var mimute: number = Math.floor(second / 60);
		second = second - mimute * 60;
		return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
	} else {
		return "00:00";
	}
};
