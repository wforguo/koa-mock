import { Context } from 'koa';

const router = require('koa-router')();
const Mock = require('mockjs');

router.prefix('/mock');
router.get('/pagePurchaseCommodity', function (ctx: Context, next: any) {
  // 使用 Mock

  const data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|10-20': [
        {
          'certainIsOrgLevel': false,
          'commodityCode': '',
          'commodityName|1': ['明康汇白菜', '明康汇大罗不', '明康汇鸡腿', '明康汇火龙果真好吃'],
          'commodityShortName|1': ['明康汇', '水果', '冰糖', '火龙果'],
          'commodityUnit|1': [
            '个',
            '箱',
            '瓶'
          ],
          'id': 0,
          'limitD1|1-2': true,
          'limitD1Num': 0,
          'limitD2|1-2': true,
          'limitD2Num': 0,
          'limitPurchase|1-2': true,
          'limitPurchaseNum|100-200': 200,
          'minimumPurchaseNum|100-200': 200,
          'orgCode|10000-11000': 10000,
          'orgName|1': ['杭州', '上海', '宁波', '江苏'],
          'goodsImg': [
          ],
          'orgPurchaseVOs|2-4': [
            {
              'orgName|1': ['杭州', '上海', '宁波', '江苏', '北京', '苏州'],
              'limitD1Num|100-200': 200,
              'limitD2|100-200': 200,
              'limitD2Num|100-200': 200,
              'limitPurchase|100-200': 200,
              'limitPurchaseNum|100-200': 200,
              'minimumPurchaseNum|100-200': 200,
              'necessaryStoreCount|100-200': 200,
              'purchaseCycle|1': [
                '4.1-4.9',
                '5.1-5.9',
                '6.1-6.9'
              ],
              'purchaseScheduling|1': [
                '每天',
                '周一',
                '周二'
              ],
              'purchaseStandards|1': [
                '4 * 1.2',
                '5 * 9',
                '6 * 7'
              ],
              'purchaseStoreCount|100-200': 200,
              'purchaseUnit|1': [
                '个',
                '箱',
                '瓶'
              ],
              'putaway|1-2': true,
              'replenishmentD1|100-200': 200,
              'distribution:1-2': true
            }
          ],
          'purchaseScheduling': '',
          'purchaseStandards': '',
          'purchaseUnit': '',
          'putaway|1-2': true,
          'putawayOrgLevel': false,
          'replenishmentD1': false
        }
      ]
  });
  let { list } = data;
  list = list.map((item: object) => {
    return {
      ...item,
      id: Mock.Random.id(),
      commodityCode: Mock.Random.increment(1000),
      commodityPicture: Mock.Random.image(),
      goodsImg: [
        {
          title: '商品大图',
          list: [
            Mock.Random.image(),
            Mock.Random.image(),
            Mock.Random.image(),
            Mock.Random.image()
          ]
        },
        {
          title: '商品缩略图',
          list: [
            Mock.Random.image(),
            Mock.Random.image(),
            Mock.Random.image(),
            Mock.Random.image()
          ]
        },
        {
          title: '商品轮播图',
          list: [
            Mock.Random.image(),
            Mock.Random.image(),
            Mock.Random.image(),
            Mock.Random.image()
          ]
        },
        {
          title: '商品详情图',
          list: [
            Mock.Random.image(),
            Mock.Random.image(),
            Mock.Random.image(),
            Mock.Random.image()
          ]
        }
      ]
    };
  });
  ctx.body = {
    code: 200,
    msg: 'ok',
    data: {
      list,
      current: 1,
      pageNum: list.length / 10,
      size: 10,
      total: list.length,
    }
  };
});

module.exports = router;
