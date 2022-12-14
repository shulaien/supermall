import { request } from "./request";

export function getDetails(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    // 注：discount可能有些商品有值，有些没有值
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注：images可能有些商品有值，有些没有值
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}