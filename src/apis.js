const apis = {
  getVIPList: '/erp/VipBuyer/VipList',
  getVIPDetail: '/erp/VipBuyer/VipDetail',
  getArea: '/Dict/City2',
  getUserInfo: '/erp/VipBuyer/VipInfo',
  checkPhone: '/erp/VipBuyer/PhoneCheck',
  checkCode: '/erp/VipBuyer/CheckPhoneVerifyCode',
  sendCode: '/erp/VipBuyer/PhoneVerifyCode',
  changePassword: '/erp/VipBuyer/PwdChange',
  changeUserArea: '/erp/Vipbuyer/AddressEdit',
  changeUserPhone: '/erp/vipbuyer/PhoneEdit',
  getPoint: '/erp/Integral/BuyersCount',
  getPointConvertList: '/erp/Integral/BuyersGoodsList',
  getPointOrderList: '/erp/Integral/BuyersOrderList',
  getPointRecordList: '/erp/Integral/BuyersTransactionList',
  getPointDetail: '/erp/Integral/GoodsDetail',
  getPointStores: '/erp/Integral/ShopList',
  sendPointCode: '/erp/Integral/PhoneSendGuid',
  addOrder: '/erp/Integral/OrderAdd',
  getCardState: '/erp/vipbuyer/CardState',
  changeCardState: '/erp/vipbuyer/CardStateEdit',
  getStoreList: '/erp/Vipbuyer/StoreList',
  getCouponList: '/erp/coupon/couponlist',
  getOrderList: '/erp/VipBuyer/BuyersOrderList',
  cancelOrder: '/m/o2o/Order/Close',
  confirmOrder: '/m/o2o/Order/ConfirmRec',
  changeBalanceShow: '/erp/vipbuyer/SeeUpdate',
  getTopUp: '/erp/vipbuyer/VipMoneyList',
  getBillList: '/erp/vipbuyer/BillList',
  pay: '/erp/vipbuyer/VipOrderAdd',
  getOrderDetail: '/erp/VipBuyer/BuyersOrderDetail',
  getLogistics: '/m/order/Traces',
  getUserAddr: '/m/UserAddr/List',
  setDefault: '/useraddr/setdefault',
  deleteAddr: '/useraddr/del',
  editAddr: '/useraddr/edit',
  addAddr: '/useraddr/add',
  VipPhoneCheck: '/erp/VipBuyer/VipPhoneCheck',
  ManageAdd: '/erp/VipBuyer/ManageAdd',
  NumberCheck: '/erp/VipBuyer/NumberCheck',
  Logout: '/m/Login/Logout',
  imgEdit: '/m/PersonalNote/ImgEdit',
  checkPwd: '/m/AccountSecurity/CheckPwd',
  VipCardPay: '/m/order/VipCardPay',
  collect: '/m/Collect/List_Shop',
  collectDel: '/m/collect/del',
  addToCart: '/m/o2o/ShopCart/Add',
  cartCount: '/m/o2o/ShopCart/Count',
  place: '/dsm/order/logis',
  bookList: '/erp/vipbuyer/BespeakNumberList',
  bookDetail: '/erp/vipbuyer/BespeakNumberDetail',
  bookAdd: '/erp/vipbuyer/BespeakNumberAdd',
};

if (process.env.NODE_ENV === 'development') {
  Object.keys(apis).forEach((key) => {
    if (!key.includes('upload')) {
      apis[key] = `/api${apis[key]}`;
    }
  });
}

export default apis;
