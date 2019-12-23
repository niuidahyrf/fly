const app = getApp();
Page({
  data: {
    params: null,
    data_list_loding_status: 1,
    data_list_loding_msg: '',
    data_bottom_line_status: false,

    detail: null,
    detail_list: [],
    extension_data: [],
  },

  onLoad(params) {
    this.setData({params: params});
    this.init();
  },

  onShow() {
    tt.setNavigationBarTitle({title: app.data.common_pages_title.user_order_detail});
  },

  init() {
    var self = this;
    tt.showLoading({title: "加载中..." });
    this.setData({
      data_list_loding_status: 1
    });

    tt.request({
      url: app.get_request_url("detail", "order"),
      method: "POST",
      data: {
        id: this.data.params.id
      },
      dataType: "json",
      success: res => {
        tt.hideLoading();
        tt.stopPullDownRefresh();
        if (res.data.code == 0) {
          var data = res.data.data;
          self.setData({
            detail: data,
            detail_list:[
              {name: "订单号", value: data.order_no || ''},
              {name: "状态", value: data.status_name || ''},
              {name: "支付状态", value: data.pay_status_name || ''},
              {name: "单价", value: data.price || ''},
              {name: "总价", value: data.total_price || ''},
              {name: "优惠金额", value: data.preferential_price || ''},
              {name: "增加金额", value: data.increase_price || '' },
              {name: "支付金额", value: data.pay_price || ''},
              {name: "支付方式", value: data.payment_name || ''},
              {name: "快递公司", value: data.express_name || ''},
              {name: "快递单号", value: data.express_number || ''},
              {name: "用户留言", value: data.user_note || ''},
              {name: "创建时间", value: data.add_time || ''},
              {name: "确认时间", value: data.confirm_time || ''},
              {name: "支付时间", value: data.pay_time || ''},
              {name: "发货时间", value: data.delivery_time || ''},
              {name: "收货时间", value: data.collect_time || ''},
              {name: "取消时间", value: data.close_time || ''},
              {name: "关闭时间", value: data.close_time || ''},
            ],
            extension_data: data.extension_data || [],
            data_list_loding_status: 3,
            data_bottom_line_status: true,
            data_list_loding_msg: '',
          });
        } else {
          self.setData({
            data_list_loding_status: 2,
            data_bottom_line_status: false,
            data_list_loding_msg: res.data.msg,
          });
          app.showToast(res.data.msg);
        }
      },
      fail: () => {
        tt.hideLoading();
        tt.stopPullDownRefresh();
        self.setData({
          data_list_loding_status: 2,
          data_bottom_line_status: false,
          data_list_loding_msg: '服务器请求出错',
        });

        app.showToast("服务器请求出错");
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.init();
  },

});
