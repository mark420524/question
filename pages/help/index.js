Page({
    data:{
        activeName:'1',
        integralList:[
            {day:'1',integral:'1'},
            {day:'2',integral:'2'},
            {day:'3',integral:'3'},
            {day:'4',integral:'4'},
            {day:'5',integral:'5'},
            {day:'6',integral:'6'},
            {day:'>=7',integral:'7'} 
        ]
    },
    onChange(event) {
        this.setData({
          activeName: event.detail,
        });
      },
})