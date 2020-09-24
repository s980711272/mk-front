import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';

export default {
    alert(msg, type = 'success'){
        switch(type){
            case '1':
                type = 'error'
        }
        Message({
            message: msg,
            type: type
        })
    },
    /**
     * 
     * @param {*} obj 
     * obj.titie 标题 默认提示
     * obj.message 提示内容
     * obj.type 默认warning
     * obj.confirmButtonText 确认按钮文字 默认确认
     * obj.cancelButtonText 取消按钮文字 默认取消
     * obj.center 是否居中 默认居中
     */
    confirm(obj){
        obj.title = obj.title || '提示'
        obj.type = obj.type || 'warning'
        obj.center = obj.center ? obj.center : true
        return new Promise((resolve,reject) => {
            MessageBox.confirm(obj).then(res=>{
                resolve()
            }).catch(res=>{
                reject()
            })
        })
    }
}