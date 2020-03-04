// 测试域名
// const testDomin = '' // 使用代理
const testDomin = 'http://localhost:8100'
// const testDomin = 'http://www.hctx365.cn'
 
// 正式域名
const formalDomain = 'http://www.hctx365.cn'
 
// 环境变量
const env = process.env.NODE_ENV
const origin = env === 'development' ? testDomin : formalDomain
 
// config
const config = {
  // 版本号
  version: '0.1.1',
 
  // 域名
  domain: origin,
 
}
 
/**
 * 假日表
 * @param [month, day, type, name] type : 1 公历 2 农历
 */
 
const legalHoliday = [
  ['01', '01', 1, '元旦'],
  ['01', '01', 2, '春节'],
  ['04', '05', 1, '清明节'],
  ['05', '01', 1, '劳动节'],
  ['05', '05', 2, '端午节'],
  ['08', '15', 2, '中秋节'],
  ['10', '01', 1, '国庆节']
]
 
// 数据字典分类
const dicCode = {
  goodsCategory: '1001', // 商品分类
  Brand: '1002', // 品牌
  category: '1003', // 类别
  doorType: '1004', // 门架种类
  tonnage: '1005' // 吨位
}
 
export {
  config,
  legalHoliday,
  dicCode
}
 