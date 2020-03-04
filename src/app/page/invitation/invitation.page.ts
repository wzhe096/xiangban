import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {
  labelsArry={
    text:'test',
    selected: false
 };
 location="陕西省西安市雁塔区";
 departs = [
  {name: '全选', checked: false,index:'0'},
  {name: '张三', checked: false,index:'1'},
  {name: '李四', checked: false,index:'2'},
  {name: '王五', checked: false,index:'3'},
];
selectedItem:any;


  constructor() { }

  ngOnInit() {
  }
  a(item){
    item.selected=!item.selected;
 }

 多选标签
 changeCss(item,i) {
  
  if (!item.selected) {
    item.selected = true
    this.selectedItem.push(item.index)
  } else if (item.selected) {
    item.selected = false
    const i = this.selectedItem.indexOf(item.name)
    this.selectedItem.splice(i, 1)
  }
}
    release(){}

 checkEvent(item, i) {
   console.log("点击了"+i)
   item.selected=!item.selected;
  if (i === 0) {  // 如果点击的是第一个全选按钮，就实现全选取消全选
    if (item.checked) {
      this.departs.forEach(dep=>dep.checked = true);
    } else {
      this.departs.forEach(dep=>dep.checked = false);
    }
  } else {
    let res = this.departs.some(dep=>{return !dep.checked});
    if (res) {  // 如果全选以后，其中一个或多个取消选择，就把第一个全选按钮取消勾选
      this.departs[0].checked = false;
    }
    let flag = true;
    for (var n = 1; n < this.departs.length; n++) {
      if (!this.departs[n].checked) {
        flag = false;
      }
    }
    if (flag) {   // 如果全选以后，其他的全部选中了，就把全选按钮也选中
      this.departs[0].checked = true;
    }
  }
}
}
