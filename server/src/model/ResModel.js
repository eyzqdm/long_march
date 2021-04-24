/**
 * @description res 的数据模型
 * @author eyz
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({ code, data, message }) {
    this.code = code;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
  constructor({data, message}) {
    super({
      code: 0,
      message,
      data:{...data},
    });
  }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
