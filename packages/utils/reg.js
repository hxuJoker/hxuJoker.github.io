const Reg = {
  exec: {
    mobile: /(86-[1][0-9]{10})|(86[1][0-9]{10})|([1][0-9]{10})/g,
    phone: /(([0-9]{3,4}-)[0-9]{7,8})|([0-9]{12})|([0-9]{11})|([0-9]{10})|([0-9]{9})|([0-9]{8})|([0-9]{7})/g,
  },
  test: {
    mobile: /^[1][0-9]{10}$/,
    idNumber: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
    //验证指定长度包含字母数字的字符串
    alphanumeric(length = 10) {
      return new RegExp(`^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{${length}}$`);
    },
  },
};

export default Reg;